let express = require('express');
let router = express.Router();
let Student = require('../models/student');
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const STUDENT_NOT_FOUND_MESSAGE = "No such student found";
const STUDENT_UPDATED_MESSAGE = "Student updated.";
const STUDENT_DELETED_MESSAGE = "Student deleted.";
const MISSING_FIELDS_MESSAGE = "Name and student number must both be provided."
const DUPLICATE_STUDENT_NUMBER_MESSAGE = "Student number already exists.";

const UNIQUE_ERROR = "unique";

// API ENDPOINTS
router.get('/students', (req, res)=>{
	Student.find({}, (err, students)=>{
		res.json(students);
	});
});

router.get('/student/:id', (req, res)=>{
	let response = {};
	Student.findOne({student_number : req.params.id}, (err, student)=>{
		if(!student){
			response.message = STUDENT_NOT_FOUND_MESSAGE;
			res.json(response);
		}else{
			res.json(student);
		}
	});
});

router.post('/student', urlencodedParser, (req, res)=>{
	let response = {};
	if(!req.body.name || !req.body.student_number){
		response.message = MISSING_FIELDS_MESSAGE;
		res.json(response);
	}else{
		let newStudent = new Student({
			name : req.body.name,
			student_number : req.body.student_number
		});
		newStudent.save((err)=>{
			if (err && err.errors.student_number.kind == UNIQUE_ERROR) {
				response.message = DUPLICATE_STUDENT_NUMBER_MESSAGE;
				res.json(response);
			}else{
				res.json(newStudent);
			}
		});
	}
});

router.put('/student/:student_number', urlencodedParser, (req, res)=>{
	let response = {};
	Student.findOneAndUpdate({student_number : req.params.student_number}, 
		{$set:{name: req.body.name}}, {new: true}, (err, student)=>{
			if(!student){
				response.message = STUDENT_NOT_FOUND_MESSAGE;
				res.json(response);
			}else{
				response.message = STUDENT_UPDATED_MESSAGE;
				response.student = student;
				res.json(response);
			}
	});
});

router.delete('/student/:id', (req, res)=>{
	let response = {};
	Student.findOneAndDelete({student_number : req.params.id}, (err, student)=>{
		if(!student){
			response.message = STUDENT_NOT_FOUND_MESSAGE;
			res.json(response);
		}else{
			response.message = STUDENT_DELETED_MESSAGE;
			response.student = student;
			res.json(response);
		}
	});
});

module.exports = router;

/*

GET Get all students.
curl -X GET http://localhost:3000/api/students

POST Post a student.
curl --data "name=Seng&student_number=15325449" http://localhost:3000/api/student

PUT Update student.
curl -X PUT -d "name=John" http://localhost:3000/api/student/15325444            

DELETE Delete a student.
curl -X DELETE http://localhost:3000/api/student/15325099                           



*/