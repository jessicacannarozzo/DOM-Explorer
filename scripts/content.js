import {DiffDOM, nodeToObj} from 'diff-dom';

try {
    chrome.runtime.sendMessage({
        DOM: createHTMLString()
    },
    function (response) {
        console.log("Response: ", response);
        makeDIFF(response);
    });
} catch(e) {
    console.log("Something went wrong: " + e);
}

// uses DiffDOM to make a diff of two HTML strings
function makeDIFF(response) {
    var dd = new DiffDOM();

    var diff = {};

    diff = dd.diff(JSON.stringify(response.oldValue), JSON.stringify(response.newValue));
    console.log(diff);
}

function createHTMLString() {
    if (!document.body) { return ''; }
    return document.body.outerHTML;
}