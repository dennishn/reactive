var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var Todo = new Schema({
	text: String,
	completed: Boolean
});

var TodoModel = mongoose.model('Todo', Todo);

module.exports = TodoModel;
