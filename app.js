var express = require('express')
	, routes = require('./routes');
var stormpath = require('express-stormpath');
var app = express();
//console.log(myIP());
var socket = require('socket.io-client')('http://localhost');
var net = require('net');
/*var client = net.connect(8888,'128.237.169.237',function(){
	console.log('Connected');
});*/
var client = net.connect(4000,'localhost',function(){
	console.log('Connected');
});
var io = require('socket.io').listen(app.listen(3000));
client.on('data', function(data) {
  console.log(data.toString());
  io.emit('message', { message: data.toString() });
});
app.use(express.static(__dirname+"/public"));
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.get('/patienthome/',routes.patienthome);
app.get('/showPatient/', routes.showPatient);
app.get('/beginsetup/', routes.beginsetup);
app.get('/devicesetup/', routes.devicesetup);
app.get('/syncing/', routes.syncing);
app.get('/complete/',routes.complete);
app.get('/removehands/',routes.removehands);
app.get('/calibrate/',routes.calibrate);
var enable="{\"type\" : \"request\",\"enableEvent\": true}";
var disable="{\"type\" : \"request\",\"enableEvent\": false}";
var caseConnect="{type:\"CaseConnected\"}";
io.sockets.on('connection', function (socket) {
	console.log("CONNECTIONS");
	socket.on('enableJSON',function(){
		console.log("enable");
		client.write(enable);

	});
	socket.on('disableJSON',function(){
		client.write(disable);
	});
	socket.on('caseConnect',function(){
		//client.write(caseConnect);
		console.log(caseConnect);
	});
	

});
/*function myIP(){ var vi="uses java to get the users local ip number"
    var yip2=java.net.InetAddress.getLocalHost();	
    var yip=yip2.getHostAddress();
  return yip;
}//end myIP
*/
/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : 'root',
  host     : 'localhost:3306',
  database: 'Regrasp',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
 if(err){
 	console.log('db_connection_err',err);
 	return;
 }
  console.log("HI");
});
var post  = "select * from TestTable";
var query = connection.query(post, function(err, result) {
	if(err){
		console.log('db_connection_err',err);
	}else{
		console.log("this is result ",result);
	}
  // Neat!
});
//console.log(query.sql);
console.log("worked"); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
*/



