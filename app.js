const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Configurar o EJS como a engine de visualização
app.set('view engine', 'ejs');

// Definir o diretório de visualizações (onde seus arquivos .ejs serão armazenados)
app.set('views', __dirname + '/views');

// Rota simples
app.get('/', (req, res) => {
  // Renderizar uma visualização EJS chamada "index.ejs" na pasta "views"
  res.render('index', { message: 'Olá, mundo!' });
});

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});