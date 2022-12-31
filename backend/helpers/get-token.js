const getToken = (req) => {

	//RETIRAR A PALAVRA BEARER
	const authHeader = req.headers.authorization // bearer askdjlasdfoi....
	//TOKEN É UM STRING
	const token = authHeader.split(' ')[1]

	return token
}
module.exports = getToken