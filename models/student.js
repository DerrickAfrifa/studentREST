const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let studentSchema = mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	student_number : {
		type: Number,
		required: true,		
		unique : true
	}
}, {collection: 'students'}).plugin(uniqueValidator);

let Student = module.exports = mongoose.model('Student', studentSchema);