let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.addEventListener('click', element => {
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
            file: '/scripts/content.js'
        });
    });
});