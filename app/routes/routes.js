module.exports = app => {
    const usuarios = require("../controllers/controller");
  
    var router = require("express").Router();
  
    // Cria um novo nome
    router.post("/", usuarios.create);
  
    // Retorna todos os nomes
    router.get("/", usuarios.findAll);
  
    // Retorna todos os nomes publicados
    router.get("/publicado", usuarios.findAllPublicado);
  
    // Retorna o nome pelo id
    router.get("/:id", usuarios.findOne);
  
    // Atualiza o nome pelo id
    router.put("/:id", usuarios.update);
  
    // Deleta o nome pelo id
    router.delete("/:id", usuarios.delete);
  
    // Deleta todos os nomes
    router.delete("/", usuarios.deleteAll);
  
    app.use('/api/usuarios', router);
  };