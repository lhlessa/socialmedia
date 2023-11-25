const Posts = require("../controllers/postsController");

module.exports = {
  getPosts: (app) => {
    app.get('/api/posts', Posts.getPosts);
  },
  getOnePost: (app) => {
    app.get('/api/posts/:id', Posts.getPostById);
  },
  addPost: (app) => {
    app.post('/api/posts', Posts.addPost);
  },
  updatePost: (app) => {
    app.patch('/api/posts/:id', Posts.updatePost);
  },
  deletePost: (app) => {
    app.delete('/api/posts/:id', Posts.deleteMovie)
},
}