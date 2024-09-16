const jwt = require("jsonwebtoken");
const secret = "PangkatSolusyon2025";


//[Token Access Creation]
module.exports.createAccessToken = (user)=>{
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
}


//[Token Verification]
module.exports.verify = (req,res,next)=>{

	console.log("This is from the req.headers.authorization")
	console.log(req.headers.authorization)
	let token = req.headers.authorization

	if(typeof token === "undefined"){
		return res.send({auth:"Failed. No Token"});
	}else{
		console.log("With Bearer prefix")
		console.log(token);
		token = token.slice(7,token.length);
		console.log("No Bearer prefix")
		console.log(token);


		jwt.verify(token, secret, function(err,decodedToken){

			if(err){
				return res.send({
					auth:"Failed",
					message: err.message
				})
			}else{
				console.log("Data that will be assigned to the req.user")
				console.log(decodedToken);
				req.user = decodedToken
				next()
			}
		})
	}
}

//Admin Verification
module.exports.verifyAdmin = (req,res,next)=>{

	if(req.user.isAdmin){
		next()
	}else{
		return res.send({
			auth:"Failed",
			message:"Action Forbidden"
		})
	}
}