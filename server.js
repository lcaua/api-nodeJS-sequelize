const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3333;

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// requests de JSON
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));



// dropa a tabela se ela já existir
const db = require("./app/models");
db.sequelize.sync();



require("./app/routes/routes")(app);
// rota teste
app.get("/", (req, res) => {
  res.json({ message: "teste" });
});


app.listen(PORT, () => {
  console.log(`Servidor Rodando na porta: ${PORT}.`);
});
