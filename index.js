const express = require("express");
const sequelize = require("./src/database/connect");
const routesUser = require("./src/routes/userRoutes");
const routesProduct = require("./src/routes/productRoutes");

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados: ", error);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tabelas sincronizadas.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar tabelas:", error);
  });

const port = 8080;
const app = express();

app.use(express.json());
app.use("/api", routesUser);
app.use("/api", routesProduct);

app.listen(port, () => {
  console.log("Rodando com express na porta: ", port);
});
