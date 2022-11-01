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
                
            }
            var el=document.createElement('h4')
            el.innerHTML = "Something's wrong"
            insertAfter(input, el)
        })
    }
    else {
        Array.from(inputs).forEach(function(input){
            input.classList.add('validated')
        })
        Array.from(successMsgs).forEach(function (successMsg) {
            successMsg.style.display="block"
        })
    }
},false)
