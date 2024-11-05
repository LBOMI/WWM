const models = require("./models/index.js");
const session = require('express-session');




// const mysql = require("mysql");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'login',
  port: '3306',
});

connection.connect((err) => { //소켓 open
  if (err) throw err;
  console.log('socket open')
});

connection.query("SELECT * FROM users", (err, result)=> {
  if (err) throw err;
  console.log(result)
})





connection.end()//커넥션 끊기





/*회원 정보 수정
connection.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE users SET userName = 'body.userName', password = 'body.password', userEmail='body.userEmail' ";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}); 
*/


models.sequelize.sync().then(()=> {
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();

// view engine setup
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 //쿠키 유효기간 24시간
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// app.post('/mypage', function(req, res){
//   var responseData = {};
//  console.log("아아")
//   var query =  connection.query('select * from charta ', function(err,rows){ 

//     responseData.day = [];
//     if(err) throw console.log("ㅇㅇ");
//     if(rows[0]){
//       responseData.result = "ok";
//       rows.forEach(function(val){
//         responseData.day.push(val.day);
//       })
//     }
//     else{
//       responseData.result = "none";
//       responseData.day = "";
//     }
//     res.json(responseData);
//   });
// });



module.exports = app;
