chrome.tabs.onUpdated.addListener( function (updatedTabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(updatedTabId, {message:"googleUrl"});
    }
})
