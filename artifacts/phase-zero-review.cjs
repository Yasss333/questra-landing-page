const { chromium } = require('C:/Users/yashm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 const lengths=[];
 for(let i=0;i<30;i++){lengths.push((await page.locator('h1 [class*="typing_"]').textContent()).length);await page.waitForTimeout(200);}
 assert(lengths.some((n,i)=>i>0&&n>lengths[i-1]),'Headline types');
 assert(lengths.some((n,i)=>i>0&&n<lengths[i-1]),'Headline deletes');
 await page.getByRole('button',{name:'Pause slideshow'}).click();
 for(const label of ['Question Bank','Syllabus Library & PDF Viewer','Master Data Intelligence','Outcome Mapping','Bloom’s Analytics','Coverage Explorer','Review & Approval']) {
  await page.getByRole('button',{name:`Show ${label}`,exact:true}).click();
  await page.waitForTimeout(500);
  const slide=page.locator('[data-hero-slide][aria-hidden="false"]');
  await slide.locator('img').evaluate(img=>img.decode());
  assert(await slide.locator('img').evaluate(img=>img.naturalWidth>0));
  await page.locator('[aria-roledescription="carousel"]').screenshot({path:`artifacts/phase-zero-slide-${label.replace(/[^a-z]/gi,'-')}.png`});
 }
 const links=new Set();
 for(const group of ['Platform','Intelligence','Resources','Company']) {
  await page.getByRole('button',{name:group,exact:true}).click();
  for(const href of await page.locator(`#${group.toLowerCase()}-menu a`).evaluateAll(els=>els.map(el=>el.getAttribute('href'))))links.add(href);
  await page.keyboard.press('Escape');
 }
 for(const href of links){const [path,hash]=href.split('#');const res=await page.goto(`http://127.0.0.1:3000${path}`,{waitUntil:'networkidle'});assert.equal(res.status(),200,href);if(hash)assert.equal(await page.locator(`[id="${hash}"]`).count(),1,href);}
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 // The existing theme toggle exposes a descriptive accessible name.
 console.log('Theme controls:',await page.locator('header button').evaluateAll(els=>els.map(el=>el.getAttribute('aria-label')).filter(Boolean)));
 await page.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
 assert(await page.locator('html').evaluate(el=>el.classList.contains('dark')));
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`artifacts/phase-zero-dark-${width}.png`,fullPage:true});}
 await page.screenshot({path:'artifacts/phase-zero-mobile-preview.png'});
 await page.getByRole('button',{name:'Switch to light mode',exact:true}).click();
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:1440,height:1000});
 await page.reload({waitUntil:'networkidle'});
 await page.waitForTimeout(500);
 await page.screenshot({path:'artifacts/phase-zero-desktop-preview.png'});
 assert.deepEqual(errors,[]);
 fs.writeFileSync('artifacts/phase-zero-review.json',JSON.stringify({passed:true,typingSamples:lengths,sevenImages:true,navigationLinks:[...links],darkWidths:[1440,390],errors},null,2));
 console.log('PASS: typing/deleting, seven dashboard assets, every dropdown destination/anchor, dark desktop/mobile, no runtime errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
