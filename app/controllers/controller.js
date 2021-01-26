const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// cria e salva um novo nome
exports.create = (req, res) => {
  const { nome, nascimento, publicado } = req.body

   // validação de request
   if (!req.body.nome) {
    res.status(400).send({
      message: "não pode estar vazio :("
    });
    return;
  }
  

  // cria o nome
  const usuario = {
    nome,
    nascimento,
    publicado,
  };

  // salva o nome no banco
  Usuario.create(usuario) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ocorreu um erro ao criar um nome :(."
      });
    });
};

// retorna todos os nomes do banco
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
  
    Usuario.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao retornar os nomes :(."
        });
      });
};

// encontra um nome pelo id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Usuario.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao retornar o nome pelo id=" + id
        });
      });
};

// atualiza o nome 
exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nome atualizado com Sucesso :)."
          });
        } else {
          res.send({
            message: `Erro ao atualizar o nome pelo id=${id}. Talvez o nome não foi encontrado ou req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar o nome pelo id=" + id
        });
      });
};

// deleta o nome pelo id
exports.delete = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nome deletado com Sucesso :)!"
          });
        } else {
          res.send({
            message: `Erro ao deletar o nome pelo id=${id}. Talvez o nome não tenha sido encontrado :( !`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao deletar o nome pelo id=" + id
        });
      });
};

// deleta todos os nomes do banco
exports.deleteAll = (req, res) => {
    Usuario.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Nomes deletados com sucesso :)!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Ocorreu um erro ao deletar todos os nomes :(."
          });
        });
};

// encontra todos os nomes que foram publicados
exports.findAllPublicado = (req, res) => {
    Usuario.findAll({ where: { publicado: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao encortrar os nomes :(."
      });
    });
}