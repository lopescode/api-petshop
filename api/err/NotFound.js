class NotFound extends Error {
    constructor(){
        super("Fornecedor não foi encontrado!");
        this.name = 'NotFound'
        this.idErr = 0
    }
}

module.exports = NotFound;