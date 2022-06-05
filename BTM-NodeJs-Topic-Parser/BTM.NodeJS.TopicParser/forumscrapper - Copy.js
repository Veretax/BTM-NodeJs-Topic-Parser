const rl = require("readline");
const url = require("url");
//const axios = require("axios");
const https = require("https");
const jsdom = require("jsdom"); 

const { JSDOM } = jsdom;

function parseDom(d, cssLocator) {
    let dom = new JSDOM(d);
    let document = dom.window.document;
    let postSelector = document.querySelector(cssLocator);

    //console.log(document)
    //console.log(postSelector);

    return postSelector;

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

            let myRequest = getUrl(targetUrl);

            //console.log(myRequest)

            let myResponse = getRequest(myRequest, locator);

            //console.log(myResponse);

            prompts.close();
        });
    }); 
}

//function getUrl(requestUrl) {
//    axios
//        .get(requestUrl)
//        .then(res => {
//            return res;
//        })

//}

function getRequest(ru, cssLocator) {
    let options = {
        hostname: ru.host,
        port: 443,
        path: ru.path,
        method: 'GET'
    };

    console.log(`options for request:`);
    console.log(options);

    let data = [];

    let req = https.request(options, (res) => {
        let body = '';

        console.log(res);
        console.log(`url: ${res.url}`);
        console.log(`statusCode: ${res.statusCode}`);
        console.log(`statusMessage: ${res.statusMessage}`);
        console.log(`headers: ${res.headers}`);
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            data.push(chunk);
            body = body + chunk;
        });
        console.log(`${res.document}`);

        res.on('end', function () {
            console.log("Body :" + body);
            if (res.statusCode != 200) {
                callback("Api call failed with response code " + res.statusCode);
            } else {
                callback(null);
            }
        });

    });

    req.on('error', function (e) {
        console.log("Error : " + e.message);
        callback(e);
    });


    req.write('data\n');
    req.write('data\n');
    req.end();

    return data;
    //console.log(requestResponse);

    return requestResponse;
}

function getUrl(requestedUrl) {

    let ru = url.parse(requestedUrl, true);

    return ru;

    //console.log(options);
    //let req = https.request(options, res => {
        
    //    console.log(`statusCode: ${res.statusCode}`);

    //    let data = '';
        
    //    //res.on('data', (d) => {
    //    //    data = data + d.toString();
    //    //    console.log(data);
    //    //    //postSelector = parseDom(d, cssLocator)
    //    //    //console.log(postSelector);
    //    //    //process.stdout.write(d);
    //    //});
    //});

    //console.log(res);

    //req.on('error', error => {
    //    console.error(error);
    //});

    //req.end();
}




getTargetInfo()