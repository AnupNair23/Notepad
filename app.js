var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var JWT = require('jwt-simple');
var http = require('http');
var fs = require('fs');
var AWS = require('aws-sdk');
var crypto = require('crypto');




// app.use('/api', expressJwt({
//     secret: apiSecret
// }));




function parallel(middlewares) {
	return function (req, res, next) {
		async.each(middlewares, function (mw, cb) {
			mw(req, res, cb);
		}, next);
	};
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(function (err, req, res, next) {
	if (err.constructor.name === 'UnauthorizedError') {
		res.status(401).send('Unauthorized');
	}
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



//============================================== HTML PAGES =================================================


app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/Output', function (req, res) {
	res.sendFile(__dirname + '/views/output.html');
});


//================================================= MODEL =========================================

var Textbox = require('./models/TEXT/text');



//============================================== CONNECT TO MONGODB ===================================

app.use(bodyParser.json());

//mongodb://<dbuser>:<dbpassword>@ds213259.mlab.com:13259/whitepanda

var promise = mongoose.connect('mongodb://anupnair:lebronjames@ds213259.mlab.com:13259/whitepanda', {
	useMongoClient: true,
	/* other options */
});




//================================================ API END POINTS =============================================

app.post("/AddText", Textbox.addTextPost);
app.get("/GetText", Textbox.getTexts);
app.put("/UpdateBlogPost", Textbox.updateTxts);
app.get("/GetTextDetails/:id", Textbox.getText);





// ===================================== CONNECTING TO PORT =======================================


const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("Server connected to port" + " " + PORT);