chrome.storage.sync.get('file_name_format',function(data){
	var file_name_format = data.file_name_format;
	file_name_format = file_name_format?file_name_format:'[%year] %title';
	document.getElementById('file_name_format').value = file_name_format;
})
document.getElementById('save').onclick = function(){
	chrome.storage.sync.set({'file_name_format':document.getElementById('file_name_format').value},function(){
		alert('Success!');
	})
}