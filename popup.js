document.getElementById('textMode').addEventListener('click', function () {
    chrome.tabs.executeScript({
        code: `window.selectionMode = 'text';`
    });
    window.close();
});

document.getElementById('imageMode').addEventListener('click', function () {
    chrome.tabs.executeScript({
        code: `window.selectionMode = 'image';`
    });
    window.close();
});
