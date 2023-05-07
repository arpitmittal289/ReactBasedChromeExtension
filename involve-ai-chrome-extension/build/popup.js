chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.browserAction.setPopup({ tabId: tabs[0].id, popup: 'index.html' });
  });