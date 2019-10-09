/**
 * @author Jess Cannarozzo
 * the extension's event handler; it contains listeners for browser events that are important to the extension. 
 * It lies dormant until an event is fired then performs the instructed logic.
 * An effective background script is only loaded when it is needed and unloaded when it goes idle.
 */

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
//store as url: {currentDOM, prevDOM}
//first have to query for url in storage to see if there is already a currentDOM
//TODO: what to respond back with?
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (sender.tab) {
            chrome.storage.local.get([sender.tab.url], function(urlDOM) {
                console.log("Value is currently: " + urlDOM.key)
                //if undefined, store new DOM at currentDOM
                if (urlDOM.key === undefined) {
                    var url = sender.tab.url;
                    console.log(url);
                    chrome.storage.local.set({
                        url: {currentDOM: request.currentDOM}
                    }, function() {
                        console.log("Initialized new storage object.");
                    })
                } else { //if not undefined, move currentDOM to prevDOM and set new DOM to currentDOM

                }
            });
        }
        sendResponse({
            farewell: "goodbye"
        });
});