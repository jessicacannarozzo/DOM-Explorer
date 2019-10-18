let recordDOM = document.getElementById('recordDOM');

chrome.storage.sync.get('color', function (data) {
    recordDOM.style.backgroundColor = data.color;
    recordDOM.setAttribute('value', data.color);
});

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