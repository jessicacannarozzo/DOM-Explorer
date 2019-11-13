let recordDOM = document.getElementById("recordDOM");

recordDOM.addEventListener("click", element => {
  let color = element.target.value;
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      console.log(document);
      chrome.storage.sync.get([String(tabs.url)], function(result) {
        console.log(result);
      });
      chrome.tabs.executeScript({
        file: "/scripts/webpack-bundle.js"
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

  // console.log(JSON.stringify(request));

  if (request.DIFF != undefined) {
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
  document.getElementById("add-text").innerHTML = "";
  document.getElementById("remove-text").innerHTML = "";
  document.getElementById("modify-text").innerHTML = "";

  var div = document.getElementById("ring");

  div.style.visibility = "visible";

  if (diff != "" && diff != undefined) {
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
    let htmlElement = "";
    let action;
    for (index in request.DIFF) {
      console.log(request.DIFF[index]);
      action = request.DIFF[index].action;
      htmlElement = "";
      if (action.includes("add")) {
        htmlElement = "add-text";
      } else if (action.includes("remove")) {
        htmlElement = "remove-text";
      } else {
        htmlElement = "modify-text";
      }

      var name = getName(request.DIFF[index]);
      var attributes = getAttributes(request.DIFF[index]);

      var output =
        "<b> Name</b>: " + name + "<br/> <b>Value</b>: " + attributes + "<br/>";

      if (name) {
        //formatting purposes
        if (index > 0) {
          var addText = document.getElementById(htmlElement).innerHTML;
          document.getElementById(htmlElement).innerHTML =
            addText + "<br/>" + output;
        } else {
          document.getElementById(htmlElement).innerHTML = output;
        }
      } else {
        console.log(request.DIFF[index]);
      }
    }
  } else {
    document.getElementById("diff").innerHTML = "No changes yet.";
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
  //   } else if (diffObj.value) {
  //     if (!diffObj.value.replace(/\s/g, "").length) {
  //       return "Whitespace";
  //     } else {
  //         return JSON.stringify(diffObj.value);
  //     }
  //   } else {
  //     return "None";
  //   }
}
