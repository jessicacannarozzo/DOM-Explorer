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
            updatePopup(request.DIFF);
            return true;
        }        
    }
);

// update popup.html after diff has been received
function updatePopup(diff) {
    if (diff != "") {

        for (key in diff) {
            console.log(diff[key])
        }

        document.getElementById("diff").innerHTML = JSON.stringify(diff[0]);
    } else {
        document.getElementById("diff").innerHTML = "No changes yet."
    }
}

// var x = document.createElement("P");                        // Create a <p> element
// var t = document.createTextNode("This is a paragraph.");    // Create a text node
// x.appendChild(t);                                           // Append the text to <p>
// document.body.appendChild(x);                               // Append <p> to <body>
