var mongoose = require('mongoose');


//define a schema for reviews
var reviewSchema = new mongoose.Schema({
	author: String,
	reviewText: String,
	createdOn: {type: Date, default: Date.now}
});

//define a schema for opening times
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

//start main location schema definition
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: [String],
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	openingTimes: [openingTimeSchema]
});

mongoose.model('Location', locationSchema);