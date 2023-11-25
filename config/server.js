const  express = require('express');
let app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, function(){
    console.log('Servidor rodando com Express', port);
});

module.exports = app;