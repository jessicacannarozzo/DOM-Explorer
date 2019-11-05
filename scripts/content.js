import {DiffDOM, nodeToObj} from 'diff-dom';

var diff = {};

try {
    chrome.runtime.sendMessage({
        DOM: createHTMLString()
    },
    function (response) {
        diff = {};
        // console.log("Response: ", response);
        diff = makeDIFF(response, function(diff) {
            //send message to popup.js
            try {
                chrome.runtime.sendMessage({
                    DIFF: diff
                },
                function (response) {
                    // console.log("Response: ", response);
                });
            } catch(e) {
                console.log("Something went wrong while trying to send the DOM diff: " + e);
            }
        });
    });
} catch(e) {
    console.log("Something went wrong: " + e);
}

// uses DiffDOM to make a diff of two HTML strings
function makeDIFF(response, cb) {
    var dd = new DiffDOM({
        valueDiffing: false // does not take into account user input
    });

    var diff = {};
    console.log("Response: ", response);

    // var obj1 = {};
    // var obj2 = {};

    // obj1 = "<body><p>Hello</p></body>"
    // obj2 = "<body><p>Hello</p><a href=\"www.bad.com\"</a></body>"

    // diff = dd.diff(obj1, obj2);
    diff = dd.diff(JSON.stringify(response.oldValue), JSON.stringify(response.newValue));
    console.log(diff);

    cb(diff);
}

function createHTMLString() {
    if (!document.body) { return ''; }
    return document.body.outerHTML;
}