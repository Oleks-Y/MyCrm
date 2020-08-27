const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utiis/errorHandler')

module.exports.login = async (req, res )=>{
	// email password
	// if user with this email exists
	const candidate = await User.findOne({email: req.body.email})
	if(candidate){
		// User exists, check password
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
		if(passwordResult){
			//Password are same, Generate token
			const token = jwt.sign({
				email : candidate.email,
				userId : candidate._id
			},
				keys.jwt,
				{
					expiresIn : 60 * 60
				})
			res.status(200).json({
				token : `Bearer ${token}`
			})
		} else {
			// Password not same, Error
			res.status(401).json({
				message : "Password is incorrect"
			})
		}
	}else{
		// User not exist, error
		res.status(404).json({
			message : 'User with this email not found'
		})
	}
}
// Registration endpoint
module.exports.register = async ( req, res) => {
	// email password
	const candidate = await User.findOne({email : req.body.email})
	
	if(candidate){
		// user already exists, error
		res.status(409).json({
			message : "Thid email already used"
		})
	}else{
		const salt = bcrypt.genSaltSync(10)
		const password =req.body.password
		// create user
		const user = new User({
			email : req.body.email,
			password : bcrypt.hashSync(password, salt)
		})
		try{
			await user.save()
			res.status(201).json(user)
		}catch(e){
			errorHandler(res, e)
		}
		
	}
}
