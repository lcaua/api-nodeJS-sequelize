module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      nome: {
        type: Sequelize.STRING
      },
      nascimento: {
        type: Sequelize.DATE
      },
      publicado: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Usuario;
  };