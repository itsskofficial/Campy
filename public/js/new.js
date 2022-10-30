var forms=document.querySelectorAll('.validation')
var inputs=document.querySelectorAll('.input-validation')

Array.from(forms)
    .forEach(function(form){
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
    })
