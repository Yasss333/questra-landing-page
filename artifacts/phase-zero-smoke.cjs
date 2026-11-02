const { chromium } = require('C:/Users/yashm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  assert.equal(await page.locator('[aria-roledescription="carousel"]').count(),1,'Hero dashboard carousel must exist');
  assert.equal(await page.locator('[data-hero-slide]').count(),7,'All seven supplied dashboards must be present');
  const first=await page.locator('[data-hero-slide][aria-hidden="false"]').getAttribute('data-hero-slide');
  await page.waitForTimeout(2200);
  assert.notEqual(await page.locator('[data-hero-slide][aria-hidden="false"]').getAttribute('data-hero-slide'),first,'Autoplay should advance');
  await page.getByRole('button',{name:'Pause slideshow'}).click();
  const paused=await page.locator('[data-hero-slide][aria-hidden="false"]').getAttribute('data-hero-slide');
  await page.waitForTimeout(2200);
  assert.equal(await page.locator('[data-hero-slide][aria-hidden="false"]').getAttribute('data-hero-slide'),paused,'Pause should stop autoplay');
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`No overflow at ${width}`);
    await page.screenshot({path:`artifacts/phase-zero-home-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.getByRole('button',{name:'Intelligence',exact:true}).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.getByRole('button',{name:'Play slideshow'}).count(),1);
  assert.equal(await page.locator('h1').getAttribute('aria-label'),'From Syllabus to Final Approval.');
  for(const route of ['/platform','/how-it-works','/approval-automation','/book-demo']) {
    const response=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
    assert.equal(response.status(),200); assert.equal(await page.locator('h1').count(),1);
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: carousel, autoplay/pause, seven images, five widths, mobile Escape, reduced motion, four supporting routes, no runtime errors.');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
