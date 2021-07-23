const ModelTable = require("../routes/fornecedores/ModelTable");

ModelTable.sync().then(() => console.log("Tabela criada com sucesso"));
