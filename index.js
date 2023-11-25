const app = require('./config/server');
const routes = require('./routes/routes');

console.log('[Index] criando rota /api/filmes');
routes.getPosts(app);
routes.getOnePost(app);
routes.addPost(app);
routes.updatePost(app);
routes.deletePost(app);