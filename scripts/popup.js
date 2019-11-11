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
            updatePopup(request);
            return true;
        }        
    }
);

// update popup.html after diff has been received
function updatePopup(request) {
    var totalDiff = {};
    var keys = [];
    var output = "";

    if (diff != "") {
        //format diff obj for display purposes
        // for (key in request.diff) {
        //     // console.log(request.diff[key])
        //     if (totalDiff[request.diff[key].action] != undefined) { //if action is in obj
        //         totalDiff[request.diff[key].action] += ", " + request.diff[key].name;
        //     } else {
        //         totalDiff[JSON.stringify(request.diff[key].action)] = request.diff[key].name;
        //         keys.push(JSON.stringify(request.diff[key].action));
        //     }
        // }

        // for (index in keys) {
        //     output += keys[index] + ": " + JSON.stringify(totalDiff[keys[index]]) + "\n";
        // }

        //stylize and print inside popup.html
        // document.getElementById("diff").innerHTML = output;

        if (request.percent > 0 && request.percent < 1) {
            document.getElementById("diff").innerHTML = Number(request.percent.toFixed(10)) + "%";
        } else if (request.percent > 0 || request.percent === 0) {
            document.getElementById("diff").innerHTML = Number(request.percent.toFixed(0)) + "%";
        }
        // document.getElementById("diff").innerHTML = request.percent;
    } else {
        document.getElementById("diff").innerHTML = "No changes yet."
    }
}