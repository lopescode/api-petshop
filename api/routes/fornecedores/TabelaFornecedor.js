const Model = require("./ModeloTabela");
const NotFound = require("../../err/NotFound");

module.exports = {
  create(fornecedor) {
    return Model.create(fornecedor);
  },

  read() {
    return Model.findAll({ raw: true });
  },

  async readById(id) {
    const find = await Model.findOne({
      where: {
        id: id,
      },
    });

    if (!find) {
      throw new NotFound();
    }

    return find;
  },

  update(id, dataUpdated) {
    return Model.update(dataUpdated, {
      where: { id: id },
    });
  },
  
  delete(id) {
    return Model.destroy({
      where: { id: id },
    });
  },
};
