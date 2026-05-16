import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 25568;

// Serve os arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Mudança aqui: de '*' para '*any' para aceitar a nova sintaxe de rotas do Express
app.get('*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend servido com sucesso na porta ${port}`);
});