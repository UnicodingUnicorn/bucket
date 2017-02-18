var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = mongoose.model("User", new Schema({
	username : String,
	password : String,
	unit : String
}));

var GS = mongoose.model("Good", new Schema({
	name : String,
	type : String, //Good/Service
	requirement : String, //Need/Offer
	description : String,
	transactions : Number,
	owner : { type: Schema.Types.ObjectId, ref: 'User'},
	holder : { type: Schema.Types.ObjectId, ref: 'User'}
}));

module.exports = {
	User : User,
	GS : GS
};
