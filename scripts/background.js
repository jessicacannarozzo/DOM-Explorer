/**
 * @author Jess Cannarozzo
 * the extension's event handler; it contains listeners for browser events that are important to the extension. 
 * It lies dormant until an event is fired then performs the instructed logic.
 * An effective background script is only loaded when it is needed and unloaded when it goes idle.
 */

 oldValue = {};
 newValue = {};

chrome.runtime.onInstalled.addListener(() => {
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

//receive DOM from content.js
//save old value
//store as: {url: DOM String}
//response: old and new DOM
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (sender.tab) {
            console.log(sender.tab.url);
            var url = String(sender.tab.url);
            newValue = {};
            newValue[url] = {};
            newValue[url].DOM = String(request.DOM);

            chrome.storage.local.get(url, function(result) {
                oldValue = result;
                chrome.storage.local.set(newValue);
            })
        }

        console.log("old valueeeee: " + JSON.stringify(this.oldValue));
        console.log("new valueeeeeee: " + JSON.stringify(this.newValue));
        sendResponse({
            oldValue: this.oldValue,
            newValue: this.newValue
        });
});