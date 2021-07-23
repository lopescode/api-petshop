const TabelaFornecedor = require("./TabelaFornecedor");
const InvalidField = require("../../err/InvalidField");
const DataNotFound = require("../../err/DataNotFound");

class Fornecedor {
  constructor({
    id,
    empresa,
    email,
    categoria,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }
  async create() {
    this.validation();
    const result = await TabelaFornecedor.create({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });

    this.id = result.id;
    this.dataCriacao = result.dataCriacao;
    this.dataAtualizacao = result.dataAtualizacao;
    this.versao = result.versao;
  }

  async read() {
    const find = await TabelaFornecedor.readById(this.id);
    this.empresa = find.empresa;
    this.email = find.email;
    this.categoria = find.categoria;
    this.dataCriacao = find.dataCriacao;
    this.dataAtualizacao = find.dataAtualizacao;
    this.versao = find.versao;
  }

  async update() {
    await TabelaFornecedor.readById(this.id);
    const fields = ["empresa", "email", "categoria"];
    const dataUpdated = {};

    fields.forEach((field) => {
      const value = this[field];
      if (typeof value === "string" && value.length > 0) {
        dataUpdated[field] = value;
      }
    });

    if (Object.keys(dataUpdated).length === 0) {
      throw new DataNotFound()
    }

    await TabelaFornecedor.update(this.id, dataUpdated);
  }

  async delete() {
    return TabelaFornecedor.delete(this.id);
  }

  validation() {
    const fields = ["empresa", "email", "categoria"];

    fields.forEach((field) => {
      const value = this[field];
      if (typeof value !== "string" || value.length == 0) {
        throw new InvalidField(field);
      }
    });
  }
}

module.exports = Fornecedor;
