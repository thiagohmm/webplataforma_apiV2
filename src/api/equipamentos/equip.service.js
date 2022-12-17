const e = require('cors');
const { db } = require('../../utils/db');


async function createEquip(equip) {
  return db.equipamentos.create({
    data: equip,
  });
}


async function listEquipId(id_equip) {
  return db.equipamentos.findUnique({
    where: {
      id_equip
    },
  });
}

async function listPlatEquipId(equip_plat_id) {
  return db.equipamentos.findMany({
    where: {
      equip_plat_id,
    },
  });
}


async function deleteEquip(id_equip) {
  return db.equipamentos.delete({
    where: {
      id_equip
    },
  });
}


async function updateEquip(equip) {
  return db.equipamentos.update({
    where: {
      id_equip: equip.id_equip
    },
    data:
      equip

  });
}

module.exports = {
  createEquip,
  listEquipId,
  deleteEquip,
  updateEquip,
  listPlatEquipId

}