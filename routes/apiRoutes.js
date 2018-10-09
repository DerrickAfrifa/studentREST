var express = require('express');
var router = express.Router();
let Student = require('../models/student');

const bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({ extended: false });

let testData = {name : 'Derrick',
	 			student_number : 15325022
				};

router.get('/students', (req, res)=>{
	Student.find({}, (err, students)=>{
		console.log(students);
		res.json(students);
	});
});

router.get('/student/:id', (req, res)=>{
	testData.student_number = req.params.id;
	res.json(testData );
	Student.findOne({student_number : req.params.id}, (err, student)=>{
		if (err) {throw err;}
		res.json(student);
	});
});

router.post('/student', urlencodedParser, (req, res)=>{
	let newStudent = new Student({
		name : req.body.name,
		student_number : req.body.student_number
	});
	newStudent.save((err)=>{
		if (err) {throw err;}
		res.json(newStudent);
	});
});

router.put('/student/:id', (req, res)=>{
	Student.findOne({student_number : req.params.id}, (err, student)=>{
		let newStudent = new Student({
			name : req.body.name,
			student_number : req.body.student_number
		});
		newStudent.save((err)=>{
			if (err) {throw err;}
			res.json(newStudent);
		});
	});
});


router.delete('/student/:id', (req, res)=>{
	res.json(testData);
});
// router.post('/add', urlencodedParser, (req, res)=>{
// 	User.findOne({twitter_id : req.user.twitter_id}, (err, user)=>{
// 		let question = new Question({
// 			owner : user._id,
// 			answered : false,
// 			text : req.body.question,
// 			answers : []
// 		});
// 		question.save((err)=>{
// 			if (err) {throw err;}
// 			res.redirect('/account');
// 		});
// 	});
// });

// router.get('/answers/:qid', (req, res)=>{
// 	let loggedin = req.user;
// 	let qid = req.params.qid;
// 	Question.findOne({_id: qid}, (err, question)=>{
// 		if (err) {throw err;}
// 		Answer.find({question: qid}, (err, answers)=>{
// 			if (err) {throw err;}
// 			res.render('answers', {question: question, answers: answers, loggedin: loggedin});
// 		});
// 	});
// });

// router.post('/answers/correct', (req, res)=>{
// 	Answer.findByIdAndUpdate(req.body.correct_answer, {$set : {correct : true}}, { new : true }, (err, answer)=>{
// 		if (err) {throw err;}
// 		Question.update({_id : answer.question}, { $set: {answered : true}}, (err, question)=>{
// 			res.redirect('/account');
// 		});
// 	});
// });

module.exports = router;