const { db } = require('../../utils/db');

async function listAllPlataformaConvidados() {
  return db.plataforma.findMany({
    where: {
      private_plataforma: 2,
    },

  });
}

async function listAllPlataformaComum() {
  return db.plataforma.findMany({
    where: {
      private_plataforma: {
        gte: 1,
      },
    },
  });
}

async function listAllPlataformaAdmin() {
  return db.plataforma.findMany({

  });
}

async function listPlataformaIdConvidado(id) {
  return db.plataforma.findMany({
    where: {
      id,
      private_plataforma: 2,

    },
  });
}

async function listPlataformaIdComum(id) {
  return db.plataforma.findMany({
    where: {
      id,
      NOT: {
        private_plataforma: 1,

      },
    },
  });
}

async function listPlataformaIdAdmin(id) {
  return db.plataforma.findUnique({
    where: {
      id,
    },
  });
}

async function createPlataforma(plataforma) {
  return db.plataforma.create({
    data: plataforma,
  });
}

async function buscaPlataformaAdmin(search) {
  const busca = await db.$queryRawUnsafe(`SELECT id, nome_plataforma from plataforma where (inf_plataforma like '%${search}%' or nome_plataforma like '%${search}%') and active_plataforma=1;`);

  return busca;
}
async function buscaPlataformaComum(search) {
  const busca = await db.$queryRawUnsafe(`SELECT id, nome_plataforma from plataforma 
  where (inf_plataforma like '%${search}%' or nome_plataforma like '%${search}%') and active_plataforma=1 AND NOT  private_plataforma = 1;`);

  return busca;
}

async function buscaPlataformaConvidado(search) {
  const busca = await db.$queryRawUnsafe(`SELECT id, nome_plataforma from plataforma 
  where (inf_plataforma like '%${search}%' or nome_plataforma like '%${search}%') and active_plataforma=1 AND  private_plataforma = 2;`);

  return busca;
}

async function listProjtPlataformaId(host_projt_id) {
  return db.plataforma.findMany({
    where: {
      host_projt_id,
      active_plataforma: 1,
    },
  });
}

async function listProjtAllPlataformaId(host_projt_id) {
  return db.plataforma.findMany({
    where: {
      host_projt_id,
    },
  });
}

async function deletePlataforma(id) {
  return db.plataforma.delete({
    where: {
      id,
    },
  });
}

async function updatePlataforma(plataforma) {
  console.log('Dados recebidos na api', plataforma);
  return db.plataforma.update({
    where: {
      id: plataforma.id,
    },
    data:
      plataforma,

  });
}

module.exports = {
  listPlataformaIdConvidado,
  listPlataformaIdComum,
  listPlataformaIdAdmin,
  createPlataforma,
  buscaPlataformaAdmin,
  buscaPlataformaComum,
  buscaPlataformaConvidado,
  listProjtPlataformaId,
  listProjtAllPlataformaId,
  deletePlataforma,
  updatePlataforma,
  listAllPlataformaAdmin,
  listAllPlataformaComum,
  listAllPlataformaConvidados,

};
