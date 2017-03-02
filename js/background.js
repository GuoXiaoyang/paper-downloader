var currentID = 0;
var currentIndex = 0;
var downloadTabIDs=[];
var paperData = [];

chrome.contextMenus.create({
    'type':'normal',
    'title':'Downloading……',
    'id':'download-paper'
});


function ieeeDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/ieeeDownload.js'}, function (results) {
            var residueThesis = [];
            if (results && results[0] && results[0].length) {
                results[0].forEach(function(item) {
                    if(item.access) {
                        $.get(item.download_a, function (data, textStatus) {
                            // console.log("data", data);
                            // alert(data);
                            var reg_pattern = /http:\/\/[\S]+.pdf[\S]+[\w+]/g;
                            var download_link = reg_pattern.exec(data);
                            chrome.downloads.download({
                                url: download_link[0],
                                filename: item.filename,
                                conflictAction: 'uniquify',
                                saveAs: false
                            });

                        });
                    } else {
                        residueThesis.push('《'+item.filename+'》');
                    }
                })

            }
            console.log(residueThesis.length);
            if(residueThesis.length > 0){
                alert('Cannot download \n'+residueThesis.join('\n')+' \n You have no access authority!');
            }
        });

    });
}


function cnkiDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function() {

        chrome.tabs.executeScript(tab.id, {file: 'js/cnkiDownload.js'}, function () {
            console.log("excecute script");


        });
    });


}

chrome.extension.onRequest.addListener(function(paper_data) {
    paperData = paper_data;
    downloadTabIDs = [];
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for(var i=1;i<paperData.length+1;i++) {
            downloadTabIDs.push(tabs[currentIndex+i].id);
        }

        for(var j=0;j<paperData.length;j++) {
            downloadTabID = downloadTabIDs[j];
            console.log("downloadTabID:",downloadTabID);
            if(j==paperData.length-1) {
                chrome.tabs.executeScript(downloadTabID, {file: 'js/download.js'}, function() {
                    setTimeout(chrome.tabs.remove(downloadTabIDs,function () {
                        console.log("remove tab of:",downloadTabIDs);
                    }),500);
                });
            } else {
                chrome.tabs.executeScript(downloadTabID, {file: 'js/download.js'}, function() {

                });
            }
        }
    });

});






function segDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/segDownload.js'}, function (results) {
            var residueThesis = [];
            if (results && results[0] && results[0].length) {
                results[0].forEach(function(item) {
                    if(item.access) {
                        $.get(item.download_a, function (data, textStatus) {
                            // console.log("data", data);
                            // alert(data);
                            var reg_pattern = /http:\/\/[\S]+.pdf[\S]+[\w+]/g;
                            var download_link = reg_pattern.exec(data);
                            chrome.downloads.download({
                                url: download_link[0],
                                filename: item.filename,
                                conflictAction: 'uniquify',
                                saveAs: false
                            });

                        });
                    } else {
                        residueThesis.push('《'+item.filename+'》');
                    }
                })

            }
            console.log(residueThesis.length);
            if(residueThesis.length > 0){
                alert('Cannot download \n'+residueThesis.join('\n')+' \n You have no access authority!');
            }
        });

    });
}


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    currentID = tab.id;
    currentIndex = tab.index;
    if(info.menuItemId == 'download-paper'){
        var match = "none";
        var URI = tab.url;
        console.log(tab.url);
        var reg_cnki = /kns.cnki.net/g;
        var reg_ieee = /ieeexplore.ieee.org/g;
        var reg_seg = /library.seg.org/g;
        if(reg_cnki.exec(URI) !== null) match="cnki";
        if(reg_ieee.exec(URI) !== null) match="ieee";
        if(reg_seg.exec(URI) !== null) match="seg";
        switch (match) {
            case "ieee":
                ieeeDownload(tab);
                break;
            case "cnki":
                cnkiDownload(tab);
                break;
            case "seg":
                segDownload(tab);
                break;
            default:
                console.log("not matched");
        }



    }

});