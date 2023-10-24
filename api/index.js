import express from "express";

const app = express();

app.use(express.json())

const port = 3000;

app.get('/teste', (req, res) => res
    .status(200)
    .send({mensagem: "Hello World!"})
)

app.listen(port, () => console.log(`servidor rodando: http://localhost:${port}`));

export default app;