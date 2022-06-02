'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const startupPrompt =
    'Welcome to BTM NodeJs Topic Parser.  A tool intended to help you get the key text minus html markup from a url and css class';

////usage inside aync function do not need closure demo only*
//(async () => {
//    try {
//        const name = await prompt('Whats your Name: ')
//        //can use name for next question if needed
//        const lastName = await prompt(`Hello ${name} Whats your Last name?:`)
//        //can prompt multiple times.
//        console.log(name, lastName);
//        rl.close()
//    } catch (e) {
//        console.errror("unable to prompt", e)
//    }
//})()


// Let us setup our prompt
//(async () => {
//    try {


        console.log(startupPrompt);

        let targetUrl = '';
        let locator = '';

        const initialQuestion = "What Url would you like me to Parse?";
        const cssLocatorQuestion = "What is the target css locator?";
        const areYouSureQuestion = "Are You Sure (Y/N)?";
        let confirmed = false;

        while (!confirmed) {

            rl.question(initialQuestion, function (url) {
                targetUrl = url;
            });


            rl.question(cssLocatorQuestion, function (css) {
                locator = css;
            });

            console.log(`You have chosen the URL ${targetUrl} and CSS Locator Class ${locator}`);

            //rl.question(areYouSureQuestion,
            //    function (confirm) {
            //        if (confirm.toLowerCase() == "y") {
            //            confirmed = true;
            //        }
            //    }
            //);
        }


        //rl.on("close", function() {
        //    console.log("\n|BYE BYE !!!");
        //    process.exit(0);
        //});


await sleep(50000)
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
    }
/*})()*/

//when done reading prompt exit program 
//rl.on('close', () => process.exit(0))