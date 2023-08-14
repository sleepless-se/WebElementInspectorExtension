chrome.action.onClicked.addListener((tab) => {
    // タブ内のcontent.jsにメッセージを送信してセレクタを要求する
    chrome.tabs.sendMessage(tab.id, { type: "getSelector" });
});

// content.jsからのメッセージを受信するリスナーを設定
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "selectorData" && message.data) {
        let textArea = document.createElement("textarea");
        textArea.value = message.data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
});
