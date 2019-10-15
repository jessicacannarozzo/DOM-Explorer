// chrome.storage.sync.get('color', function (data) {
//     color = data.color
//     console.log(color)
//     document.body.style.backgroundColor = color;

//     // https://blog.sessionstack.com/how-javascript-works-tracking-changes-in-the-dom-using-mutationobserver-86adc7446401
//     var mutationObserver = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             console.log(mutation);
//         });
//     });

//     // Starts listening for changes in the root HTML element of the page.
//     mutationObserver.observe(document.documentElement, {
//         attributes: true,
//         characterData: true,
//         childList: true,
//         subtree: true,
//         attributeOldValue: true,
//         characterDataOldValue: true
//     });
// });

// import {DiffDOM} from 'diff-dom';

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
    return document.body.outerHTML;
}