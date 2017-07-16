'use strict';

const openDonna = () => {
  chrome.tabs.create({'url': chrome.extension.getURL('app/index.html'), selected: true})
}

chrome.runtime.onInstalled.addListener(details => {
  openDonna()
});

chrome.browserAction.onClicked.addListener(function(tab) {
  openDonna()
});

// chrome.browserAction.setBadgeText({text: 'hello 4'});
