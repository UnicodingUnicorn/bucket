module.exports = function(mongoose, models){
	var User = models.User;
	
	var jwt = require("jsonwebtoken");
	var secret = "tableflip";
	
	var express = require("express");
	var api = express.Router();
	
	var bodyParser = require("body-parser");
	api.use(bodyParser.json());
	api.use(bodyParser.urlencoded({extended : true}));
	
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
	
	return api;
};
