var form = document.querySelector('.new-validation')
console.log(form)
var inputs = document.querySelectorAll('.input-validation')
console.log(inputs)
var success-msgs=document.querySelectorAll('.validation-msg')

form.addEventListener('submit',function(event){
    if (!form.checkValidity()){
        event.preventDefault()
        event.stopPropagation()
        Array.from(inputs).forEach(function(input){
            input.classList.add('unvalidated')
        })
        Array.from(errors)
    }
    Array.from(inputs).forEach(function(input){
        input.classList.add('validated')
    })
    Array.from(success-msgs).forEach(function (success-msg) {
        success-msg.style.display="block"
    })
},false)
