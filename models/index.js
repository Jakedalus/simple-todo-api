var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/colt-todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');