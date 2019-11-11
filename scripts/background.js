/**
 * @author Jess Cannarozzo
 * the extension's event handler; it contains listeners for browser events that are important to the extension. 
 * It lies dormant until an event is fired then performs the instructed logic.
 * An effective background script is only loaded when it is needed and unloaded when it goes idle.
 */

var oldValue = {};
var newValue = {};

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
    (request, sender, sendResponse) => {
        if (!sender || !sender.tab) {
            return sendResponse(null);
        }

        if (request.DOM != undefined) {
            console.log(sender.tab.url);
            var url = sender.tab.url;
            newValue = {};
            newValue[url] = {};
            newValue[url].DOM = request.DOM + '';
    
            chrome.storage.local.get(url, result => {
                oldValue = result;
                chrome.storage.local.set(newValue); // this accepts a callback
                console.log("old: " + JSON.stringify(oldValue, null, 2));
                console.log("new: " + JSON.stringify(newValue, null, 2));
                sendResponse({
                    oldValue: Object.getOwnPropertyNames(oldValue).length === 0 ? "" : oldValue[url].DOM,
                    newValue: newValue[url].DOM
                });
            })
            return true;
        }        
    });