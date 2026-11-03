const fs = require('node:fs');
const { chromium } = require('C:/Users/yashm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
 for (const width of [1440,390]) {
  await page.setViewportSize({width,height:1000});
  for (const route of ['/','/how-it-works','/platform','/book-demo']) {
   console.log('Checking',width,route); const res=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle',timeout:180000});assert.equal(res.status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.questra.si'+(route==='/'?'':route));
   const bad=await page.locator('a[href^="#"], a[href^="/#"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>h.startsWith('#')&&!document.getElementById(h.slice(1))));assert.deepEqual(bad,[]);
   for(const theme of ['light','dark']) {
    const toggle=page.getByRole('button',{name:theme==='dark'?'Switch to dark mode':'Switch to light mode'});
    if(await page.locator('html').evaluate(e=>e.classList.contains('dark')) !== (theme==='dark')) await toggle.click();
    await page.waitForFunction(dark=>document.documentElement.classList.contains('dark')===dark,theme==='dark');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,route+' '+width+' overflow');
    await page.screenshot({path:'artifacts/marketing-'+(route==='/'?'home':route.slice(1))+'-'+width+'-'+theme+'.png',fullPage:width===390});
    results.push({route,width,theme,status:res.status()});
   }
  }
 }
 await page.goto('http://127.0.0.1:3000/how-it-works');assert.equal(await page.locator('#institution-setup ol > li').count(),11);
 await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Platform'}).click();
 // Mobile submenu may initially be expanded; use the always-visible CTA to verify navigation.
 await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Book a live demo'}).click();await page.waitForURL('**/book-demo');
 const submit=page.getByRole('button',{name:'Prepare demo enquiry'});await submit.click();assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);
 await page.getByLabel('Your name').fill('Marketing QA');await page.getByLabel('Work email').fill('qa@example.edu');await page.getByLabel('Institution',{exact:true}).fill('QA University');await page.getByLabel('Your role').selectOption({label:'Head of Department'});await submit.click();
 const draft=page.getByRole('link',{name:'Open the prepared email'});assert.match(await draft.getAttribute('href'),/^mailto:voicedotsio@gmail.com\?/);
 await page.getByLabel('Your name').fill('Updated QA');assert.equal(await draft.count(),0);
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3000/platform');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Skip to content');await page.keyboard.press('Enter');await page.waitForFunction(()=>document.activeElement.id==='main-content');
 await page.getByRole('button',{name:'Platform',exact:true}).focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#platform-menu').count(),1);await page.keyboard.press('Escape');assert.equal(await page.locator('#platform-menu').count(),0);
 assert.deepEqual(errors,[]);fs.writeFileSync('artifacts/marketing-update-qa.json',JSON.stringify({results,errors,form:'validated draft and reset',keyboard:'skip link, dropdown, Escape',onboardingSteps:11},null,2));console.log('PASS: 16 page/viewport/theme combinations; form, keyboard, onboarding, and local anchors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
