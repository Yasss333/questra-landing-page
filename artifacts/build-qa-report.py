from pathlib import Path
from html import escape
import json

root=Path(__file__).parent
model=json.loads((root/'model-qa-results.json').read_text(encoding='utf-8'))
http=json.loads((root/'http-qa-results.json').read_text(encoding='utf-8'))
browser=json.loads((root/'browser-qa-results.json').read_text(encoding='utf-8'))
edge=json.loads((root/'browser-edge-qa-results.json').read_text(encoding='utf-8'))
assert browser['completed'] and not browser['errors'] and not edge['errors']
assert all(r['status']=='passed' for r in model['results']+http['checks']+browser['results']+edge['results'])
browser_count=len(browser['results'])+len(edge['results'])
chapters=[
('01','Brand positioning','Hero, platform, and footer','Represented'),
('02','Homepage hero','Hero promise, demo CTA, and four trust attributes','Represented'),
('03','Why Questra','Fragmented-workflow problem, benefits, and capability cards','Represented'),
('04','AI Question Studio','Platform copy and temporary question-generation/edit/review demo','Copy and demo'),
('05','Academic Master Data','Platform capability and eight Master Data tabs','Copy and demo'),
('06','Syllabus Intelligence','PDF/version/topic/exam-scope copy and illustrative syllabus viewer','Copy and demo'),
('07','Unified Question Bank','Question metadata, filters, status, editing, sources, and sample duplicate queue','Copy and demo'),
('08','Paper Blueprint and Pattern Studio','Duration, maximum marks, sections, choices, weightage, and validation described','Represented; full template engine outside landing-page scope'),
('09','Autonomous Paper Generation','Approved-bank assembly, set comparisons, preview, and export descriptions','Copy and demo; actual AI/PDF/Word services excluded'),
('10','Academic Quality Intelligence','Quality-review capability and sample validation checklist','Copy and demo; no accuracy guarantee'),
('11','Faculty Review and Approval','Draft/review/moderation/approval/locking and audit-history demo','Copy and demo'),
('12','Coverage, Bloom and OBE Analytics','Coverage dimensions, K1–K6 distribution, CO and PO matrices','Copy and demo'),
('13','Command Center and Reports','Readiness, workload, deadlines, alerts, and report descriptions; real sample CSV exports','Copy and demo'),
('14','Requests, Formats and Governance','Requests, setters, deadlines, institution layouts, permissions, and auditability described','Represented; backend governance excluded'),
('15','Who Questra Serves','Six audience cards including CoE, HoD, faculty, IQAC/OBE, and IT','Represented'),
('16','How It Works','Six grouped stages covering the nine blueprint steps','Represented'),
('17','Navigation and Page Architecture','Single-page navigation and section links, per the approved scope','Adapted to one marketing page; legal text pending'),
('18','Suggested Homepage Sections','Hero, dashboard, capabilities, review, workflow, students, analytics, FAQ, enquiry','Represented'),
('19','Sales CTAs','Hero, mid-page, institutional, and final demo links','Represented'),
('20','FAQ','Six expandable questions on editing, patterns, approvals, imports, students, and OBE','Represented'),
('21','Developer Functional Scope','Referenced product roadmap, not instructions to rebuild the backend','Full authenticated product excluded'),
('22','Implementation Priorities','Product roadmap and acceptance gates distinguished from this marketing/demo build','Production product gates not certified'),
('23','Student Portal Positioning','Student promise, institution CTA, publication policy','Represented'),
('24','Student Dashboard','Semester, subjects, syllabus, questions, outcomes, past papers, and content coverage described','Copy and released-question demo; personal accounts excluded'),
('25','My Subjects','Current subjects, codes, credits, faculty, and academic resources described','Represented'),
('26','Syllabus Explorer','Units, topics, subtopics, objectives, versions, PDFs, and CO context described','Copy and illustrative syllabus demo'),
('27','Student Question Bank','Approved practice metadata and policy-aware answer access described','Copy and released-only sample-question demo'),
('28','Previous Examination Papers','Mid-Term I/II and End-Semester archives, metadata, sets, versions, and download policy described','Marketing copy; no real authenticated archive'),
('29','Student Bloom and Outcome Analytics','Published-resource coverage and cognitive/outcome insights distinguished from mastery','Represented; no measured proficiency claims'),
('30','Student Portal Landing Copy','Six public feature highlights and institutional demo CTA','Adapted to the approved single-page site'),
('31','Revised Information Architecture','Public single-page structure retained; product navigation described conceptually','No invented student sign-in or additional public pages'),
('32','Student Screens and User Flows','Subjects → syllabus → questions → papers → analytics described','Marketing/demo scope; responsive browser checks passed'),
('33','Student Data Model and API Integration','No live student APIs, authentication, or PostgreSQL backend claimed by this demo','Outside landing-page scope'),
('34','Acceptance, Rollout and Governance','Sample labeling, release rules, coverage-vs-mastery distinction, and qualified availability copy','Frontend browser checks passed; real accounts, legal, and production services require separate acceptance'),
]
fixes=[
('Missing marketing topics','Added academic masters, syllabus scope/versioning, quality signals, reusable paper rules, requests/deadlines, reports, formats/governance, and six audience roles.'),
('Thin Student Portal coverage','Expanded to six feature descriptions covering subjects, syllabus drill-down, practice, past papers, analytics, and institution-managed access.'),
('Whitespace-only enquiries','A shared validation function rejects blank trimmed names/institutions, invalid email, missing roles, and oversized values. No email is sent by tests.'),
('Coverage-target inconsistencies','Every coverage dimension now allocates the same 30-question-per-subject blueprint total, including empty and newly added subjects.'),
('Empty academic selections','Paper assembly no longer falls back to Data Structures outside an empty selection.'),
('Dialog replacement and return focus','Opening an editor from a details dialog refocuses the close control. The live modal ref preserves the original page opener across cached dialog callbacks; Escape returns focus to that opener. Verified at four widths in both themes.'),
('Pagination after filter changes','Academic scope, search, and question filters now reset the question table to the first page, so later-page state cannot hide matching results.'),
('Outcome selection event lifetime','Capture the chosen outcome before the React state updater runs.'),
('Misleading empty outcome queue','An empty academic scope now says no questions match, rather than implying every question is mapped.'),
('Invalid draft submissions','Question and paper editors provide visible feedback for whitespace-only titles/answers; master-record names reject whitespace-only values.'),
('Spreadsheet exports','CSV quotes/multiline fields are escaped and formula-like text is neutralized while numeric values stay numeric.'),
]
browser_items=['Public-page matrix: widths 320, 360, 390, 430, 768, 820, 1024, 1280, 1440, and 1920 in light and dark themes; 844 × 390 phone landscape','All eleven dashboard modules and eight Master Data tabs at 390, 820, and 1440 in both themes; page overflow, image loading, visible text, and accessible control names','Desktop dropdowns and mobile navigation: outside click, Escape, arrow keys, breakpoint changes, touch taps, FAQ keyboard/touch interaction, skip link, and unobscured section links','Actual browser touch events horizontally swipe the phone table; tabs scroll, dialogs fit, and the modal keeps the background still','Theme persistence, unavailable browser storage, missing View Transitions API, animated transition cleanup, moving-grid pointer response, and reduced-motion preference','Academic filters, searches, pagination reset, no-result states, whitespace rejection, long/Unicode input, safe text rendering, and CSV escaping/formula neutralization','Question draft creation and review → approval → release → withdrawal; student demo shows released questions only','Paper assembly → faculty review → moderation → approval → immutable locking; review comments, audit history, and bank edits cannot alter the locked snapshot','Staff and outcome mapping, student profile edits, duplicate review, heatmap drill-down, report preview/download/history, reset and reload behavior','110 rapid module transitions, four simultaneous isolated browser contexts, a working 404 recovery link, zero uncaught page exceptions, and zero HTTP 5xx responses','Enquiry required fields, malformed email, whitespace, encoded draft contents, and clearing stale prepared drafts. No email was sent']
esc=lambda value:escape(str(value))
table=lambda headers,rows:'<div class="scroll"><table><thead><tr>'+''.join('<th>'+esc(h)+'</th>' for h in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+esc(c)+'</td>' for c in row)+'</tr>' for row in rows)+'</tbody></table></div>'
pass_count=sum(r['status']=='passed' for r in model['results'])+sum(r['status']=='passed' for r in http['checks'])
pass_count+=browser_count
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Questra content and QA audit 26 October 2026</title><style>body{font:15px/1.7 system-ui,sans-serif;color:#102442;background:#f5f8fc;margin:0}main{max-width:1120px;margin:auto;padding:48px 24px}h1{font-size:34px;line-height:1.25;letter-spacing:-1px}h2{margin-top:42px;font-size:23px}p{max-width:930px;color:#52647b}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:26px 0}.summary div{background:white;border:1px solid #dce5ef;border-radius:10px;padding:20px}.summary strong{display:block;font-size:28px}.summary span{font-size:12px;color:#64748b}.blocked{background:#fff3db;border:1px solid #efd399;padding:18px 22px;border-radius:9px;color:#805b18}.scroll{overflow:auto;background:#fff;border:1px solid #dce5ef;border-radius:9px}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:13px 15px;text-align:left;border-bottom:1px solid #e7edf4;vertical-align:top}th{background:#eaf2ff;color:#084db5}li{margin:9px 0;color:#52647b}code{background:#e7edf5;padding:2px 4px;border-radius:3px;font-size:12px}a{color:#084db5}.small{font-size:12px}.passed{color:#12846c;font-weight:600}@media(max-width:700px){main{padding:28px 16px}.summary{grid-template-columns:1fr 1fr}h1{font-size:28px}th,td{min-width:110px}}@media print{body{background:white}main{padding:10px}table{font-size:10px}h2{break-after:avoid}.scroll{overflow:visible}}</style><main>'''
html+='<style>.verified{background:#e8f8f2;border:1px solid #b5e3d3;padding:18px 22px;border-radius:9px;color:#126b57}.gallery{display:grid;grid-template-columns:1fr 1fr;gap:18px}.gallery figure{margin:0;background:white;border:1px solid #dce5ef;border-radius:9px;padding:14px}.gallery img{width:100%;max-height:550px;object-fit:contain;object-position:top}.gallery figcaption{font-size:13px;padding-top:8px}@media(max-width:700px){.gallery{grid-template-columns:1fr}}</style>'
html+='<p class="small">26 October 2026 · Asia/Calcutta · Current local production build · No deployment performed</p><h1>Questra content and QA audit</h1><div class="verified"><strong>Content audit and frontend browser QA completed.</strong> The current production build passed the browser, data/form, and HTTP suites below. Browser automation used installed Google Chrome through the user-approved local Playwright fallback after the built-in browser runtime could not initialize. Mobile and tablet tests use browser emulation; physical devices, Safari, and Firefox were not tested.</div>'
html+=f'<div class="summary"><div><strong>{pass_count}</strong><span>Browser + model + HTTP checks passed</span></div><div><strong>{browser_count}</strong><span>Browser scenarios passed; zero failures</span></div><div><strong>{model["scopeCases"]:,}</strong><span>Academic filter combinations</span></div><div><strong>Passed</strong><span>Production build, lint, and TypeScript</span></div></div>'
html+='<p>The supplied 34-chapter blueprint mixes public website copy with a full authenticated product specification. The public product topics are represented in the approved single-page marketing site, with a frontend sample-data dashboard. This does not certify student APIs, permissions, real AI, document exports, or database services.</p>'
html+='<h2>Checks completed</h2>'+table(['Area','Evidence','Result'],[['Build','Next.js production build completed; static routes generated; lint and type validation passed','Passed'],['Data and forms',f'{len(model["results"])} assertions, including immutable locked papers, released-only records, input boundaries, Unicode, and CSV safety','Passed'],['Academic scope',f'{model["scopeCases"]:,} combinations of batch, degree, department, semester, and subject','Passed'],['Large data filtering',f'{model["benchmark"]["records"]:,} records × {model["benchmark"]["iterations"]} filter iterations in {model["benchmark"]["ms"]} ms on this device; pure model operations only','Passed'],['HTTP/SSR',f'{len(http["checks"])} checks for page content, anchors, unique IDs, images, CSS, metadata, structured data, robots, sitemap, 404, and removed footer banner','Passed'],['Bounded local workload',f'{http["stress"]["successful"]}/40 read-only requests / concurrency 4; p50 {http["stress"]["p50Ms"]} ms, p95 {http["stress"]["p95Ms"]} ms, max {http["stress"]["maxMs"]} ms. Local response testing does not certify hosting capacity.','Passed'],['Browser/device matrix',f'{len(browser["results"])} primary and {len(edge["results"])} additional edge checks; ten widths, both themes, phone landscape, keyboard, touch, animations, and stateful workflows. Zero uncaught page exceptions or HTTP 5xx responses.','Passed']])
html+='<h2>Changes made during the audit</h2>'+table(['Finding','Resolution'],fixes)
html+='<h2>Blueprint coverage</h2><p>“Represented” means the topic is present in website copy. “Copy and demo” means the topic also has a sample frontend interaction. Neither means the proposed production product has been built.</p>'+table(['Chapter','Blueprint topic','Current location or treatment','Scope/status'],chapters)
html+='<h2>Browser coverage completed</h2><ul>'+''.join('<li>'+esc(item)+'</li>' for item in browser_items)+'</ul>'
html+='<p>Two verified UI defects were corrected during this browser pass: pagination now resets when filters change, and nested editor dialogs preserve and restore focus to their original opener. The affected stateful workflows were rerun on the final production build, with eight further width/theme dialog regressions. Earlier failure screenshots and the initial result snapshot remain as historical debugging evidence; the result files listed below contain the final passing state.</p>'
html+='<h2>Visual evidence</h2><p>Representative screenshots from this audit. Open an image to inspect it at full size.</p><div class="gallery">'
for filename,label in [('dashboard-1440-light.png','Desktop dashboard · 1440px · light'),('hero-390-light.png','Phone homepage · 390px · light'),('student-390-dark.png','Phone Student Portal section · 390px · dark'),('review-390-dark.png','Phone review workflow · 390px · dark')]:
    src='qa-browser-2026-10-26/'+filename
    assert (root/src).exists()
    html+=f'<figure><a href="{src}"><img loading="lazy" src="{src}" alt="{esc(label)}"></a><figcaption>{esc(label)}</figcaption></figure>'
html+='</div>'
html+='<h2>Inputs still needed before launch</h2><ul><li>Approved Privacy and Terms content; no legal copy or links have been invented.</li><li>Product-owner confirmation of which proposed capabilities are currently live.</li><li>A real Student Portal sign-in destination if a public sign-in link is wanted. The current page remains a marketing and sample-data preview.</li><li>The enquiry flow intentionally prepares a mailto draft for voicedotsio@gmail.com; it does not send or store enquiries automatically, and no test email was sent.</li></ul>'
html+='<h2>Reproducible evidence</h2><p class="small">Final results: <a href="browser-qa-results.json">browser-qa-results.json</a>, <a href="browser-edge-qa-results.json">browser-edge-qa-results.json</a>, <a href="model-qa-results.json">model-qa-results.json</a>, and <a href="http-qa-results.json">http-qa-results.json</a>. Reproducible scripts: <code>run-browser-qa.cjs</code>, <code>run-browser-edge-qa.cjs</code>, <code>run-model-qa.cjs</code>, and <code>run-http-qa.py</code>. Document text was extracted read-only into <code>blueprint-content-audit.txt</code>.</p>'
html+='<details><summary>All final browser scenarios</summary>'+table(['Scenario','Result'],[(r['name'],r['status']) for r in browser['results']+edge['results']])+'</details></main></html>'
(root/'questra-qa-report-2026-10-26.html').write_text(html,encoding='utf-8')
print(f'Created QA report: {pass_count} checks passed, including {browser_count} browser scenarios; zero failures.')
