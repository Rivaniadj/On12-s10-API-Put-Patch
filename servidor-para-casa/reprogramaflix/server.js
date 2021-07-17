
const app = require("./src/app");
const port = 8080;
// definir uma porta para o nosso servidor

app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});
