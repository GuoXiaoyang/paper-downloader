/**
 * Created by guoxiaoyang on 2017/1/15.
 */
if($(".ResultList.col-xs-24").length){
	var dashboard=$(".ResultList.col-xs-24");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent().parent().parent();
		var url = $(".download-link",targetItem)[0].href;
		var title = $(".result-item-content h2>a",targetItem).text().replace(/\W/g,' ');
		var year = $(".SubType>li:eq(2)>span:eq(0)",targetItem).text().match(/\d{4}/g);
<<<<<<< HEAD
		var month = (chrono.parseDate($(".SubType>li:eq(2)>span:eq(0)",targetItem).text()).getMonth()+1).toString();
=======
		var month = chrono.parseDate($(".SubType>li:eq(2)>span:eq(0)",targetItem).text()).getMonth().toString();
>>>>>>> a6f98ffc3ea8027c4cb1e6d70fd9093b25bda983
		var authors = $(".Authors",targetItem).text().replace(/[\s\r\n]{2,}/g,"");
		var journal = $(".SubType>li:eq(0)>a>span",targetItem).text();
		var download_success = $(".preview-link-text",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\nurl:'+url+'\nauthors:'+authors+'\njournal:'+journal+'\nyear:'+year+'\naccess:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}else{
	var dashboard = $(".article-list-items");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent().parent();
		var url = $(".pdf-download",targetItem)[0].href;
		var title = $("h3>a",targetItem).text().replace(/\W/g,' ');
		var year = $(".js-issue-status").text().match(/\d{4}/g);
<<<<<<< HEAD
		var month = (chrono.parseDate($(".js-issue-status").text()).getMonth()+1).toString();
=======
		var month = chrono.parseDate($(".js-issue-status").text()).getMonth().toString();
>>>>>>> a6f98ffc3ea8027c4cb1e6d70fd9093b25bda983
		var authors = $(".js-article__item__authors",targetItem).text().replace(/[\s\r\n]{2,}/g,"");
		var journal = $("h1>a").text();
		var download_success = $(".pdf-download",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\nurl:'+url+'\nauthors:'+authors+'\njournal:'+journal+'\nyear:'+year+'\naccess:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}

