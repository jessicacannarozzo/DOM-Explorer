let recordDOM = document.getElementById('recordDOM');

recordDOM.addEventListener('click', element => {
    let color = element.target.value;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        console.log(document)
        chrome.storage.sync.get([String(tabs.url)], function(result) {
            console.log(result)
        });
        chrome.tabs.executeScript({
            file: '/scripts/webpack-bundle.js'
        });
    });
});

// on message received, do something iff request.DIFF exists (i.e. content.js is sending a diff)
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (!sender || !sender.tab) {
            return sendResponse(null);
        }

        console.log(JSON.stringify(request));

        if (request.DIFF != undefined) {
            sendResponse({
                success: true
            });
            console.log(request.percent)
            updatePopup(request.DIFF);
            return true;
        }        
    }
);

// update popup.html after diff has been received
function updatePopup(diff) {
    var totalDiff = {};
    var keys = [];
    var output = "";

    if (diff != "") {
        //format diff obj for display purposes
        for (key in diff) {
            // console.log(diff[key])
            if (totalDiff[diff[key].action] != undefined) { //if action is in obj
                totalDiff[diff[key].action] += ", " + diff[key].name;
            } else {
                totalDiff[JSON.stringify(diff[key].action)] = diff[key].name;
                keys.push(JSON.stringify(diff[key].action));
            }
        }

        for (index in keys) {
            output += keys[index] + ": " + JSON.stringify(totalDiff[keys[index]]) + "\n";
        }

        //stylize and print inside popup.html
        document.getElementById("diff").innerHTML = output;
    } else {
        document.getElementById("diff").innerHTML = "No changes yet."
    }
}