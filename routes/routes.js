const Posts = require("../controllers/postsController");
const Users = require("../controllers/usersController");
const AuthenticationMiddleware = require("../middlewares/authentication");

module.exports = {
  getPosts: (app) => {
    app.get('/api/posts', Posts.getPosts);
  },
  getOnePost: (app) => {
    app.get('/api/posts/:id', AuthenticationMiddleware.checkAuthentication, Posts.getPostById);
  },
  addPost: (app) => {
    app.post('/api/posts', AuthenticationMiddleware.checkAuthentication, Posts.addPost);
  },
  updatePost: (app) => {
    app.patch('/api/posts/:id', AuthenticationMiddleware.checkAuthentication, Posts.updatePost);
  },
  deletePost: (app) => {
    app.delete('/api/posts/:id', AuthenticationMiddleware.checkAuthentication, Posts.deleteMovie);
  },
  addUser: (app) => {
    app.post('/api/addUsers', AuthenticationMiddleware.checkAuthentication, Users.addUser);
  },
  likePost: (app) => {
    app.patch('/api/likePost/:id', AuthenticationMiddleware.checkAuthentication, Posts.likePost);
  },
  login: (app) => {
    app.post('/api/login', Users.login);
  }
}