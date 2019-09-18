/**
 * the extension's event handler; it contains listeners for browser events that are important to the extension. 
 * It lies dormant until an event is fired then performs the instructed logic.
 * An effective background script is only loaded when it is needed and unloaded when it goes idle.
 */

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, () => {
        console.log("The color is green.");
    });
    //rule to make button only work if the page is bookmarked
    var rule = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                isBookmarked: true
            })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    };
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
});