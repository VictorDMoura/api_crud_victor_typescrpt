import express from "express";
import  produtoRouter  from "./routes/produtoRoutes";
import  fornecedorRouter  from "./routes/fornecedorRoutes";


const app = express();
const port = 3000;


app.use(express.json());
app.use(produtoRouter);
app.use(fornecedorRouter);


app.get('/', (req, res) => {
    res.json({ apiName: 'Catálogo de Produtos!', greetingMessage: 'Bem-Vindo!' });
});

app.listen(port, () => {
    console.log(`Servidor rodadando na porta: ${port}`);
});