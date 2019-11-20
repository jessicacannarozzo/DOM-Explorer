import { html2json } from 'html2json';
import * as jsondiffpatch from 'jsondiffpatch';

var diff = {};

try {
    chrome.runtime.sendMessage({
        DOM: createHTMLString()
    },
    function (response) {
        diff = {};
        var diffPercent = 0;
        // console.log("Response: ", response);
        diff = makeDIFF(response, function(diff) {
            //send message to popup.js
            diffPercent = calculateDiffPercent(response, function(diffPercent) {
                try {
                    chrome.runtime.sendMessage({
                        DIFF: diff,
                        prev: html2json(response.oldValue),
                        percent: diffPercent
                    },
                    function (response) {
                        // console.log("Response: ", response);
                    });
                } catch(e) {
                    console.log("Something went wrong while trying to send the DOM diff: " + e);
                }
            });
        });
    });
} catch(e) {
    console.log("Something went wrong: " + e);
}

// calculate percentage of changes between old and new DOMs
// formula borrowed from https://www.calculator.net/percent-calculator.html
function calculateDiffPercent(response, cb) {
    var oldValue = JSON.stringify(response.oldValue);
    var newValue = JSON.stringify(response.newValue);
    
    var diffPercent = (Math.abs(oldValue.length - newValue.length) / ((oldValue.length + newValue.length)/2)) * 100;
    console.log(diffPercent);
    cb(diffPercent);
}

// uses DiffDOM to make a diff of two HTML strings
function makeDIFF(response, cb) {
    if (response.oldValue != undefined && response.newValue != undefined) { 
        let diff = {};
        console.log("Response: ", response);

        // replace whitespace and newline before diff
        console.log("1" + response.oldValue);
        console.log("2" + response.newValue);
        let oldValue = html2json(response.oldValue); 
        let newValue = html2json(response.newValue); 

        console.log(oldValue);
        console.log(newValue);

        diff = jsondiffpatch.diff(oldValue, newValue);
        console.log(diff);

        if (diff === undefined) {
            diff = {content: false};
        }
    
        cb(diff);
    }
}

function createHTMLString() {
    // console.log(document.getElementsByTagName('center'));
    // if (!document.getElementsByTagName('center')) { return ''; }

    // let centerHTML = document.getElementsByTagName('center');
    // let outputString = "";

    // var i;
    // for (i = 0; i < centerHTML.length; i++) {
    //     outputString = outputString + centerHTML[i].innerHTML;
    // }
    // console.log(outputString);
    // return outputString
    let outputString = document.body.outerHTML;
    let splitted = [];
    splitted = outputString.split("<div id=\"wm-ipp-base\" lang=\"en\" style=\"display: block; direction: ltr;\"> </div>")
    // console.log(outputString);

    outputString = splitted[0].concat(splitted[1]);
    // console.log(outputString);
    return outputString;
}