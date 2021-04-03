const userService = require('../services/userService');
const jwt = require('../helpers/jwt');

function subscribe(req,res){
	userService.subscribeById(req.params.userid,req.params.token).then(function(updated){
		res.sendStatus(200);
	}).catch(function(err){
		res.sendStatus(404);
	});
}

function login(req,res){
	userService.login(req.body).then(function(result){
		var token = jwt.createToken(req.body.email,result._id);
		userService.saveToken(req.body,token).then(function(tokenizedUser){
			res.status(200).json({
        	'user': tokenizedUser,'error':null
    		});
		}).catch(function(err){
			console.log(err);
		});
		
	}).catch(function(err){
		res.status(404).json({
        'error': "email or password is wrong"
    	});
	});
}
function register(req,res){
	userService.create(req.body).then(function(result){
		res.status(200).json({
        'message': result,'error':null
    	});
	}).catch(function(err){
		res.status(409).json({
        'error': 'mail already taken'
    	});
	});
}
function logout(req,res){
	jwt.decodeToken(req.headers.authorization).then(function(decoded){
		userService.logout(decoded.id).then(function(result){
			res.status(200).json({
			'message': 'logged out'
			});
		}).catch(function(err){
			console.log(err);
		});
	}).catch(function(err){
		console.log(err);
	});

	
}

module.exports={
	login,
	logout,
	register,
	subscribe
}