const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/morarbem')
    console.log("Conectou ao banco de dados Mongodb!")
}

main().catch((err) => console.log('Houve um erro: ' + err))

module.exports = mongoose