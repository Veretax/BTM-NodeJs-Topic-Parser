const rl = require("readline");
const url = require("url");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

const getTopic = async (targetUrl) => {
    let response = await fetch(targetUrl);
    let body = await response.text();
    //console.log(body);
    return body;
}

const getTopicBody = async (targetUrl) => {
    let response = await fetch(targetUrl);
    let body = await response.text();
    //console.log(body);

    return body;
}

const parseDom = async (d, cssLocator) => {
    let dom = new JSDOM(d);
    let document = dom.window.document;
    let postSelector = document.querySelector(cssLocator);

    //console.log(document)
    console.log(postSelector);

    return postSelector;
}

const parseBody = async (targetUrl, cssLocator) => {
    let response = await fetch(targetUrl);
    let body = await response.text();

    const $ = cheerio.load(body);
    const titleList = [];

    // using CSS selector  
    $(cssLocator).each((i, title) => {
        const titleNode = $(title);
        const titleText = titleNode.text();

        console.log(`titleNode: ${title}`);
        console.log(`titleText: ${titleText}`);

        titleList.push(titleText);
    });

    console.log(titleList);

    return titleList;
}


function getTargetInfo() {

    let targetUrl = '';
    let locator = '';

    const initialQuestion = "What Url would you like me to Parse? \n";
    const cssLocatorQuestion = "What is the target css locator? \n";
    const areYouSureQuestion = "Are You Sure (Y/N)? \n";
    let confirmed = false;
    var prompts = rl.createInterface(process.stdin, process.stdout);
    prompts.question(initialQuestion, function (targetUrl) {
        prompts.question(cssLocatorQuestion, function (locator) {

            console.log("preparing to get targetUrl");

            let selection = parseBody(targetUrl, locator);

            console.log(selection);

            prompts.close();
        });
    }); 
}

getTargetInfo()