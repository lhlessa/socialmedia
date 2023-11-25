const client = require('../config/dbConnection');
const ObjectId = require('mongodb').ObjectId;

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
        try {
            const newPost = {
                text: data.text, favoriteUsers: data.favoriteUsers, authorPost: data.authorPost,
                date: new Date()
            }
            const addedPost = await client.db("SocialMedia").collection("posts").insertOne(newPost);
            console.log(`New Post inserted with the following id ${addedPost.insertedId}`);
            return addedPost;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }
    static async updatePostByID(id, body) {
        console.log("[updateMovieByID]")
        let objectId = new ObjectId(id)

        let query = {
            _id: objectId,
        }

        const cursor = await client.db("SocialMedia").collection("posts").updateOne(
            query,
            {
                $set: body
            }
        )

        return cursor;
    }
    static async deletePostByID(id) {
        console.log("[deleteMovieByID]")
        let objectId = new ObjectId(id)

        let query = {
            _id: objectId,
            deleted_at: null
        }

        const cursor = await client.db("SocialMedia").collection("posts").updateOne(
            query,
            {
                $set: {
                    deleted_at: new Date()
                }
            }
        )

        return cursor;
    }
}