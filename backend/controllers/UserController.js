//IMPORTS
const User = require('../models/User')

//VARIÁVEIS DE AMBIENTE
require('dotenv').config()

const bcrypt = require('bcrypt') // criptografa a senha e gera um token 
const jwt = require('jsonwebtoken')

//HELPERS
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController {

	//REGISTRAR USUÁRIO
	static async register(req, res) {

		const { name, email, password, confirmPassword, phone } = req.body

		//validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório" })
			return
		}
		if (!email) {
			res.status(422).json({ message: "O email é obrigatório" })
			return
		}
		if (!password) {
			res.status(422).json({ message: "A senha é obrigatória" })
			return
		}
		if (!confirmPassword) {
			res.status(422).json({ message: "A confirmação de senha é obrigatório" })
			return
		}
		if (!phone) {
			res.status(422).json({ message: "O telefone é obrigatório" })
			return
		}
		if (password !== confirmPassword) {
			res.status(422).json({ message: "A senha e a confirmação de senha precisam ser iguais!" })
			return
		}

		//VERIFICANDO SE O USUÁRIO JÁ EXISTE
		const userExist = await User.findOne({ email: email })

		if (userExist) {
			res.status(422).json({ message: "Por favor, utilize outro e-mail!" })
			return
		}

		//CRIPTOGRAFAR A SENHA
		const salt = await bcrypt.genSalt(12) //12 CARACTERES A MAIS
		const passwordHash = await bcrypt.hash(password, salt) //SUPER SENHA

		//CRIAR O USUÁRIO   
		const user = new User({
			name,
			email,
			phone,
			password: passwordHash
		})

		try {
			const newUser = await user.save()

			await createUserToken(newUser, req, res)

		} catch (error) {
			res.status(500).json({ message: error })
		}
	}

	static async login(req, res) {
		const { email, password } = req.body
		if (!email) {
			res.status(422).json({ message: "O email é obrigatório" })
			return
		}
		if (!password) {
			res.status(422).json({ message: "A senha é obrigatória" })
			return
		}

		//VERIFICANDO SE O USUÁRIO JÁ EXISTE
		const user = await User.findOne({ email: email })

		if (!user) {
			res.status(422).json({
				message: "Não há usuário cadastrado com esse e-mail!"
			})
			return
		}

		// VERIFICAR SE A SENHA CORRESPONDE A SENHA DO BANCO DE DADOS
		const checkPassword = await bcrypt.compare(password, user.password)

		if (!checkPassword) {
			res.status(422).json({
				message: "Senha incorreta!!!"
			})
			return
		}

		await createUserToken(user, req, res)
	}

	static async checkUser(req, res) {
		let currentUser;

		// console.log(req.headers.authorization)

		if (req.headers.authorization) {

			const token = getToken(req)
			const decoded = jwt.verify(token, "porEnquanto")
			//process.env.SEGREDO_CHAVE

			currentUser = await User.findById(decoded.id)

			currentUser.password = undefined
		} else {
			currentUser = null
		}

		res.status(200).send(currentUser)
	}
}