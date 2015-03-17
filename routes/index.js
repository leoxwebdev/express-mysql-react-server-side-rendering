var express = require('express');
var router = express.Router();


//server-side rendering
var React = require('react');
require('node-jsx').install({harmony:true});
var App = require('../template/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	var selectSQL = "select * from usrtbl where user_id='izumikawa_t'";
	//data get
	var selectQuery = require('../base/mysql/SelectQuery');
	selectQuery(selectSQL, '', function(err, rows){
		if (err){
			throw err;
			return;
		}
		var user = rows[0];
		var json= JSON.stringify(user);
		
		res.render('index', 
		 	{ 
		 		title: 'Express', 
				userForm: React.renderToString(React.createElement(App, {user:user})),
		  	 	initialData: json
		    }
		);
	});

	
});

module.exports = router;
