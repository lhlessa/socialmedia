const UsersModel = require("../models/usersModel");

module.exports = class AuthenticationMiddleware{
    static async checkAuthentication(req, res, next) {
        const {token} = req.headers;
        const isAuthenticated = await UsersModel.getAuthentication(token);
        if (isAuthenticated) {
            next();
        } else {
            res.status(401).json({ mensagem: 'Não autenticado' });
        }
    }
}