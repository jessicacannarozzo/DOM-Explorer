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

// dropdown listener
// https://materializecss.com/collapsible.html
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var options = {
        accordion: true
    };
    var instances = M.Collapsible.init(elems, options);
  });

// on message received, do something iff request.DIFF exists (i.e. content.js is sending a diff)
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (!sender || !sender.tab) {
            return sendResponse(null);
        }

        // console.log(JSON.stringify(request));

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

    //clean collapsible accordion
    document.getElementById("add-text").innerHTML = "";
    document.getElementById("remove-text").innerHTML = "";
    document.getElementById("modify-text").innerHTML = "";

    var div = document.getElementById("ring");

    div.style.visibility = "visible";

    if (diff != "" && diff != undefined) {
        // update percentage
        if (request.percent > 0 && request.percent < 1) {
            document.getElementById("diff").innerHTML = Number(parseFloat(Math.round(request.percent.toFixed(10) * 100) / 100).toFixed(2)) + "%";
        } else if (request.percent > 0 || request.percent === 0) {
            document.getElementById("diff").innerHTML = Number(request.percent.toFixed(2)) + "%";
        }

        // update collapsible accordion
        var elem = document.querySelector('.collapsible.expandable');
        // document.getElementById("add-text").innerHTML = "hello"
        var instance = M.Collapsible.init(elem, {
            accordion: true
        });

        // console.log(request.DIFF[0].action);
        for (index in request.DIFF) {
            console.log(request.DIFF[index]);
            var action = JSON.stringify(request.DIFF[index].action);
            var htmlElement = "";
            if (action.includes("add")) {
                htmlElement = "add-text";
            } else if (action.includes("remove")) {
                htmlElement = "remove-text";
            } else {
                htmlElement = "modify-text";                
            }
            
            var name = getName(request.DIFF[index]);
            var attributes = getAttributes(request.DIFF[index]);

            var output = "<b> Name</b>: " + name + "<br/> <b>Value</b>: " + attributes + "<br/>";

            if (index > 0) {
                var addText = document.getElementById(htmlElement).innerHTML;
                document.getElementById(htmlElement).innerHTML = addText + "<br/>" + output;
            } else {
                document.getElementById(htmlElement).innerHTML = output;
            }
        }
    } else {
        document.getElementById("diff").innerHTML = "No changes yet."
    }
}

// return name or nodename of a diff
function getName(diffObj) {
    if (diffObj.name !== undefined) {
        return JSON.stringify(diffObj.name);
    } else if (diffObj.element !== undefined) {
        if (diffObj.element.nodeName !== undefined) {
            return JSON.stringify(diffObj.element.nodeName);
        } else {
            return "None";
        }
    } else {
        return "None";
    }
}

// return attributes of a diff if applicable
// if no attributes, return value
function getAttributes(diffObj) {
    if (diffObj.element) {
        if (diffObj.element.childNodes) {
            return JSON.stringify(diffObj.element.childNodes);
        } else {
            return "None";
        }
    } else if (diffObj.value) {
        if (!(diffObj.value).replace(/\s/g, '').length) {
            return "Whitespace";
        } else return JSON.stringify(diffObj.value);
    }
     else {
        return "None";
    }
}