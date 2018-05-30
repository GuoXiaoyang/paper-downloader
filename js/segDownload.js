/**
 * Created by guoxiaoyang on 2017/1/18.
 */
if($(".toc").length){
	var dashboard = $(".toc");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent();
		var url = $(".ref.nowrap.pdf",targetItem)[0].href + "?download=true";
		var title = $(".hlFld-Title",targetItem).text().replace(/\W/g,' ');
		var year = $(".pubDate",targetItem).text().match(/\d{4}/);
		var month = (chrono.parseDate($(".pubDate",targetItem).text()).getMonth()+1).toString();
		if(!year){
			year = $("h2").text().match(/\d{4}/);
			month = '';
		}
		var authors = $(".entryAuthor",targetItem).text().replace(/[\s\r\n]{2,}/g,"");
		var journal = $("h1").text().trim();
		var download_success = $(".accessIcon",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}else{
	var dashboard = $("#frmSearchResults");
	[].map.call($("input:checked",dashboard),function (result) {
		var targetItem = $(result).parent().parent();
		var url = $(".ref.nowrap.pdf",targetItem)[0].href + "?download=true";
		var title = $(".hlFld-Title",targetItem).text().replace(/\W/g,' ');
		var year = $(".art_meta",targetItem).text().match(/\d{4}/);
		var month = (chrono.parseDate($(".art_meta",targetItem).text()).getMonth()+1).toString();
		var authors = $(".entryAuthor",targetItem).text().replace(/[\s\r\n]{2,}/g,"");
		var journal = $(".searchResultJournal",targetItem).text().trim();
		var download_success = $(".accessIcon",targetItem);
		var access = (download_success.length == 1);
		console.log('title:'+title+'\n url:'+url+'\n authors:'+authors+'\n journal:'+journal+'\n year:'+year+'\n access:'+access);
		return {title:title, url:url, access:access, year:year, month:month, authors:authors, journal:journal};
	});
}
 
 
/*  [].map.call(document.getElementsByClassName('selectedRow'), function(selectedRow){
		//get time-tag, titlename and year
		var art_meta = (selectedRow.getElementsByClassName('art_meta')[0]).textContent;
		var titleName = (selectedRow.getElementsByClassName('hlFld-Title')[0]).textContent;
		var formatTitleName = titleName.replace(/\W/g,' ');
		var yearStr = art_meta.match(/\d{4}/);
		var 
		//console.log('title = '+formatTitleName);
		return {access:(selectedRow.getElementsByClassName('accessIcon')[0]).alt == "full access",year:yearStr,title:formatTitleName,url:(selectedRow.getElementsByClassName('ref nowrap pdf')[0]).href+"?download=true"};
	}); */
 


