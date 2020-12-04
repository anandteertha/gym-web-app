var PORT = process.env.PORT || 5000;
var mysql = require('mysql');//npm i --save mysql
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var sha256 = require('sha256');
var path = require('path');
var nodemailer = require('nodemailer');
var fs = require('fs');
var CryptoJS = require('crypto-js');
var io = require('socket.io')(http);


const stripePublicKey = 'pk_test_51HlziYD5Z2NiGnWqttUGOL6aKI2UsJGbtugSPS8FVTsi1xff8AlL6MyTE5i2N8wRYIuYpSuTzyuzxND2D8X64EEd00RUkYm19U';
const stripeSecretKey = 'sk_test_51HlziYD5Z2NiGnWqDAfTZYI4qKDiZ3YhqjrWIHllkH6eR3N3fWcYof05IkEjW3o97M5xcDVrY1n2gwH0kflsJDEc00R2wGwf3K';
var stripe = require('stripe')(stripeSecretKey);
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('/'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


var db_config = {
	host     : 'localhost',
	user     : 'root',
	password : 'yahape apna database ka password likh!',
	database : 'wdl'
};
var connection = mysql.createPool(db_config);
connection.getConnection(function(err){
	if(err){
		console.log('cannot establish a connection with mysql database..\n');
		connection = reconnect(connection);
	}
	else{
		console.log('\n**new connection established with the mysql database**\n');
	}
});

function reconnect(connection){
	console.log('\n**new connection tentative...**\n');
	connection = mysql.createPool(db_config);

	connection.getConnection(function(err){
		if(err){
			setTimeout(reconnect(connection),2000);
		}
		else{
			console.log('\n**new connection established with the database**\n');
			return connection;
		}
	});
}

//get functions here...

app.get('/',function(request,response){
  response.sendFile(__dirname+'/index.html');
});

app.get('/gym-css/gym-css.css',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-css'+'/gym-css.css'));
});

app.get('/gym-css/bootstrap.min.css',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-css'+'/bootstrap.min.css'));
});

app.get('/gym-images/equip1.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip1.jpg'));
});

app.get('/gym-images/equip2.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip2.png'));
});

app.get('/gym-images/equip3.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip3.png'));
});

app.get('/gym-images/equip4.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip4.png'));
});

app.get('/gym-images/equip5.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip5.png'));
});

app.get('/gym-images/equip6.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip6.png'));
});

app.get('/gym-images/equip7.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip7.png'));
});

app.get('/gym-images/equip8.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip8.png'));
});

app.get('/gym-images/equip9.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip9.png'));
});

app.get('/gym-images/equip10.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/equip10.png'));
});

app.get('/gym-images/gallery1.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gallery1.jpg'));
});

app.get('/gym-images/gallery2.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gallery2.jpg'));
});

app.get('/gym-images/gallery3.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gallery3.jpg'));
});

app.get('/gym-images/gallery4.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gallery4.jpg'));
});

app.get('/gym-images/gallery5.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gallery5.jpg'));
});

app.get('/gym-images/group-snip.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/group-snip.png'));
});

app.get('/gym-images/group-snip1.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/group-snip1.jpg'));
});

app.get('/gym-images/gym-snip.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gym-snip.png'));
});

app.get('/gym-images/gym-snip1.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/gym-snip1.jpg'));
});

app.get('/gym-images/log.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/log.png'));
});

app.get('/gym-images/m-768.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/m-768.jpg'));
});

app.get('/gym-images/m-992.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/m-992.jpg'));
});

app.get('/gym-images/m-1300.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/m-1300.jpg'));
});

app.get('/gym-images/m.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/m.jpg'));
});

app.get('/gym-images/personal-snip.png',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/personal-snip.png'));
});

app.get('/gym-images/personal-snip1.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/personal-snip1.jpg'));
});

app.get('/gym-images/special.jpg',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-images'+'/special.jpg'));
});

app.get('/gym-snippets/gym-equipments.html',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-snippets'+'/gym-equipments.html'))
});

app.get('/gym-snippets/gym-login.html',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-snippets'+'/gym-login.html'))
});

app.get('/index.html',function(request,response){
  response.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/gym-js/bootstrap.min.js',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-js'+'/bootstrap.min.js'));
});

app.get('/gym-js/jquery-3.5.1.min.js',function(request,response){
  response.sendFile(path.join(__dirname+'/gym-js'+'/jquery-3.5.1.min.js'));
});

app.get('/gym-css/loginform.css',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-css'+'/loginform.css'));
});

app.get('/gym-css/userOption.css',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-css'+'/userOption.css'));
});

app.get('/gym-images/lock.png',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/lock.png'));
});

app.get('/gym-images/user.png',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/user.png'));
});

app.get('/gym-snippets/loginform.html',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-snippets'+'/loginform.html'));
});

app.get('/gym-snippets/userOptions.html',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-snippets'+'/userOptions.html'));
});

app.get('/gym-snippets/about-us.html',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-snippets'+'/about-us.html'));
});

app.get('/gym-images/aboutus-1.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-1.jpg'));
});

app.get('/gym-images/aboutus-2.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-2.jpg'));
});

app.get('/gym-images/aboutus-3.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-3.jpg'));
});

app.get('/gym-images/aboutus-768.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-768.jpg'));
});

app.get('/gym-images/aboutus-992.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-992.jpg'));
});

app.get('/gym-images/aboutus-1200.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-1200.jpg'));
});

app.get('/gym-images/aboutus-1300.jpg',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-images'+'/aboutus-1300.jpg'));
});

app.get('/gym-css/about-us.css',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-css'+'/about-us.css'));
});

app.get('/gym-js/auth.js',function(request,response){
	response.sendFile(path.join(__dirname+'/gym-js'+'/auth.js'));
});

app.get('/gym-snippets/userOptions.html',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/userOptions.html'));
});

app.get('/gym-snippets/checkout.ejs',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/checkout.ejs'));
});

app.get('/gym-images/male.jpg',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/male.jpg'));
});

app.get('/gym-images/female.jpg',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/female.jpg'));
});

app.get('/gym-images/gender.jpg',function(req,res){
	console.log('global.gender_ = ',global.gender_);
	if(global.gender_ == 'male'){
		res.sendFile(path.join(__dirname+'/gym-images'+'/male.jpg'));
	}
	else{
		res.sendFile(path.join(__dirname+'/gym-images'+'/female.jpg'));
	}
});

app.get('/dimension.png',function(req,res){
	res.sendFile(path.join(__dirname+'/views'+'/dimension.png'));
});

app.get('/logo.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/log.png'));
});

app.get('/style.css',function(req,res){
	res.sendFile(path.join(__dirname+'/views'+'/style.css'));
});

app.get('/gym-js/planWise.js',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-js'+'/planWise.js'));
});

app.get('/gym-snippets/forgot_pswd_email.html',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/forgot_pswd_email.html'));
});

app.get('/gym-snippets/forgot_pswd.html',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/forgot_pswd.html'));
});

app.get('/gym-snippets/bg.mp4',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/bg.mp4'));
});

app.get('/gym-snippets/facebook.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/facebook.png'));
});

app.get('/gym-snippets/instagram.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/instagram.png'));
});

app.get('/gym-snippets/man.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/man.png'));
});

app.get('/gym-snippets/toggle.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/toggle.png'));
});

app.get('/gym-snippets/twitter.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/twitter.png'));
});

app.get('/gym-snippets/trainer.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/trainer.css'));
});

app.get('/invoice',function(req,res){
	var url_invoice = req.url;
	console.log('url_invoice = ',url_invoice);
	url_invoice = url_invoice.toString();
	if(url_invoice.split('?').length > 1){
		var params = url_invoice.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'useremail'){
				console.log('inside man!');
				var email = params[i].split('=')[1];
				console.log('email before decrypt:',email);
				email += '==';
				email = decodeURIComponent(email);
				console.log('after decode email = ',email);
				email = CryptoJS.AES.decrypt(email,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log('email after decrypt: ',email);
				break;
			}
		}

		console.log('email invoice = ',email);
		connection.query('select plans,totalPayment, payment_done from gym_candidate where email=?',[email],function(err,results,fields){

			if(err){
				console.log('error while selecting fro  db');
				console.error(err);
			}
			else{
				var plans = results[0].plans.split(',');
				console.log(results);
				res.render('invoice.ejs',{
					plans: plans,
					totalPayment: results[0].totalPayment,
					payment_done: results[0].payment_done
				});
			}

		});
	}
	console.log('inside get');
});

app.get('/index',function(req,res){
	var emailStr = new Array();
	var u = req.url;
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'username'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				name = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log(name);
			}
			else if (key == 'gender') {
				gender = value;
				gender = decodeURIComponent(value);
			}
			else if(value == 'online'){
				mode += 'online ';
			}
			else if(value == 'offline'){
				mode += 'offline ';
			}
			else if(value == 'trainer'){
				mode += 'trainer';
			}
		}
	}
	console.log('ender ke time ka gender? = ',global.gender_);
	res.render('index',{
			key: 'hello world',
			gender: gender,
			email: name,
			mode: mode
		});
});

global.totalAmount = 2500;
global.plans = [];
app.get('/checkout', function(req, res){
	console.log('url: ',req.url);

	var urls = req.url;
	var queryString = new Array();
	var description = '';
	global.totalAmount = 2500;
	if(queryString.length == 0){
		if(urls.split('?').length > 1) {
			var params = urls.split('?')[1].split('&');
			//console.log('params: ',urls.split('?')[1]);
			for(var i=0;i<params.length;i++){
				var key = params[i].split('=')[0];
				var value = params[i].split('=')[1];
				console.log('key: ',key);
				console.log('value: ',value);
				var tmp = value;
				if( key == 'useremail'){
					continue;
				}
				else{
					if(value == 'online'){
						description += '+ online ';
						global.totalAmount += 500000;
						global.plans.push(tmp);
					}
					else if( value == 'offline'){
						description += '+ offline ';
						global.totalAmount += 1000000;
						global.plans.push(tmp);
					}
					else{
						description += '+ trainer ';
						global.totalAmount += 400000;
						global.plans.push(tmp);
					}
				}
			}
		}
	}
	description = description.replace('+',' ');
	res.render('checkout', {
	key: stripePublicKey,
	amount: global.totalAmount,
	description: description
	})

});


app.get('/aboutUs',function(req,res){
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'useremail' || key == 'email'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				name = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log(name);
			}
			else if (key == 'gender') {
				gender = value;
				gender = decodeURIComponent(value);
			}
			else if(value == 'online'){
				mode += 'online ';
			}
			else if(value == 'offline'){
				mode += 'offline ';
			}
			else if(value == 'trainer'){
				mode += 'trainer';
			}
		}
	}

	connection.query('select gender,name,plans from gym_candidate where email=?',[name],function(err,results,fields){
		if(err){
			console.error('error occured while selecting from db!');
			res.send('error occured sorry');
		}
		else{
			res.render('about-us',{
					key: 'hello world',
					gender: results[0].gender,
					name: results[0].name,
					mode: results[0].plans
				});
		}
	});
	//console.log('render ke time ka gender? = ',global.gender_);
});

app.get('/trainers',function(req,res){
	var u = req.url;
	console.log('url of trainers: ',u);
	res.render('trainer',{
		name: 'name'
	});
});

app.get('/gym-snippets/gym-equipments',function(req,res){
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'email'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				name = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log(name);
			}
			else if (key == 'gender') {
				gender = value;
				gender = decodeURIComponent(value);
			}
			else if(value == 'online'){
				mode += 'online ';
			}
			else if(value == 'offline'){
				mode += 'offline ';
			}
			else if(value == 'trainer'){
				mode += 'trainer';
			}
		}
	}

	connection.query('select gender,name,plans from gym_candidate where email=?',[name],function(err,results,fields){
		if(err){
			console.error('error occured while selecting from db!');
			res.send('error occured sorry');
		}
		else{
			res.render('gym-equipments',{
					key: 'hello world',
					gender: results[0].gender,
					name: results[0].name,
					mode: results[0].plans
				});
		}
	});
});

app.get('/home',function(req,res){
	console.log('url: ',req.url);
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'email'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				email = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log('decrypted email: ',email);
				connection.query('select * from gym_candidate where email=?',[email],function(error,results,fields){
					if(error){
						console.log(error);
						res.send('error sorry');
					}
					else{
							var username = CryptoJS.AES.encrypt(results[0].name,'secret pswd');
							var plans = results[0].plans.split(',');
							var url_login = '/index?useremail='+encodeURIComponent(name) +
							'&username=' + encodeURIComponent(username) +
							'&gender=' + encodeURIComponent(results[0].gender);
							if(Array.isArray(plans) ==false){
								url_login += '&0' + encodeURIComponent(plans);
							}
							else{
								for(var i=0;i<plans.length;i++){
									url_login += '&' + i + '=' + encodeURIComponent(plans[i]);
								}
							}
							res.redirect(url_login);

					}

				});
				break;
			}
		}
	}
});

app.get('/gym-snippets/userOptionss',function(req,res){
	console.log('url: ',req.url);
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'email'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				email = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log('decrypted email: ',email);
				connection.query('select * from gym_candidate where email=?',[email],function(error,results,fields){
					if(error){
						console.log(error);
						res.send('error sorry');
					}
					else{
							var username = CryptoJS.AES.encrypt(results[0].name,'secret pswd');
							var plans = results[0].plans.split(',');
							var url_login = '/gym-snippets/userOptions?useremail='+encodeURIComponent(name) +
							'&username=' + encodeURIComponent(username) +
							'&gender=' + encodeURIComponent(results[0].gender);
							if(Array.isArray(plans) ==false){
								url_login += '&0' + encodeURIComponent(plans);
							}
							else{
								for(var i=0;i<plans.length;i++){
									url_login += '&' + i + '=' + encodeURIComponent(plans[i]);
								}
							}
							res.redirect(url_login);

					}

				});
				break;
			}
		}
	}
});


app.get('/gym-snippets/userOptions',function(req,res){
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'email' || key == 'useremail'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				name = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log(name);
			}
			else if (key == 'gender') {
				gender = value;
				gender = decodeURIComponent(value);
			}
			else if(value == 'online'){
				mode += 'online ';
			}
			else if(value == 'offline'){
				mode += 'offline ';
			}
			else if(value == 'trainer'){
				mode += 'trainer';
			}
		}
	}
	console.log('name: ',name);
	connection.query('select plans from gym_candidate where email=?',[name],function(error,results,fields){
		if(error){
			console.error('error happened while selecting plans');
			res.send('sorry some error occured in serevr..');
		}
		else{
			var plans;
			plans = results[0].plans.split(',');
			var online = 'Buy to View';
			var offline = 'Buy to View';
			var trainer = 'Buy to View';
			if(Array.isArray(plans)){
					for(var i=0;i<plans.length;i++){
						if(plans[i] == 'online'){
							online = 'select';
						}
						else if(plans[i] == 'offline'){
							offline = 'select';
						}
						else{
							trainer = 'select';
						}
					}
			}
			else {
				if(plans == 'online'){
					online = 'select';
				}
				else if(plans == 'offline'){
					offline = 'select';
				}
				else{
					trainer = 'select';
				}
			}
			res.render('userOptions',{
				online: online,
				offline: offline,
				trainer: trainer
			});
		}
	});
});


app.get('/gym-css/close.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/close.png'));
});

app.get('/workout.mp4',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/workout.mp4'));
});

app.get('/gym-css/menu.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/menu.png'));
});

app.get('/onlinePlan',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/online-plan.html'));
});

app.get('/onlineVideo',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/online-video.html'));
});

app.get('/gym-css/online-plan.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/online-plan.css'));
});

app.get('/gym-css/online-video.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/online-video.css'));
});

app.get('/offlinePlan',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/offline-plan.html'));
});

app.get('/offline-bg.jpg',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/offline-bg.jpg'));
});

app.get('/offline-plan.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/offline-plan.css'));
});

app.get('/intro',function(req,res){
	res.render('intro',{
		name: 'anand'
	});
});

app.get('/gym-css/intro.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/intro.css'));
});

app.get('/gym-images/fp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/fp.png'));
});

app.get('/gym-images/sp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/sp.png'));
});

app.get('/gym-images/thirdp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/thirdp.png'));
});

app.get('/gym-images/fourthp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/fourthp.png'));
});

app.get('/gym-images/fifthp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/fifthp.png'));
});

app.get('/gym-images/sixthp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/sixthp.png'));
});

app.get('/gym-images/seventhp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images/seventhp.png'));
});

app.get('/gym-images/eigthp.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/eigthp.png'));
});

app.get('/gym.jpg',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/gym-tt.jpg'));
});

app.get('/tt.css',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-css'+'/tt.css'));
});

app.get('/tt',function(req,res){
	//res.sendFile(path.join(__dirname+'/gym-snippets'+'/tt.html'));
	var emailStr = new Array();
	var u = req.url;
	console.log('url recieved is: ',u);
	var name;
	var gender;
	var mode = '';
	if(u.split('?').length >1){
		var params = u.split('?')[1].split('&');
		for(var i=0;i<params.length;i++){
			var key = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(key == 'email' || key == 'useremail'){
				console.log('inside man!');
				name = params[i].split('=')[1];
				name = decodeURIComponent(name);
				//console.log('before email = ',email);
				name = CryptoJS.AES.decrypt(name,'secret pswd').toString(CryptoJS.enc.Utf8);
				console.log(name);
				break;
			}
		}
	}
	console.log('name: ',name);
	connection.query('select * from tt',function(error,results,fields){
		if(error){
			console.error('error happened while selecting from tt');
			res.send('sorry some error occured in serevr..');
		}
		else{
			var trainers = [];
			var location = [];
			var time = [];
			var id = [];
			if(results.length > 0 || results.length!== undefined){
				for(var i=0;i<results.length;i++){
					id.push(results[i].id);
					trainers.push(results[i].Trainer);
					location.push(results[i].location);
					time.push(results[i].time);
				}
			}
			res.render('tt',{
				id: id,
				Trainers: trainers,
				location: location,
				time: time
			});
		}
	});
});

app.get('/trainerChat',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-snippets'+'/trainer_chat.html'));
});

app.get('/chat.png',function(req,res){
	res.sendFile(path.join(__dirname+'/gym-images'+'/chat.png'));
});

//post methods here....

app.post('/changedPswd',function(req,res){
	//console.log('pswd: ',req.body.pswd);
	console.log('email: ',req.body.email);
	var pswd = CryptoJS.AES.decrypt(req.body.pswd,'form').toString(CryptoJS.enc.Utf8);
	var email = CryptoJS.AES.decrypt(req.body.email,'form').toString(CryptoJS.enc.Utf8);
	var url = 'http://localhost:5000/gym-snippets/forgot_pswd.html?useremail=' + decodeURIComponent(req.body.email);
	connection.query('update gym_candidate set pswd=? where email=?',[req.body.pswd,email],function(err,results,fields){
		if(err){
			console.log('error happened while updating the pswd..');
			res.send('error happened while updating the pswd..');
		}
		else{
			console.log('updated pswd successfully!');
			var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'goldgym003@gmail.com',
						pass: 'gold-gym-003-@@'
					}
				});

				var mailOptions = {
					from: 'goldgym003@gmail.com',
					to: email,
					subject: 'Gold Gym password changed successfull',
					text: 'Hello user, your password, was successfully changed!!'
					+ '\n'
					+ '\n'
					+ '\n If this action was not performed by you please click on the link below to redirect to your page to set it again..'
					+ '\n'
					+ '\n'
					+ '\n' + 'LINK to Change Password..'
					+ '\n'
					+ '\n'
					+ '\n'
					+ '\n'+ url
				};

				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
						res.send('error while sending email.. ')
					} else {
						console.log('Email sent: ' + info.response);
						res.redirect(url.replace('forgot_pswd.html','loginform.html'));
					}
				});
		}
	});
});


app.post('/forgotPswd_sendEmail',function(req,res){
	console.log('email: ',req.body.email);
	var email_ = req.body.email;
	//email = email.toString();
	var email = CryptoJS.AES.decrypt(email_,'form');
	email = email.toString(CryptoJS.enc.Utf8);
	console.log('after decrypt email: ',email);
	var url = 'http://localhost:5000/gym-snippets/forgot_pswd.html?useremail=' + decodeURIComponent(email_);
	var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'goldgym003@gmail.com',
				pass: 'gold-gym-003-@@'
			}
		});

		var mailOptions = {
			from: 'goldgym003@gmail.com',
			to: email,
			subject: 'Gold Gym Change password',
			text: 'Hello user, here is the link for you to change your password.'
			+ '\n'
			+ '\n'
			+ '\n By clicking on this you confirm that you want to change the password..'
			+ '\n'
			+ '\n'
			+ '\n' + 'LINK to Change Password..'
			+ '\n'
			+ '\n'
			+ '\n'
			+ '\n'+ url
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
				res.send('error while sending email.. ')
			} else {
				console.log('Email sent: ' + info.response);
				res.redirect(url);
			}
		});


});




app.post('/payment', function(req, res){

	// Moreover you can take more details from user
	// like Address, Name, etc from form
	amount = req.body;
	console.log('totalAmount1: ',global.amount);
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		address: {
			line1: 'TC 9/4 Old MES colony',
			postal_code: '110092',
			city: 'New Delhi',
			state: 'Delhi',
			country: 'India',
		}
	})
	.then((customer) => {
		amount = req.body.amount;
		console.log('totalAmount bhai: ',amount);
		return stripe.charges.create({
			amount: global.totalAmount,	 // Charing Rs 25
			description: '',
			currency: 'inr',
			customer: customer.id
		});
	})
	.then((charge) => {
		console.log('charge: ',req.body.stripeEmail);
		console.log('plans: ',global.plans);
		var plansStr = global.plans.toString();
		connection.query('select plans from gym_candidate where email=?',[req.body.stripeEmail],function(error,results,field){
			if(error){
				console.error('error happened while selecting');
				res.send('sorry some error happened in the server');
			}
			else{
				if(results[0].plans !== null){
					connection.query('update gym_candidate set  totalPayment = ?,payment_done = "true" where email=? ',[global.totalAmount,req.body.stripeEmail],function(err,result,fields){
						if(err){
							console.log(err);
							console.log('error happened while updating..');
						}
						else{
							console.log('successfull in updating the database...');
						}
					});
				}
				else{
					connection.query('update gym_candidate set plans = ?, totalPayment = ?,payment_done = "true" where email=? ',[plansStr,global.totalAmount,req.body.stripeEmail],function(err,result,fields){
						if(err){
							console.log(err);
							console.log('error happened while updating..');
						}
						else{
							console.log('successfull in updating the database...');
						}
					});
				}
			}
		});
		//res.send("hello world") // If no error occurs
		var nameENC;
		connection.query('select name,gender from gym_candidate where email=?',[req.body.stripeEmail],function(err,results,fields){
			if(err){
				console.log('error while selecting..');
				console.log(err);
			}
			else{
				nameENC = results[0].name;
				var name = nameENC;
				gender = results[0].gender;
				console.log('name: ',nameENC);
				nameENC = CryptoJS.AES.encrypt(nameENC,'secret pswd');
				var redirectURL = 'http://localhost:5000/intro?username=' + encodeURIComponent(nameENC) + '&gender=' + encodeURIComponent(gender) + '&useremail=' + encodeURIComponent(CryptoJS.AES.encrypt(req.body.stripeEmail,'secret pswd'));
				for(var i=0;i<global.plans.length;i++){
					redirectURL += '&' + i + '=' + global.plans[i];
				}
				global.plans = [];
				res.redirect(redirectURL);
				var url = redirectURL.toString().replace('intro','invoice') + '&useremail=' + encodeURIComponent(CryptoJS.AES.encrypt(req.body.stripeEmail,'secret pswd'));
				var transporter = nodemailer.createTransport({
					  service: 'gmail',
					  auth: {
					    user: 'goldgym003@gmail.com',
					    pass: 'gold-gym-003-@@'
					  }
					});

					var mailOptions = {
					  from: 'goldgym003@gmail.com',
					  to: req.body.stripeEmail,
					  subject: 'Gold Gym Payment successfull',
					  text: 'Thankyou! ' + name + ' '+  ' Your payment was recieved successfully!! You can find the link to your invoice below.'
						+ '\n'
						+ '\n'
						+ '\n' + 'LINK to the INVOICE..'
						+ '\n'
						+ '\n'
						+ '\n'
						+ '\n'+ url
					};

					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					    console.log(error);
					  } else {
					    console.log('Email sent: ' + info.response);
					  }
					});



				}
		});
})
	.catch((err) => {
		console.log(err);
		res.send('err')	 // If some error occurs
	});
})


global.idNow = '';
app.post('/register',function(request,response){
  var name = request.body.fname;
  var pswd = request.body.pswd;
  var l_name = request.body.lname;
  var gender = request.body.optradio;
  var email = request.body.email;
  var number = request.body.tel;
	var plan =request.body.plans;
	console.log('plans:- ',plan);
	if(plan!== undefined){
		name = CryptoJS.AES.decrypt(name,'form');
		l_name = CryptoJS.AES.decrypt(l_name,'form');
		email = CryptoJS.AES.decrypt(email,'form');
		//number = CryptoJS.AES.decrypt(number,'form').toString(CryptoJS.enc.Utf8);
		//number = Number(number);
		var tmp = {
			name: name.toString(CryptoJS.enc.Utf8),
			pswd: pswd,
			l_name: l_name.toString(CryptoJS.enc.Utf8),
			gender: gender,
			email: email.toString(CryptoJS.enc.Utf8),
			number: Number(number),
			payment_done: 'false'
		};
		global.gender_ = gender;
		//console.log('stripe.charges: ',stripe.charges);

		console.log('tmp recieved is: ',tmp);
		if(email && pswd && number){
			connection.query('INSERT INTO gym_candidate SET ?',tmp,function(errors,results,fields){
				if(errors){
					console.log('error while inserting..');
					return;
				}
				else{
					var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
								user: 'goldgym003@gmail.com',
								pass: 'gold-gym-003-@@'
							}
						});
						var onlineProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
						var offlineProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
						var trainerProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
						var encodedEmail = CryptoJS.AES.encrypt(email, "secret pswd");

						var decrypted = CryptoJS.AES.decrypt(encodedEmail, "secret pswd");

						var url = 'http://localhost:5000/checkout?useremail='+ encodeURIComponent(encodedEmail);
						if(Array.isArray(plan) == false){
							url += '&' + 0 + '=' + encodeURIComponent(plan);
						}
						else{
							for(var i=0;i<plan.length;i++){
								url +=  '&' + i + '=' + encodeURIComponent(plan[i]);
							}
						}
						console.log('url now is: ',url);
						response.redirect(url);
						var pathOnlineProgram = '/gym-web-app' + '/gym-images' + '/m.jpg';
						var pathLogo ='/gym-web-app' + '/gym-images' + '/log.png';
						console.log('pathogo: ',pathLogo);
						var emailBody = ''
						fs.readFile(pathOnlineProgram,function(error,data){
							if(error){
								console.log('some error happened..');
							}
							else{
								request.session.image1 = data;
							}
						});
						fs.readFile(pathLogo,function(error,data){
							if(error){
								console.log('some error happened..');
							}
							else{
								request.session.image2 = data;
							}
						});
						var mailOptions = {
							from: 'goldgym003@gmail.com',
							to: email.toString(CryptoJS.enc.Utf8),
							subject: 'GOLD GYM Register',
							text: 'Thankyou! ' + name.toString(CryptoJS.enc.Utf8) + ' '+ l_name.toString(CryptoJS.enc.Utf8) + ' for registering to our GYM, we hope get fit and get better. Looking forward to seeing you everyday.'
							+ '\n'
							+ '\n'
							+ '\nYou can checkout some of our programs listed below as links. Once again, Thankyou! :)'
							+ '\n'
							+ '\n'
							+ '\n 1) online program - '+ onlineProgram
							+ '\n'
							+ '\n'
							+ '\n 2) offline program - '+ offlineProgram
							+ '\n'
							+ '\n'
							+ '\n 3) trainer program - '+ trainerProgram
							+ '\n'
							+ '\n'
							+ '\n',
							attachments: [
							{
								filename: 'm.jpg' ,
								contentType:  'image/jpg',
								path: pathOnlineProgram
							},
							{
								filename: 'log.png' ,
								contentType:  'image/png',
								path: pathLogo
							},
							{
								filename: 'aboutus-1300.jpg' ,
								contentType:  'image/png',
								path: '/gym-web-app' + '/gym-images' + '/aboutus-1300.jpg'
							}

							]
						};

						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent: ' + info.response);
							}
						});

				}
			});
		}
		else{
			response.send('PLEASE ENTER THE REQUIRED CREDENTIALS...');
		}
	}
	else{
		var redirectURL = 'http://localhost:5000/intro?username=' + encodeURIComponent(name) + '&gender=' + encodeURIComponent(gender) + '&useremail=' + encodeURIComponent(email);
		response.send('select plans!');
	}
});


app.post('/login',function(request,response){
	var email = request.body.email;
	var pswd = request.body.pswd;
	console.log('email: ',email);
	console.log('pswd: ',pswd);
	email = CryptoJS.AES.decrypt(email,'form').toString(CryptoJS.enc.Utf8);
	pswd = CryptoJS.AES.decrypt(pswd,'form').toString(CryptoJS.enc.Utf8);
	console.log('email: ',email);
	console.log('pswd: ',pswd);
	if(email && pswd){
		connection.query('SELECT * FROM gym_candidate WHERE email = ?',[email],function(errors,results,fields){
			console.log('results = ',results);
			if(results[0].payment_done == true || results[0].payment_done == 'true'){
				console.log('before if: ',CryptoJS.AES.decrypt(results[0].pswd,'form').toString(CryptoJS.enc.Utf8));
				if(CryptoJS.AES.decrypt(results[0].pswd,'form').toString(CryptoJS.enc.Utf8) == pswd){
					console.log('successfully logged in!');
					email = CryptoJS.AES.encrypt(email,'secret pswd');
					var username = CryptoJS.AES.encrypt(results[0].name,'secret pswd');
					var plans = results[0].plans.split(',');
					var url_login = '/index?useremail='+encodeURIComponent(email) +
					'&username=' + encodeURIComponent(username) +
					'&gender=' + encodeURIComponent(results[0].gender);
					if(Array.isArray(plans) ==false){
						url_login += '&0' + encodeURIComponent(plans);
					}
					else{
						for(var i=0;i<plans.length;i++){
							url_login += '&' + i + '=' + encodeURIComponent(plans[i]);
						}
					}
					response.redirect(url_login);
				}
				else{
					response.send('sorryy but the pswd was wrong!');
				}
			}
			else{
				if(results[0].plans == null){
					response.render('register',{
						name: results[0].name,
						l_name: results[0].l_name,
						gender: results[0].gender,
						number: results[0].number,
						email: results[0].email,
						pswd: CryptoJS.AES.decrypt(results[0].pswd,'form').toString(CryptoJS.enc.Utf8)
					});
				}
			}
		});
	}
});

app.post('/register/update',function(request,response){
	var name = request.body.fname;
  var pswd = request.body.pswd;
  var l_name = request.body.lname;
  var gender = request.body.optradio;
  var email = request.body.email;
  var number = request.body.tel;
	var plan =request.body.plans;
	console.log('plans:- ',plan);
	name = CryptoJS.AES.decrypt(name,'form');
	l_name = CryptoJS.AES.decrypt(l_name,'form');
	email = CryptoJS.AES.decrypt(email,'form');
	//number = CryptoJS.AES.decrypt(number,'form').toString(CryptoJS.enc.Utf8);
	//number = Number(number);
  var tmp = {
    name: name.toString(CryptoJS.enc.Utf8),
    pswd: pswd,
    l_name: l_name.toString(CryptoJS.enc.Utf8),
    gender: gender,
    email: email.toString(CryptoJS.enc.Utf8),
		number: Number(number),
		payment_done: 'false'
  };
	global.gender_ = gender;
	//console.log('stripe.charges: ',stripe.charges);

	console.log('tmp recieved is: ',tmp);
  if(email && pswd && number){
    connection.query('update gym_candidate SET plans = ?',plan,function(errors,results,fields){
      if(errors){
        console.log('error while updating..');
        return;
      }
      else{

					var onlineProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
					var offlineProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
					var trainerProgram = 'http://localhost:5000/gym-snippets/userOptions.html';
					var encodedEmail = CryptoJS.AES.encrypt(email, "secret pswd");

					var decrypted = CryptoJS.AES.decrypt(encodedEmail, "secret pswd");

					var url = 'http://localhost:5000/checkout?useremail='+ encodeURIComponent(encodedEmail);
					if(Array.isArray(plan) == false){
						url += '&' + 0 + '=' + encodeURIComponent(plan);
					}
					else{
						for(var i=0;i<plan.length;i++){
							url +=  '&' + i + '=' + encodeURIComponent(plan[i]);
						}
					}
					console.log('url now is: ',url);
					response.redirect(url);
      }
    });
  }
  else{
    response.send('PLEASE ENTER THE REQUIRED CREDENTIALS...');
  }
});


app.post('/addTrainer',function(req,res){
	var tmp = {
		Trainer: req.body.name,
		location: req.body.location,
		time: req.body.time
	};
	console.log('tmp: ',tmp);
	if(req.body.name && req.body.time && req.body.location){
		connection.query('insert into tt set ?',tmp,function(errors,results,fields){
			if(errors){
				console.log(errors);
				res.send('error occured while inserting into database..');
			}
			else{
				res.redirect('/trainerChat');
			}
		});
	}
});



//socket connection and events here...

io.on('connection',function(socket){
	socket.on('send',function(data){
		socket.broadcast.emit("recieve", data);
	});
});




//http listen on port 4000...

http.listen(PORT,function(){
  console.log('listening on port 4000');
});
