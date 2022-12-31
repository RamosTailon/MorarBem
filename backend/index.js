const express = require('express')
const cors = require('cors')

const app = express()

//config JSON response
app.use(express.json())

//Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })) //3000 PARA A PORTA DO REACT.JS

//public folder for images
app.use(express.static('public'))

//Routes

//LISTEN
app.listen(5000)

