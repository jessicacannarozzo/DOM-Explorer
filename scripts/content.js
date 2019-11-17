import {DiffDOM, stringToObj} from 'diff-dom';

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
        var dd = new DiffDOM({
            valueDiffing: false // does not take into account user input
        });
    
        var diff = {};
        console.log("Response: ", response);

        // replace whitespace and newline before diff
        var oldValue = JSON.stringify(response.oldValue).replace(/(?:\\[rn]|[\r\n]+)+/g, "");
        var newValue = JSON.stringify(response.newValue).replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    
        diff = dd.diff(stringToObj(oldValue), stringToObj(newValue));
        console.log(diff);
    
        cb(diff);
    }
}

function createHTMLString() {
    console.log(document.getElementsByTagName('center'));
    if (!document.getElementsByTagName('center')) { return ''; }

    let centerHTML = document.getElementsByTagName('center');
    let outputString = "";

    var i;
    for (i = 0; i < centerHTML.length; i++) {
        outputString = outputString + centerHTML[i].innerHTML;
    }
    console.log(outputString);
    return outputString
}