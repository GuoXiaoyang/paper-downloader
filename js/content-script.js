var liResults=document.querySelectorAll('ol.breathe-horizontal>li.arxiv-result')
liResults.forEach(li => {
	var checkbox = document.createElement('input')
	checkbox.type = "checkbox"
	checkbox.className = "result-checkbox"
	checkbox.style.float = "left"
	checkbox.style.width = "1rem"
	checkbox.style.marginLeft = "-1.5rem"
	checkbox.style.marginTop = "7px"
	li.style.listStyle = "none"
	li.insertBefore(checkbox, li.firstElementChild)
})

$("dt>a").replaceWith("<input type = checkbox class = result-checkbox></input>")