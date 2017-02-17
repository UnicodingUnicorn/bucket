module.exports = function(mongoose, models){
	var User = models.User;
	
	var jwt = require("jsonwebtoken");
	var secret = "tableflip";
	
	var express = require("express");
	var api = express.Router();
	
	var bodyParser = require("body-parser");
	api.use(bodyParser.json());
	api.use(bodyParser.urlencoded({extended : true}));
	
	api.use(function(req, res, next){
		req.decoded = undefined;
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token){
			jwt.verify(token, secret, function(err, decoded){
				if(!err){
					req.decoded = decoded;
				}
			});
		}
		next();
	});
	
	api.get("/", function(req, res){
		res.status(200).json({message : "Received"});
	});
	
	api.post("/createuser", function(req, res){
		User.findOne({unit : req.body.unit}, function(err, user){
			if(err){
				res.status(500).json({
					success : false,
					message : "Internal database error"
				});
				return;
			}else if(user){
				res.status(400).json({
					success : false,
					message : "Unit already has account registered"
				});
				return;
			}
			newuser = new User({
				username : req.body.username,
				password : req.body.password,
				unit : req.body.unit
			});
			newuser.save(function(err){
				if(err){
					res.status(500).json({
						success : false,
						message : "Internal database error"
					});
					return;
				};
				var token = jwt.sign(newuser, secret, {
					expiresIn : 60 * 60 * 24
				});
				res.status(200).json({
					success : true,
					message : "Success",
					token : token
				});
			});
		});
	});
	
	api.post("/login", function(req, res){
		User.findOne({username : req.body.username}, function(err, user){
			if(err){
				res.status(500).json({
					success : false,
					message : "Internal database error"
				});
				return;
			}else if(!user){
				res.status(400).json({
					success : false,
					message : "User not found"
				});
				return;
			}
			if(req.body.password == user.password){
				var token = jwt.sign(newuser, secret, {
					expiresIn : 60 * 60 * 24
				});
				res.status(200).json({
					success : true,
					message : "Logged in!",
					token : token
				});
			}else{
				res.status(400).json({
					success : false,
					message : "Password does not match!"
				});
				return;
			}
		});
	});
	
	return api;
};
