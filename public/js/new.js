var form = document.querySelector('.new-validation')
var inputs = document.querySelectorAll('.input-validation')
var successMsgs=document.querySelectorAll('.validation-msg')
var errorMsgs = document.querySelectorAll('.unvalidation-msg')

form.addEventListener('submit',function(event){
    if (!form.checkValidity()){
        event.preventDefault()
        event.stopPropagation()
        Array.from(inputs).forEach(function(input){
            input.classList.add('unvalidated')
        })
        Array.from(errorMsgs).forEach(function())
    }
    Array.from(inputs).forEach(function(input){
        input.classList.add('validated')
    })
    Array.from(successMsgs).forEach(function (successMsg) {
        successMsg.style.display="block"
    })
},false)
