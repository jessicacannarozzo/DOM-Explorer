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

    var div = document.getElementById("ring");

    div.style.visibility = "visible";

    if (diff != "" && diff != undefined) {
        if (request.percent > 0 && request.percent < 1) {
            document.getElementById("diff").innerHTML = Number(parseFloat(Math.round(request.percent.toFixed(10) * 100) / 100).toFixed(2)) + "%";
        } else if (request.percent > 0 || request.percent === 0) {
            document.getElementById("diff").innerHTML = Number(request.percent.toFixed(2)) + "%";
        }
    } else {
        document.getElementById("diff").innerHTML = "No changes yet."
    }
}