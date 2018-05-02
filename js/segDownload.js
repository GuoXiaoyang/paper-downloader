/**
 * Created by guoxiaoyang on 2017/1/18.
 */
[].map.call(document.getElementsByClassName('selectedRow'), function(selectedRow){
    //get time-tag, titlename and year
    var art_meta = (selectedRow.getElementsByClassName('art_meta')[0]).textContent;
    var titleName = (selectedRow.getElementsByClassName('hlFld-Title')[0]).textContent;
    var formatTitleName = titleName.replace(/\W/g,' ');
    var yearStr = art_meta.match(/\d{4}/);
    //console.log('title = '+formatTitleName);
    return {access:(selectedRow.getElementsByClassName('accessIcon')[0]).alt == "full access",year:yearStr,title:formatTitleName,url:(selectedRow.getElementsByClassName('ref nowrap pdf')[0]).href};
});
