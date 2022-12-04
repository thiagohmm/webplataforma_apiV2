const { db } = require('../../utils/db');

function listAllProjetosConvidados() {
  db.projetos.findMany({
    where: {
      private_projeto: 2,
    },
    select: {
      id_projetos: true,
      nome_projeto: true,

    }
  });
}

function listAllProjetosComum() {
  db.projetos.findMany({
    where: {
      private_projeto: {
        gte: 1
      }
    },
    select: {
      id_projetos: true,
      nome_projeto: true,

    }
  });
}

function listAllProjetosAdmin() {
  db.projetos.findMany({
    select: {
      id_projetos: true,
      nome_projeto: true,
    }
  });
}

function listProjetosId(id_projetos) {
  db.projetos.findUnique({
    where: {
      id_projetos,
    },

  });
}

function createProjetos(projetos) {
  return db.projetos.create({
    data: projetos,
  });
}

function deleteProjetos(id_projetos) {
  return db.refreshToken.update({
    where: {
      id_projetos
    },
    data: {
      revoked: true
    }
  });
}

function updateProjetos(id_projeto, nome, private_projeto) {
  return db.projetos.update({
    where: {
      id_projeto
    },
    data: {
      nome_projeto: nome,
      private_projeto
    }

  });
}

module.exports = {
  listAllProjetosAdmin,
  listAllProjetosConvidados,
  listAllProjetosComum,
  listProjetosId,
  createProjetos,
  deleteProjetos,
  updateProjetos
};
