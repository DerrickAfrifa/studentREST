const mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	student_number : {
		type: Number,
		required: true		
	}
}, {collection: 'students'});

let Student = module.exports = mongoose.model('Student', studentSchema);