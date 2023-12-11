const Joi = require('joi');
const UsersModel = require("../models/usersModel");

const schema = Joi.object().keys({
    name: Joi.string().required().min(1).max(20),
    emailUser: Joi.string().email().lowercase().required(),
    passwordUser: Joi.string().min(5).required().strict(),
})

module.exports = class UsersController{

    static async addUser(req, res, next) {
        console.log('[Add User Controller]', req.body);
        const{error, value} = schema.validate(req.body);
        if(error){
            console.log(error);
            const result = { 
                msg: "Usuário não incluído. Campos não foram preenchidos corretamente", 
                error: error.details}
                res.status(404).json(result);
                return;
        }
        try {
            const addedUser = await UsersModel.addUser(req.body);
            console.log(req.body);
            res.status(200).json(addedUser);
        } catch (error) {
            res.status(500).json({ error: error });
            console.log(error);
        }
    }
    static async login (req, res, next) {
        console.log('[Login Controller]', req.body);
        try {
            const loginUser = await UsersModel.loginUser(req.body);
            if (loginUser) {
                // Autenticação bem-sucedida
                res.json({ mensagem: 'Autenticação bem-sucedida', id: loginUser._id });
              } else {
                // Usuário não encontrado ou senha incorreta
                res.status(401).json({ mensagem: 'Falha na autenticação' });
              }
            console.log(loginUser);
        } catch (error) {
            res.status(500).json({ error: error });
            console.log(error);
        }
    }


}