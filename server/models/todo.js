var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var Todo = new Schema({
	title: String,
	text: String,
	completed: Boolean
});

var TodoModel = mongoose.model('Todo', Todo);

module.exports = TodoModel;
