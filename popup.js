document.getElementById('textMode').addEventListener('click', function () {
    chrome.storage.local.set({ selectionMode: 'text' });
    window.close();
});

document.getElementById('imageMode').addEventListener('click', function () {
    chrome.storage.local.set({ selectionMode: 'image' });
    window.close();
});
