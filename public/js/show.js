var form = document.querySelector('new-review')
var textarea = document.querySelector('review-body')

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

form.addEventListener('submit', function (event){
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        textarea.classList.add('unvalidated')
        var el = textarea.nextElementSibling()
        el.innerHTML = "Something's wrong"
        el.style.display="block"
    }
    else {
        textarea.classList.add('validated')
        var el = textarea.nextElementSibling()
        el.style.display='block'
    }
},false)