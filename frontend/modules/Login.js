import validator from 'validator';

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    } 
    init(){
        this.events();
    }
    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validate(e);
        });
    }
    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const labelEmail = el.querySelector('.label-email');
        const passwordInput = el.querySelector('input[name="password"]');
        const labelPassword = el.querySelector('.label-password');
        let error = false;
        
        this.removeStatus();
        if(!validator.isEmail(emailInput.value)){
            this.createError(emailInput, labelEmail, 'Email inválido');
            error = true;
        };
        if(passwordInput.value.length < 5 || passwordInput.value.length >12){
            this.createError(passwordInput, labelPassword, 'Senha inválida');
            error = true;
        }
        if(!error) el.submit();
    }
    removeStatus(){
        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        for(let errorText of this.form.querySelectorAll('.text-danger')) {
            errorText.classList.remove('text-danger');
        }
        for(let errorText of this.form.querySelectorAll('.border-danger')) {
            errorText.classList.remove('border-danger');
        }
    }
    createError(field, label, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        label.classList.add('text-danger');
        field.classList.add('border-danger');
        div.classList.add('text-danger','error-text');
        field.insertAdjacentElement('afterend', div);
    }
}