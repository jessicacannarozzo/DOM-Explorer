/**
 * the extension's event handler; it contains listeners for browser events that are important to the extension. 
 * It lies dormant until an event is fired then performs the instructed logic.
 * An effective background script is only loaded when it is needed and unloaded when it goes idle.
 */

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, function () {
        console.log("The color is green.");
    });
});

chrome.declarativeContent.onClicked.addListener(function(tab) {
    console.log("Hello");
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: 'google'
            },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});