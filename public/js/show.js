var form = document.getElementById('new-review')
var textarea = document.getElementById('review-body')

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

form.addEventListener('submit', function (event){
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        textarea.classList.add('unvalidated')
        var el = textarea.nextElementSibling()
        el.innerHtml
    }
})