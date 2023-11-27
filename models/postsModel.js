const client = require('../config/dbConnection');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

module.exports = class PostModel {

    static async getPosts() {
        console.log(`[getallposts]`);
        const cursor = await client.db("SocialMedia").collection("posts").find();

        const posts = await cursor.toArray();

        return posts;
    }
    static async getOnePostId(id) {
        console.log(`[getonePost] ${id}`);
        let objectId = new ObjectId(id)

        let query = { "_id": objectId };

        const post = await client.db("SocialMedia").collection("posts").findOne(query);

        return post;
    }
    static async addPost(data) {
        console.log(`[Movie Model] - Add Movie ${data}`);
        let date = new Date();
        const formatDate = moment(date).format('DD/MM/YYYY HH:mm');

        try {
            const newPost = {
                text: data.text, favoriteUsers: [], authorPost: data.authorPost,
                date: formatDate,
            }
            const addedPost = await client.db("SocialMedia").collection("posts").insertOne(newPost);
            console.log(`New Post inserted with the following id ${addedPost.insertedId}`);
            return addedPost;
        } catch (error) {
            console.log(`[postService] Error: ${error}`);
        }
    }
    static async updatePostByID(id, text) {
        console.log("[updatePostByID]")
        let objectId = new ObjectId(id);
        let date = new Date();
        const formatDate = moment(date).format('DD/MM/YYYY HH:mm');

        let query = {
            _id: objectId,
        }

        const cursor = await client.db("SocialMedia").collection("posts").updateOne(
            query,
            {
                $set: {
                    text: text,
                    date: formatDate,
                }
            }
        )

        return cursor;
    }
    static async deletePostByID(id) {
        console.log("[deleteMovieByID]")
        let objectId = new ObjectId(id);

        await client.db("SocialMedia").collection("posts").deleteOne(
            { "_id": objectId });
    }
}