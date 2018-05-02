/**
 * Created by guoxiaoyang on 2017/1/18.
 */
var iframe = document.getElementById('iframeResult');
console.log("iframe:",iframe);
var innerDoc = iframe.contentWindow.document;

// console.log("innerDoc:",innerDoc);
var downURL = $("table input:checked",innerDoc);
//console.log("downURL:",downURL);
var paper_data=[];
var paper_ele={};
console.log("starting...");

for(var i=0;i<downURL.length;i++) {
    var result = downURL[i];
    var targetItem = $(result).parent().parent();
    paper_ele.download_a = $("td:eq(1) a",targetItem)[0];
    var title = $("td:eq(1)",targetItem).text().replace(/\s/g,'');
    var date = $("td:eq(4)",targetItem).text().match(/\d{4}/g);
    var authors = $("td:eq(2)",targetItem).text().split(";")[0];
    var journal = $("td:eq(3)",targetItem).text().replace(/\s/g,'');
    var database = $("td:eq(5)",targetItem).text().replace(/\s/g,'');
    paper_ele.filename = "【"+date+"】"+title+".pdf";
    var download_success = $(".icon-access-subscribed",targetItem);
    var download_locked = $(".icon-access-locked",targetItem);
    var access = true;
    paper_data.push(paper_ele);
    paper_ele.download_a.click();
}

chrome.extension.sendRequest(paper_data);
console.log("Have sent");
/*
[].map.call($("table input:checked",innerDoc),function (result) {
    console.log("test1");
    console.log(result,$(result).length);
    var targetItem = $(result).parent().parent();
    var download_a = $("td:eq(1) a",targetItem)[0].href;
    console.log("checked-downloader-links:",download_a);
    var title = $("td:eq(1)",targetItem).text().replace(/\s/g,'');
    var date = $("td:eq(4)",targetItem).text().match(/\d{4}/g);
    var authors = $("td:eq(2)",targetItem).text().split(";")[0];
    var journal = $("td:eq(3)",targetItem).text().replace(/\s/g,'');
    var database = $("td:eq(5)",targetItem).text().replace(/\s/g,'');
    var filename = "【"+date+"】"+title+".pdf";
    var download_success = $(".icon-access-subscribed",targetItem);
    var download_locked = $(".icon-access-locked",targetItem);
    var access = true;
    return {filename:filename, download_a:download_a, access:access,database:database};



    // $(result).each(function () {


    //get request:cross domain
    /!*        $.ajax({
     type: "GET",
     url: download_a,
     dataType: 'html',
     xhrFields: {
     withCredentials: true
     },
     crossDomain: true,
     success:function(data, textStatus){
     console.log(data);

     },
     error:function(XMLHttpRequest, textStatus, errorThrown){
     console.error("Request failure:",textStatus)
     }
     });*!/



    // alert(download_a);
    // });


});*/
