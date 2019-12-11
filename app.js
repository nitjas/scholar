var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); // tell express we are using body-parser
app.use(express.static(__dirname + "/public"));

var question;
var options;

// root route
app.get("/", function(req, res) {
	var con = mysql.createConnection({
	        host    :       'localhost',
	        user    :       'nitjas',
	        password:       'nitin',
	        database:       'scholar'
	});
	
	// Get the question & level
	var q = 'select text, level from questions where id = ?';
	question = {
		id: 1 // Math.floor(Math.random() * 10) + 1
	};
	con.query(q, question.id, function (error, results, fields) {
		if (error) throw error;
		question.text = results[0].text;
		question.level = results[0].level;
	});
	
	// Get the options & ids
	options = [];
	var a = 'select id, text from options where questionId = ?';
	con.query(a, question.id, function (error, results, fields) {
		if (error) throw error;
		con.end();
		for (var i = 0; i < results.length; ++i) {
			options.push([
				results[i].id,
				results[i].text
			]);
		}
		res.render("home", {question: question, options: options});
	});
});

app.listen(8080, function() {
	console.log("Server running on 8080");
});
