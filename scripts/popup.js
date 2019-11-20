let recordDOM = document.getElementById("recordDOM");

recordDOM.addEventListener("click", element => {
  let color = element.target.value;
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      chrome.storage.sync.get([String(tabs.url)], function(result) {
        console.log(result);
      });
      chrome.tabs.executeScript({
        file: "/scripts/content-bundle.js"
      });
    }
  );
});

// dropdown listener
// https://materializecss.com/collapsible.html
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elems, {
    accordion: true
  });
});

// on message received, do something iff request.DIFF exists (i.e. content.js is sending a diff)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!sender || !sender.tab) {
    return sendResponse(null);
  }

  // request contains DIFF to send
    if (request.DIFF !== undefined) {
    sendResponse({
      success: true
    });
    console.log(request.percent);
    updatePopup(request);
    return true;
  } 
});

// update popup.html after diff has been received
function updatePopup(request) {
  var output = "";

  //clean collapsible accordion
  document.getElementById("modify-text").innerHTML = "";

  var div = document.getElementById("ring");

  div.style.visibility = "visible";

  let diff = request.DIFF;

  // update percentage
  if (request.percent > 0 && request.percent < 1) {
    document.getElementById("diff").innerHTML =
      Number(
        parseFloat(
          Math.round(request.percent.toFixed(10) * 100) / 100
        ).toFixed(2)
      ) + "%";
  } else if (request.percent > 0 || request.percent === 0) {
    document.getElementById("diff").innerHTML =
      Number(request.percent.toFixed(2)) + "%";
  }
  
  // update collapsible accordion
  if (request.DIFF.content !== undefined) {
    document.getElementById("modify-text").innerHTML = "No changes yet.";
  } else {
    console.log(request.DIFF);
    document.getElementById('modify-text').innerHTML = jsondiffpatch.formatters.html.format(request.DIFF, request.prev);
    jsondiffpatch.formatters.html.hideUnchanged();  
  }
}

// return name or nodename of a diff
function getName(diffObj) {
  if (diffObj.name) {
    return diffObj.name;
  } else if (diffObj.element) {
    let elName = diffObj.element.nodeName || diffObj.element.tagName;
    if (diffObj.element.nodeName) {
      return elName;
    } else {
      return null;
    }
  } else {
    if (!diffObj.oldValue || !diffObj.newValue) {
      return null;
    }
    return "text";
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
  } else {
      let val = JSON.stringify(diffObj.value || diffObj.newValue || {}).replace(/[\s\t\n]/, '');
      if (!val) { return 'Whitespace'; }
      return val;
  }
}
