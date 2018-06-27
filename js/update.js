var Updates = {
  displayMessage: false,
  installMessage: 'Welcome to cVim! Here\'s everything you need to know.',
  tabId: null
};

chrome.runtime.onInstalled.addListener(function(details) {
  var currentVersion   = chrome.runtime.getManifest().version;
  var previousVersion  = details.previousVersion;
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('https://github.com/GuoXiaoyang/PaperDownloader/blob/master/welcome.md'),
      active: true
    }, function(tabInfo) {
      Updates.tabId = tabInfo.id;
      Updates.displayMessage = true;
    });
  } else if (details.reason === 'update') {
    if (previousVersion !== currentVersion) {
      Options.refreshSettings(function() {
        if (settings.changelog) {
          chrome.tabs.create({
            url: chrome.runtime.getURL('chttps://github.com/GuoXiaoyang/PaperDownloader/blob/master/changeLog.md'),
            active: true
          });
        }
      });
    }
/*     var manifest = chrome.runtime.getManifest();
    var contentScripts = manifest.content_scripts[0];
    var checkError = function() { if (chrome.runtime.lastError) return false; };
    return chrome.tabs.query({status: 'complete'}, function(tabs) {
      tabs.forEach(function(tab) {
        contentScripts.js.forEach(function(file) {
          chrome.tabs.executeScript(tab.id, {
            file: file,
            allFrames: contentScripts.all_fames
          }, checkError);
        });
        contentScripts.css.forEach(function(file) {
          chrome.tabs.insertCSS(tab.id, {
            file: file,
            allFrames: contentScripts.all_fames
          }, checkError);
        });
      });
    }); */
  }
});
