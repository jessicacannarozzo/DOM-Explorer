// dd = new DiffDOM();
try {
    chrome.runtime.sendMessage({
        DOM: createHTMLString()
    },
    function (response) {
        console.log("Response: ", response);
    });
} catch(e) {
    console.log("Something went wrong: " + e);
}


function createHTMLString() {
    if (!document.body) { return ''; }
    return document.body.outerHTML;
}