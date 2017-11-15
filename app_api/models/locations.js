var mongoose = require('mongoose');

//define a schema for opening times
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

//define a schema for reviews
var reviewSchema = new mongoose.Schema({
	author: {type: String, required: true},
	rating: { type: Number, required: true, min: 0, max: 5 },
	reviewText: {type: String, required: true},
	createdOn: {type: Date, "default": Date.now}
});

//start main location schema definition
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: "2dsphere", required: true},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);