var currentID = 0;
var currentIndex = 0;
var downloadTabIDs=[];
var paperData = [];

chrome.contextMenus.create({
    'type':'normal',
    'title':'Downloading……',
    'id':'download-paper'
});


////////////////////////////////////////////////////////////////////////////////////
// cnki

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



///////////////////////////////////////////////////////////////////////////////////////////
// ieeexplore.ieee.org

function ieeeDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/ieeeDownload.js'}, function (results) {
            var residueThesis = [];
            if (results && results[0] && results[0].length) {
                results[0].forEach(function(item) {
                    if(item.access) {
                        $.get(item.url, function (data, textStatus) {
                            // console.log("data", data);
                            // alert(data);
                            var reg_pattern = /https:\/\/[\S]+.pdf[\S]+[\w+]/g;
                            var download_link = reg_pattern.exec(data);
							chrome.storage.sync.get('file_name_format',function(data){
								var file_name_format = data.file_name_format;
								chrome.storage.sync.get('save_folder',function(data){
									var engine = 'IEEE';
									file_name_format = file_name_format?file_name_format:'[%year] %title';
									file_name = file_name_format.replace('%year',item.year).replace('%month',item.month).replace('%title',item.title).replace('%authors',item.authors).replace('%journal',item.journal).replace('%engine',engine);
									chrome.downloads.download({
										url: download_link[0],
										filename:data.save_folder + file_name+'.pdf',
										conflictAction: 'uniquify',
										saveAs: false
									});
								})
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


///////////////////////////////////////////////////////////////////////////////
//  arxiv.org download

function arxivDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/arxivDownload.js'}, function (results) {
            var residueThesis = [];
            console.log(results);
            if (results && results[0] && results[0].length){
                results[0].forEach(function(item) {
                    if(item.access){	//whether have the privilege
                        chrome.storage.sync.get('file_name_format',function(data){
							var file_name_format = data.file_name_format;
							chrome.storage.sync.get('save_folder',function(data){
								console.log('access = '+item.access);
								console.log('year = '+item.year);
								console.log('month = ' + item.month);
								console.log('title = '+item.title);
								console.log('url = '+item.url);
								var engine = 'ArXiv';
								file_name_format = file_name_format?file_name_format:'[%year] %title';
								file_name = file_name_format.replace('%year',item.year).replace('%month',item.month).replace('%title',item.title).replace('%authors',item.authors).replace('%journal',item.journal).replace('%engine',engine);
								chrome.downloads.download({
									url: item.url,
									filename:data.save_folder + file_name+'.pdf',
									conflictAction: 'uniquify',
									saveAs: false
								});
							})
						});
                    }
                    else{
                        //alert('Cannot download 《'+item.title+' 》\n You have no access authority!');
                        residueThesis.push('《'+item.title+'》');
                    }
                });
            }
            console.log(residueThesis.length);
            if(residueThesis.length > 0){
                alert('Cannot download \n'+residueThesis.join('\n')+' \n You have no access authority!');
            }
        });

    });
}

////////////////////////////////////////////////////////////////////////////////////
// library.seg.org

function segDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/segDownload.js'}, function (results) {
            var residueThesis = [];
            console.log(results);
            if (results && results[0] && results[0].length){
                results[0].forEach(function(item) {
                    if(item.access){	//whether have the privilege
						chrome.storage.sync.get('file_name_format',function(data){
							var file_name_format = data.file_name_format;
							chrome.storage.sync.get('save_folder',function(data){
								console.log('access = '+item.access);
								console.log('year = '+item.year);
								console.log('month = ' + item.month);
								console.log('title = '+item.title);
								console.log('url = '+item.url);
								var engine = 'SEG';
								file_name_format = file_name_format?file_name_format:'[%year] %title';
								file_name = file_name_format.replace('%year',item.year).replace('%month',item.month).replace('%title',item.title).replace('%authors',item.authors).replace('%journal',item.journal).replace('%engine',engine);
								chrome.downloads.download({
									url: item.url,
									filename:data.save_folder + file_name+'.pdf',
									conflictAction: 'uniquify',
									saveAs: false
								});
							})
						});
                    }
                    else{
                        //alert('Cannot download 《'+item.title+' 》\n You have no access authority!');
                        residueThesis.push('《'+item.title+'》');
                    }
                });
            }
            console.log(residueThesis.length);
            if(residueThesis.length > 0){
                alert('Cannot download \n'+residueThesis.join('\n')+' \n You have no access authority!');
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////
// sciencedirect

function sciencedirectDownload(tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/jquery.js'}, function(){
        chrome.tabs.executeScript(tab.id, {file:'js/sciencedirectDownload.js'}, function (results) {
            var residueThesis = [];
            if (results && results[0] && results[0].length) {
                results[0].forEach(function(item) {
                    if(item.access) {
                        $.get(item.url, function (data, textStatus) {
                            var reg_pattern = /https:\/\/[\S]+.pdf[\S]+(?=")/g;
                            item.url = reg_pattern.exec(data)[0];
							//console.log('url:  '+download_link)
							
							chrome.storage.sync.get('file_name_format',function(data){
								var file_name_format = data.file_name_format;
								chrome.storage.sync.get('save_folder',function(data){
									console.log('access = '+item.access);
									console.log('year = '+item.year);
									console.log('month = ' + item.month);
									console.log('title = '+item.title);
									console.log('url = '+item.url);
									var engine = 'SD';
									file_name_format = file_name_format?file_name_format:'[%year] %title';
									file_name = file_name_format.replace('%year',item.year).replace('%month',item.month).replace('%title',item.title).replace('%authors',item.authors).replace('%journal',item.journal).replace('%engine',engine);
									chrome.downloads.download({
										url: item.url,
										filename:data.save_folder + file_name+'.pdf',
										conflictAction: 'uniquify',
										saveAs: false
									});
								})
							});
                        });
                    } else {
                        residueThesis.push('《'+item.title+'》');
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
		var reg_sciencedirect = /sciencedirect.com/g;
		var reg_arxiv = /arxiv.org/g;
        if(reg_cnki.exec(URI) !== null) match="cnki";
        if(reg_ieee.exec(URI) !== null) match="ieee";
        if(reg_sciencedirect.exec(URI) !== null) match="science";
		if(reg_arxiv.exec(URI) !== null) match="arxiv";
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
			case "science":
				sciencedirectDownload(tab);
				break;
			case "arxiv":
				arxivDownload(tab);
				break;
            default:
                console.log("not matched");
        }



    }

});