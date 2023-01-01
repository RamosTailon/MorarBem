//TOKEN PARA CRIPTOGRAFAR A ROTA
// SÓ PODE ACESSAR A ROTA SE VERIFICAR O TOKEN
const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

require('dotenv').config()

const checkToken = (req, res, next) => {
    // console.log(req.headers.connection)

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Acesso Negado!" })
    }

    const token = getToken(req) // PEGA O TOKEN
    //SE NAO TIVER TOKEN NEM ENTRA
    if (!token) {
        return res.status(401).json({
            message: "Acesso negado!"
        })
    }


    try {

        const verified = jwt.verify(token, "porEnquanto")
        //process.env.SEGREDO_CHAVE
        req.user = verified

        next()

    } catch (err) {
        // console.log(err)
        return res.status(400).json({
            message: "Token inválido!"
        })
    }
}

module.exports = checkToken