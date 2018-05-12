var dashboard = $("ol");

[].map.call($("input:checked",dashboard),function (result) {

	//var result = $("input:checked",dashboard)[2];
	var targetItem = $(result).parent();
	var url = $(".level.is-marginless p>span>a:eq(0)",targetItem)[0].href + '.pdf';
	var title = $(".title",targetItem).text().replace(/\W/g,' ').trim();
	var year = $(".SubType>li:eq(2)>span:eq(0)",targetItem).text().match(/\d{4}/g);
	var authors = $(".authors",targetItem).text().replace(/[\s\r\n]{2,}/g,"").replace('Authors:',"").trim();
	var journal = '';
	var access = (1==1);
	return {title:title, url:url, access:access, year:year, authors:authors, journal:journal};

});