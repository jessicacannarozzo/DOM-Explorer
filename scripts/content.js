import {DiffDOM, nodeToObj} from 'diff-dom';

var diff = {};

try {
    chrome.runtime.sendMessage({
        DOM: createHTMLString()
    },
    function (response) {
        diff = {};
        console.log("Response: ", response);
        diff = makeDIFF(response, function(diff) {
            try {
                chrome.runtime.sendMessage({
                    DIFF: diff
                },
                function (response) {
                    console.log("Response: ", response);
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
    var dd = new DiffDOM();

    var diff = {};

    diff = dd.diff(JSON.stringify(response.oldValue), JSON.stringify(response.newValue));
    console.log(diff);

    cb(diff);
}

function createHTMLString() {
    if (!document.body) { return ''; }
    return document.body.outerHTML;
}