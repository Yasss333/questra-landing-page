const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/yashm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto('http://127.0.0.1:3001/',{waitUntil:'networkidle'});
  await page.locator('#dashboard-preview').screenshot({path:path.join(__dirname,'browser-first-desktop.png')});
  console.log(JSON.stringify({status:response.status(),title:await page.title(),errors,viewport:await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})),nav:await page.locator('header').first().innerText()},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
