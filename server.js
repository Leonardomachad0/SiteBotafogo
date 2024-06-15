const express = require('express');
 const path = require('path');
 const app = express();
 const port = 3000;

 // Defina o diretório estático para servir arquivos HTML, CSS e JS
 app.use(express.static(path.join(__dirname, 'public')));

 app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
 });