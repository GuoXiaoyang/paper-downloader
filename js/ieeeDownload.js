/**
 * Created by guoxiaoyang on 2017/1/15.
 */

if($(".results").length) {
	var dashboard = $(".results");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent();
		var url = $(".button",targetItem).parent()[0].href;
		var title = $(".txt h3>a>span",targetItem).text().replace(/\W/g,' ');
		var year = $(".txt",targetItem)[0].innerText.match(/[Publication Year: ](\d{4})/g)[0].trim();
		var authors = $(".authors",targetItem).text().replace(/[\s\r\n]{2,}/g,"");
		var journal = $('h1').text().trim();
		var download_success = $(".access-icon",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, authors:authors, journal:journal};
	});
} else {
	var dashboard=$(".article-list.List-results");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent();
		var url = $(".icon-pdf",targetItem)[0].href;
		console.log("checked-downloader-links:",url);
		var title = $(".col-22-24 h2>a",targetItem).text().replace(/\W/g,' ');
		var year = $(".description>div:eq(0)>span:eq(0)",targetItem).text().match(/\d{4}/g);
		var authors = $(".author",targetItem).text().replace(/[\s\r\n]/g,"");
		var journal = $(".description>a:eq(0)",targetItem).text();
		var download_success = $(".icon-access-subscribed",targetItem);
		var download_locked = $(".icon-access-locked",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, authors:authors, journal:journal};
	});
}

