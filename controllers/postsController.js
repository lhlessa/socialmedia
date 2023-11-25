const Joi = require('joi');
const PostModel = require("../models/postsModel");

const schema = Joi.object().keys({
    text: Joi.string().required().min(1).max(200),
})
module.exports = class PostsController {
    static async getPosts(req, res, next) {
        console.log('[Posts Controller] getPosts');
        try {
            const posts = await PostModel.getPosts();
            if (!posts) {
                res.status(404).json(`Não existem posts na sua página.`);
            }
            posts.forEach(posts => {
                console.log(`[Posts controller: retorno do banco] ${posts.text}`);
            });
            res.status(200).json(posts);
        } catch (error) {
            console.log(`[Posts Controller Error] ${error}`);
            res.status(500).json({ error: error })
        }
    }
    static async getPostById(req, res, next) {
        const id = req.params.id;
        console.log(id);
        try {
            const post = await PostModel.getOnePostId(id);
            if (!post) {
                res.status(404).json(`Não existe post cadastrado.`);
            }
            res.status(200).json(post);
        } catch (error) {
            console.log(`[Post Controller Error] ${error}`);
            res.status(500).json({ error: error })
        }
    }
    static async addPost(req, res, next) {
        console.log('[Add Post Controller]', req.body);
        const{error, value} = schema.validate(req.body);
        if(error){
            const result = { 
                msg: "Post não incluído. Campos não foram preenchidos corretamente", 
                error: error.details}
                res.status(404).json(result);
                return;
        }
        try {
            const addedPost = await PostModel.addPost(req.body);
            res.status(200).json(addedPost);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async updatePost(req, res, next) {
        const id = req.params.id;
        const{error, value} = schema.validate(req.body);
        if(error){
            const result = { 
                msg: "Post não atualizado. Campos não foram preenchidos corretamente", 
                error: error.details}
                res.status(404).json(result);
                return;
        }
        try {
            const updatedPost = await PostModel.updatePostByID(id, req.body);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async deleteMovie(req, res) {
        console.log('[Posts Controller] deletePost')

        const postId = req.params.id

        try {
            const post = await PostModel.deletePostByID(postId)

            if (!post.matchedCount) {
                res.status(404).json(`Nenhum post encontrado com o ID ${postId}`)
            } else if (!post.modifiedCount) {
                res.status(404).json(`Post encontrado com o ID ${postId} não foi deletado`)
            }

            console.log(post)

            res.status(200).json(post)
        } catch (error) {
            console.log(`[Posts Controller Error] ${error}`)
            res.status(500).json({ error: error })
        }
    }

}
