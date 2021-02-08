/* Import the puppeteer and expect functionality of chai library for configuraing the Puppeteer */
const puppeteer = require('puppeteer');
const {  QueryHandler } = require("query-selector-shadow-dom/plugins/puppeteer");
const { expect } = require('chai');
const _ = require('lodash');
const opn = require('opn')
const cmd = require('node-cmd')

/* create the global variable by using lodash function */
const globalVariables = _.pick(global, ['pupeteer','browser', 'expect', 'testURL']);

/* configurable options or object for puppeteer */
const opts = {
    headless: false,
    slowMo: 50,
    timeout: 0,
    args: ['--start-maximized'],
    defaultViewport: null
    //executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' 
}

/* call the before for puppeteer for execute this code before start testing */
before (async () => {
	await puppeteer.registerCustomQueryHandler('shadow', QueryHandler);
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
  });

/* call the function after puppeteer done testing */
after ( () => {
  browser.close();
  setTimeout( () => { cmd.run('node server.js');}, 5000);    
  setTimeout(() => {opn('http://localhost:9988');}, 2000);
  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});