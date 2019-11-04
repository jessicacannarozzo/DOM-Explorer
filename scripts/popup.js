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
            return true;
        }        

    });

// var x = document.createElement("P");                        // Create a <p> element
// var t = document.createTextNode("This is a paragraph.");    // Create a text node
// x.appendChild(t);                                           // Append the text to <p>
// document.body.appendChild(x);                               // Append <p> to <body>
