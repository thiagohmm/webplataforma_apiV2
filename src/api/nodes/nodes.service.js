const { db } = require('../../utils/db');

async function createNodes(node) {
  return db.node.create({
    data: node,
  });
}

async function listNodesId(id) {
  return db.node.findUnique({
    where: {
      id_node: id,
    },
  });
}

async function listProjtAllNodesId(host_plat_id) {
  return db.node.findMany({
    where: {
      host_plat_id,
    },
  });
}

async function deleteNodes(id) {
  return db.node.delete({
    where: {
      id_node: id,
    },
  });
}

async function updateNodes(node) {
  return db.node.update({
    where: {
      id_node: node.id_node,
    },
    data:
      node,

  });
}

module.exports = {
  createNodes,
  listNodesId,
  deleteNodes,
  updateNodes,
  listProjtAllNodesId,

};
