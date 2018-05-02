/**
 * Created by guoxiaoyang on 2017/1/15.
 */

var dashboard=$(".article-list.List-results");
// console.log('dashboard', dashboard[0]);

[].map.call($("input:checked",dashboard),function (result) {
    // console.log('result', result)
    // console.log('result length',$(result).length);
    var targetItem = $(result).parent().parent();
    var download_a = $(".icon-pdf",targetItem)[0].href;
    console.log("checked-downloader-links:",download_a);
    var title = $(".col-22-24 h2>a",targetItem).text().replace(/\W/g,' ');
    var date = $(".description>div:eq(0)>span:eq(0)",targetItem).text().match(/\d{4}/g);
    var authors = $(".author",targetItem).text().replace(/[\s\r\n]/g,"");
    var journal = $(".description>a:eq(0)",targetItem).text();
    var filename = "【"+date+"】"+title+".pdf";
    console.log('filename', filename);
    var download_success = $(".icon-access-subscribed",targetItem);
    var download_locked = $(".icon-access-locked",targetItem);
    var access = (download_success.length == 1);
    return {filename:filename, download_a:download_a, access:access};



    // $(result).each(function () {


        //get request:cross domain
/*        $.ajax({
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
        });*/



    // alert(download_a);
    // });


});