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
//TODO: what to respond back with?
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (sender.tab) {
            console.log(sender.tab.url);
            var url = String(sender.tab.url);
            var obj = {};
            obj[url] = String(request.DOM);

            chrome.storage.local.set(obj);

            // chrome.storage.local.get(url, function(data){
            //     console.log(data); 
            // })
        }

        sendResponse({
            farewell: "goodbye"
        });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
    }
});