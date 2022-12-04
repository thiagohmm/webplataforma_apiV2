const { db } = require('../../utils/db');

async function listAllProjetosConvidados() {
  return db.projetos.findMany({
    where: {
      private_projeto: 2,
    },
    select: {
      id_projeto: true,
      nome_projeto: true,

    }
  });
}

async function listAllProjetosComum() {
  return db.projetos.findMany({
    where: {
      private_projeto: {
        gte: 1
      }
    },
    select: {
      id_projeto: true,
      nome_projeto: true,

    }
  });
}

async function listAllProjetosAdmin() {
  return db.projetos.findMany({
    select: {
      id_projeto: true,
      nome_projeto: true,
    }
  });
}

async function listProjetosId(id_projeto) {
  return db.projetos.findUnique({
    where: {
      id_projeto
    },

  });
}

async function createProjetos(projetos) {
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
