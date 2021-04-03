const jwt = require('../helpers/jwt');

function isLoggedin(req,res,next){
	var token = req.headers['authorization'];
	jwt.verifyToken(token).then(function(result){
		next();
	}).catch(function(err){
		res.status(403).json({
        'error': 'access denied'
    	});
	});
}
function isAdmin(req,res,next){
	var token = req.headers['authorization'];
	jwt.verifyToken(token).then(function(result){
		if(result.authority)
		next();
		else{
			res.status(403).json({
				'error': 'access denied'
			});
		}
	}).catch(function(err){
		res.status(403).json({
        'error': 'access denied'
    	});
	});
}
module.exports={
	isLoggedin,
	isAdmin
}