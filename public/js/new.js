var form = document.querySelector('.new-validation')
var inputs = document.querySelectorAll('.input-validation')
var successMsgs=document.querySelectorAll('.validation-msg')
var errorMsgs = document.querySelectorAll('.unvalidation-msg')

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

form.addEventListener('submit',function(event){
    if (!form.checkValidity()){
        event.preventDefault()
        event.stopPropagation()
        Array.from(inputs).forEach(function(input){
            if (!input.checkValidity()) {
                input.classList.add('unvalidated')
                var el = input.nextElementSibling()
                el.innerHTML = "Something's wrong"
                el.style.display="block"
            }
            else {
                input.classsList.add('validated')
                var el = input.nextElementSibling()
                el.innerHTML = "Looks good"
                el.style.display="block"
            }
        })
    }
    }
},false)
