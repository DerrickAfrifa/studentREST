const express = require('express');
const mongoose = require('mongoose');
const URL = process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME; 
const routes = require('./routes')
const bodyParser = require("body-parser");

console.log('url: ', URL);
let db = mongoose.connect(URL, { useNewUrlParser: true });
app = express()
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
	let api_home = {message : 'Welcome to REST api'};
	res.json(api_home);
});
routes(app).listen(process.env.PORT, ()=>{
	console.log('listening on port: ', process.env.PORT);
});