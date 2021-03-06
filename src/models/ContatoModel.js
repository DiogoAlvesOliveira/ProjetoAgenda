const mongoose = require('mongoose');
const validator = require('validator');
const ContatoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    phone: {type: String, required: false, default: ''},
    createdIn: {type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Contato',ContatoSchema);

class Contato{
    constructor(body){
        this.body = body;
        this.errors= [];
        this.contato = null;
    }
    async register(){
        this.validation();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }
    validation(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if(!this.body.name) this.errors.push('Nome é um campo obrigatório');
        if(!this.body.email && !this.body.phone){
            this.errors.push('Necessário ao menos um contato');
        }

    }
    cleanUp(){
        for(const key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body= {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone,
        }
    }
    async edit(id){
        if(typeof id !== 'string') return; 
        this.validation();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true});
    }
    static async findId(id){
        if(typeof id !== 'string') return; 
        const contato = await ContatoModel.findById(id);
        return contato;
    }
    static async findContact(){
        const contatos = await ContatoModel.find().sort({ createdIn: -1 });
        return contatos;
    }
    static async delete(id){
        if(typeof id !== 'string') return; 
        const contato = await ContatoModel.findOneAndDelete({_id: id}) ;
        return contato;
    }
}

module.exports = Contato;