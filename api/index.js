const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const router = require("./routes/fornecedores");
const NotFound = require("./err/NotFound");
const InvalidField = require("./err/InvalidField");
const DataNotFound = require("./err/DataNotFound");
const ValueNotSupported = require("./err/ValueNotSupported");
const AcceptFormats = require("./Serializer").AcceptFormats;
const ErrSerializer = require("./Serializer").ErrSerializer;

const app = express();

app.use(bodyParser.json());

//Middleware
app.use((req, res, next) => {
  let reqFormat = req.header("Accept");

  if (reqFormat === "*/*") {
    reqFormat = "application/json";
  }

  if (AcceptFormats.indexOf(reqFormat) === -1) {
    res.status(406);
    return res.end();
  }

  res.setHeader("Content-Type", reqFormat);
  next();
});

app.use("/api/fornecedores", router);

app.use((err, req, res, next) => {
  let status = 500;

  if (err instanceof NotFound) {
    status = 404;
  }
  if (err instanceof InvalidField || err instanceof DataNotFound) {
    status = 400;
  }
  if (err instanceof ValueNotSupported) {
    status = 406;
  }

  const serializer = new ErrSerializer(res.getHeader("Content-Type"));
  res.status(status);
  res.send(
    serializer.serialize({
      mensagem: err.message,
      id: err.idErr,
    })
  );
});

app.listen(config.get("api.port"), () =>
  console.log("A API está rodando na porta 3000")
);
