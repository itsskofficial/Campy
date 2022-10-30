var form = document.querySelector('new-validation')
console.log(form)
var inputs = document.querySelectorAll('.input-validation')
console.log(inputs)

form.addEventListener('submit',function(event){
    if (!form.checkValidity()){
        event.preventDefault()
        event.stopPropagation()
        Array.from(inputs).forEach(function(input){
            input.classList.add('unvalidated')
        })
    }
    Array.from(inputs).forEach(function(input){
            input.classList.add('validated')
        })
},false)
