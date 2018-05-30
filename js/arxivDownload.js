if($("ol").length){
	var dashboard = $("ol");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent();
		var url = $(".level.is-marginless p>span>a:eq(0)",targetItem)[0].href + '.pdf';
		var title = $(".title",targetItem).text().replace(/\W/g,' ').trim();
		var year = $(".is-size-7",targetItem).text().match(/\d{4}/g)[0];
		var month = (chrono.parseDate($(".is-size-7",targetItem).text()).getMonth()+1).toString();
		var authors = $(".authors",targetItem).text().replace(/[\s\r\n]{2,}/g,"").replace('Authors:',"").trim();
		var journal = '';
		var access = true;
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}else{
	var dashboard = $("dl");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent();
		var url = $(".list-identifier > a:contains('pdf')",targetItem)[0].href + '.pdf';
		var year = $(targetItem).parent().prev().text().match(/\d{4}/g)[0];
		var month = (chrono.parseDate($(targetItem).parent().prev().text()).getMonth()+1).toString();
		var contexItem = $(targetItem).next();
		var title = $(".list-title",contexItem)[0].innerText.replace(/\W/g,' ').trim();
		var authors = $(".list-authors",contexItem).text().replace(/[\s\r\n]{2,}/g,"").replace('Authors:',"").trim();
		var journal = '';
		var access = true;
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}
