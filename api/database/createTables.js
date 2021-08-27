const ModelTable = require("../routes/fornecedores/ModeloTabela");

ModelTable.sync().then(() => console.log("Tabela criada com sucesso"));
