import validator from 'validator';

export default class Contato{
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
        const nameInput = el.querySelector('input[name="name"]');
        const labelName = el.querySelector('.label-name');
        const emailInput = el.querySelector('input[name="email"]');
        const labelEmail = el.querySelector('.label-email');
        const phoneInput = el.querySelector('input[name="phone"]');
        const labelPhone = el.querySelector('.label-phone');
        let error = false;
        
        this.removeStatus();
        if(emailInput.value && !validator.isEmail(emailInput.value)){
            this.createError(emailInput, labelEmail, 'Email inválido');
            error = true;
        };
        if(!nameInput.value){
            this.createError(nameInput, labelName, 'Nome é um campo necessário');
            error = true;
        }
        if(!emailInput.value && !phoneInput.value){
            this.createError(emailInput, labelEmail, 'Se faz necessário ao menos um contato');
            this.createError(phoneInput, labelPhone, 'Se faz necessário ao menos um contato');
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