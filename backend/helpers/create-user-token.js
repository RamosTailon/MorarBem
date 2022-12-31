require('dotenv').config()

const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    //CRIAR TOKEN
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "porEnquanto")
    //process.env.SEGREDO_CHAVE

    //RETORNAR TOKEN
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken