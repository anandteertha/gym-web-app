var PORT = process.env.PORT || 5000;
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var sha256 = require('sha256');
var path = require('path');
var nodemailer = require('nodemailer');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('/'));

var db_config = {
	host     : 'localhost',
	user     : 'root',
	password : 'hello world',
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

//post methods here....

app.post('/register',function(request,response){
  var name = request.body.fname;
  var pswd = request.body.pswd;
  var l_name = request.body.lname;
  var gender = request.body.optradio;
  var email = request.body.email;
  var number = request.body.tel;
  var tmp = {
    name: name,
    pswd: pswd,
    l_name: l_name,
    gender: gender,
    email: email,
    number: number
  };
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

					var mailOptions = {
					  from: 'goldgym003@gmail.com',
					  to: email,
					  subject: 'GOLD GYM',
					  text: 'Thankyou! for registering to our GYM, we hope get fit and get better. Looking forward to seeing you everyday. You can checkout some of our programs listed below as links. Once again, Thankyou! :)'
					};

					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					    console.log(error);
					  } else {
					    console.log('Email sent: ' + info.response);
					  }
					});
        response.redirect('/');
      }
    });
  }
  else{
    response.send('PLEASE ENTER THE REQUIRED CREDENTIALS...');
  }
});

app.post('/login',function(request,response){
	var email = request.body.email;
	var pswd = request.body.pswd;
	if(email && pswd){
		connection.query('SELECT pswd FROM gym_candidate WHERE email = ?',[email],function(errors,results,fields){
			console.log('results = ',results);
			if(results[0].pswd == pswd){
				console.log('successfully logged in!');
				response.redirect('/');
			}
			else{
				response.send('sorryy but the pswd was wrong!');
			}
		});
	}
});

//http listen on port 4000...

http.listen(PORT,function(){
  console.log('listening on port 4000');
});
