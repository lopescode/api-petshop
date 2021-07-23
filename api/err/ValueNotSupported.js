class ValueNotSupported extends Error {
    constructor(contentType) {
        super(`O tipo de conteúdo ${contentType} não é suportado.`)
        this.name = 'ValueNotSupported'
        this.idErr = 3
    }
}

module.exports = ValueNotSupported