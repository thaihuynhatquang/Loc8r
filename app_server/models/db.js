//Define database connection string -> open Mongoose connection
var mongoose = require( 'mongoose/' );
var gracefulShutdown;
var dbURI = 'mongodb://localhost/Loc8r';

if (process.env.NODE_ENV === 'production') {
	dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI, {useMongoClient: true });

//Listen for Mongoose connection events and output statuses to console
mongoose.connection.on('connected', function (){
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err){
	console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function (){
	console.log('Mongoose disconnected');
});

//Pack Readline of NPM
var readline = require ('readline');
if(process.platform === "win32"){
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("SIGINT", function (){
		process.emit("SIGINT");
	});
}

//Reusable function to close Mongoose connection
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

//Listen to Node processes
// For nodemon restarts
process.once('SIGUSR2', function() {
	console.log('123');
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});
// For Heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});
});

require('./locations');