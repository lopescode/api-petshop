const router = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const SerializerFornecedor = require("../../Serializer").SerializerFornecedor;

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const fornecedor = new Fornecedor(data);
    await fornecedor.create();

    res.status(201);

    const serializer = new SerializerFornecedor(res.getHeader("Content-Type"));
    res.send(serializer.serialize(fornecedor));
  } catch (err) {
    next(err);
  }
});

// READ
router.get("/", async (req, res) => {
  const result = await TabelaFornecedor.read();

  res.status(200);

  const serializer = new SerializerFornecedor(res.getHeader("Content-Type"), ['email', 'dataCriacao', 'dataAtualizacao', 'versao']);
  res.send(serializer.serialize(result));
});

router.get("/:idFornecedor", async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.read();

    res.status(200);

    const serializer = new SerializerFornecedor(res.getHeader("Content-Type"));
    res.send(serializer.serialize(fornecedor));
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:idFornecedor", async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const data = req.body;
    const dataResult = Object.assign({}, data, { id: id });
    const fornecedor = new Fornecedor(dataResult);
    await fornecedor.update();

    res.status(204);
    res.end();
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:idFornecedor", async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.read();
    await fornecedor.delete();

    res.status(204);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
