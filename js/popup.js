chrome.storage.sync.get('file_name_format',function(data){
	var file_name_format = data.file_name_format;
	file_name_format = file_name_format?file_name_format:'[%year] %title';
	document.getElementById('file_name_format').value = file_name_format;
})
chrome.storage.sync.get('save_folder',function(data){
	var save_folder = data.save_folder;
	save_folder = save_folder?save_folder:'';
	document.getElementById('save_folder').value = save_folder;
})
document.getElementById('save').onclick = function(){
	chrome.storage.sync.set({'file_name_format':document.getElementById('file_name_format').value},function(){
		chrome.storage.sync.set({'save_folder':document.getElementById('save_folder').value},function(){
			alert("save successfully!");
		});
	});
}
