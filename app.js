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
		id: 1 // Math.floor(Math.random() * 10) + 1 // 1 .. 10
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
		con.end();
		if (error) throw error;
		for (var i = 0; i < results.length; ++i) {
			options.push([
				results[i].id,
				results[i].text
			]);
		}
		res.render("home", {question: question, options: options});
	});
});

app.post('/check', function(req,res){
	var choice = req.body.options;
	
	var con = mysql.createConnection({
	        host    :       'localhost',
	        user    :       'nitjas',
	        password:       'nitin',
	        database:       'scholar'
	});
	
	var q = 'select isAnswer from options where id = ?';
	con.query(q, choice, function (error, result, fields) {
		con.end();
		if (error) throw error;
		if(result[0].isAnswer) {
			console.log('Right!');
		} else {
			console.log('Wrong!');
		}
		res.redirect("/");
	});
});

app.listen(8080, function() {
	console.log("Server running on 8080");
});
