from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin
from collections import Counter
import json, math, statistics, time, sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = 'http://127.0.0.1:3001'
OUT = Path(__file__).parent
checks = []
def get(path):
    start = time.perf_counter()
    try:
        with urlopen(urljoin(BASE, path), timeout=45) as response:
            return {'path':path,'status':response.status,'type':response.headers.get('Content-Type',''),'body':response.read(),'ms':round((time.perf_counter()-start)*1000,2)}
    except HTTPError as error:
        return {'path':path,'status':error.code,'type':error.headers.get('Content-Type',''),'body':error.read(),'ms':round((time.perf_counter()-start)*1000,2)}
def check(name, predicate):
    try:
        assert predicate(), name
        checks.append({'name':name,'status':'passed'})
    except Exception as error:
        checks.append({'name':name,'status':'failed','error':str(error)})
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.images=[]; self.css=[]; self.h1=0; self.meta={}; self.scripts=[]; self.script=None; self.words=[]; self.hidden=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='img': self.images.append(a)
        if tag=='h1': self.h1+=1
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.meta['canonical']=a.get('href')
        if tag=='link' and a.get('rel')=='stylesheet': self.css.append(a.get('href'))
        if tag=='script': self.script={'type':a.get('type',''),'body':''}
    def handle_data(self, data):
        if self.script is not None: self.script['body']+=data
        else: self.words.append(data)
    def handle_endtag(self, tag):
        if tag=='script' and self.script is not None: self.scripts.append(self.script); self.script=None

home=get('/')
if home['status'] != 200: raise RuntimeError(f"Homepage returned {home['status']}")
html=home['body'].decode('utf-8'); page=Page(); page.feed(html); words=' '.join(page.words)
check('Homepage responds successfully',lambda:home['status']==200)
check('Exactly one page-level H1',lambda:page.h1==1)
check('HTML IDs are unique',lambda:all(n==1 for n in Counter(page.ids).values()))
check('All homepage anchor targets exist',lambda:all(href[1:] in page.ids for href in page.links if href.startswith('#') and len(href)>1))
check('No placeholder hash links',lambda:'#' not in page.links)
check('Primary marketing sections exist',lambda:all(section in page.ids for section in ['home','dashboard-preview','platform','solutions','faculty-review','workflow','student-portal','analytics','faq','demo','main-content']))
check('Brand images have descriptive alternatives',lambda:bool(page.images) and all(image.get('alt','').strip() for image in page.images))
check('No removed meteor footer banner remains',lambda:'ACADEMIC INTELLIGENCE. HUMAN CONFIDENCE.' not in words and 'FooterMeteors' not in html)
check('No original farming marketing copy remains',lambda:all(term not in words for term in ['Autonomy for every Farm','Smart Irrigation System Launch','Automate now']))
check('Questra SEO title and description are present',lambda:'Questra | AI Question Bank' in html and bool(page.meta.get('description')))
check('Canonical identifies the configured production domain',lambda:page.meta.get('canonical','').rstrip('/')=='https://www.questra.si')
check('Social metadata is present',lambda:all(page.meta.get(k) for k in ['og:title','og:description','og:image','twitter:card']))
check('Structured data is present and valid JSON',lambda:bool([s for s in page.scripts if s['type']=='application/ld+json']) and all(json.loads(s['body'])['@context']=='https://schema.org' for s in page.scripts if s['type']=='application/ld+json'))
check('Enquiry copy distinguishes preparation from sending',lambda:'Prepare demo enquiry' in words and 'send it to complete your request' in words)
check('Illustrative dashboard labeling is present',lambda:'Sample data' in words and 'Changes reset on reload' in words)
check('Student content does not imply measured mastery',lambda:'not measured student mastery' in words and 'only when authorized' in words)
for term in ['Connected academic masters','Syllabus intelligence, down to the topic','Quality signals for academic reviewers','Requests, deadlines, and accountable review','A command center for examination readiness','Your formats. Your release controls.','Controllers of Examinations','IQAC & OBE teams','Syllabus to questions','Clarity through analytics','Institution-managed access']:
    check('Blueprint topic represented: '+term,lambda term=term:term in words)
resources=['/robots.txt','/sitemap.xml','/icon.svg','/opengraph-image','/brand/questra-logo.png','/qa-route-that-does-not-exist','/?utm_source=qa-audit']
resources += page.css
resources += [image['src'] for image in page.images if image.get('src')]
route_results=list(ThreadPoolExecutor(max_workers=4).map(get,dict.fromkeys(resources)))
for result in route_results:
    expected=404 if result['path']=='/qa-route-that-does-not-exist' else 200
    check(f"Route/asset {result['path']} returns {expected}",lambda result=result,expected=expected:result['status']==expected)
for result in route_results:
    if result['path']=='/robots.txt': check('Robots points to production sitemap',lambda result=result:b'https://www.questra.si/sitemap.xml' in result['body'])
    if result['path']=='/sitemap.xml': check('Sitemap identifies production home',lambda result=result:b'https://www.questra.si/' in result['body'])
requests=['/?qa_stress='+str(i) for i in range(40)]
with ThreadPoolExecutor(max_workers=4) as pool: stress=list(pool.map(get,requests))
check('Bounded localhost workload: 40 requests, concurrency 4, no failed responses',lambda:all(r['status']==200 and b'Better questions.' in r['body'] for r in stress))
times=sorted(r['ms'] for r in stress)
report={'testedAt':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'target':BASE,'checks':checks,'stress':{'requests':40,'concurrency':4,'successful':sum(r['status']==200 for r in stress),'p50Ms':round(statistics.median(times),2),'p95Ms':times[math.ceil(len(times)*.95)-1],'maxMs':max(times)},'routes':[{k:v for k,v in r.items() if k!='body'} for r in route_results],'browserStatus':'blocked; this suite checks HTTP/SSR, not browser layout, touch, or keyboard behavior'}
(OUT/'http-qa-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({'passed':sum(r['status']=='passed' for r in checks),'failed':[r for r in checks if r['status']=='failed'],'stress':report['stress']},indent=2))
sys.exit(1 if any(r['status']=='failed' for r in checks) else 0)
