chrome.storage.sync.get('color', function (data) {
    color = data.color
    console.log(color)
    document.body.style.backgroundColor = color;
});