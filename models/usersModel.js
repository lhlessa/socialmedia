const client = require('../config/dbConnection');
const ObjectId = require('mongodb').ObjectId;

module.exports = class UsersModel{

    static async addUser(data) {
        console.log(`[Add UserModel] - Add UserModel ${data}`);
        try {
            const newUser = {
                name: data.name, favoritePosts: [], emailUser: data.emailUser,
                passwordUser: data.passwordUser, statusUserAdmin: false,
            }
            const addedUser = await client.db("SocialMedia").collection("users").insertOne(newUser);
            console.log(`New User inserted with the following id ${addedUser.insertedId}`);
            return addedUser;
        } catch (error) {
            console.log(`[userService] Error: ${error}`);
        }
    }
    static async loginUser(data) {
        console.log(`[Login UserModel] - Login UserModel ${JSON.stringify(data)}`);
        try {
            const { emailUser, passwordUser } = data;
            const loginUser = await client.db("SocialMedia").collection("users").findOne({'emailUser': emailUser, 'passwordUser': passwordUser});
            return loginUser;
        } catch (error) {
            console.log(`[userService] Error: ${error}`);
        }
    }

    static async getAuthentication(userId) {
        console.log(`[Get authentication UserModel] - Login UserModel ${JSON.stringify(userId)}`);
        try {
            let objectId = new ObjectId(userId);
            let query = { "_id": objectId };

            const user = await client.db("SocialMedia").collection("users").findOne(query);

            return user != undefined;
        } catch (error) {
            console.log(`[userService] Error: ${error}`);
        }
    }
}