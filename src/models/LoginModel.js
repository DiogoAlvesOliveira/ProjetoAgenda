const mongoose = require('mongoose');
const validator = require('validator');
const LoginSchema = new mongoose.Schema({
    email:   {type: String, required: true},
    password:{type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors= [1, 2];
        this.user = null;
    }
    async register(){
        this.validation();
        console.log(this.errors.length);
        if(this.errors.length > 0) return;
        try{
            console.log('estou no try de model')
            this.user = await LoginModel.create(this.body);
        } catch(e){
            console.log('Models ',e);
        }
    }
    validation(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');

        if(this.body.password.length < 5 || this.body.password.length >12) this.errors.push('Tamanho inválido');
    }
    cleanUp(){
        for(const key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body= {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;