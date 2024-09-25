const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');





router.get('/sign_up', function(req, res, next) {
  res.render("user/회원가입");
});


router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt
  })

  res.redirect("/users/sign_up");
})

// 메인페이지
router.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})

// 로그인 후 메인페이지
router.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/success.html")
})


// 로그인 GET
router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render("user/로그인", {
    session : session
  });
});



// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      name : body.userName
  }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
      console.log("비밀번호 일치");
      //세션 설정
      req.session.name = body.userName;
  }
  else{
      console.log("비밀번호 불일치");
  }
  res.redirect("/users/login");
});

//마이페이지
router.get("/mypage", loggedin, function(req, res) {
  res.render("user/마이페이지");
});

//회원정보 수정
router.get("/modification", function(req, res) {
  res.render("user/회원정보수정");
});

router.put('/modification',  (req, res) => {
  connection.query("UPDATE * FROM users", (error, result, fields) => {
    if (error) throw error;
    console.log(results);
})
});

function modi(req, res, next) {
  connection.query("UPDATE * FROM users", (error, result, fields) => {
    if (error) throw error;
    console.log(results);
  });
}




//로그인했는지
function loggedin(req, res, next) {
  //로그인 후 세션이 있다면 req.session.name이 항상 있음
  if(req.session.name) {
    next(); //통과
  } else {
    res.send("먼저 로그인 해주세요.");
  }
}


//로그아웃
router.get("/logout", function(req,res,next) {
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("http://localhost:3000/index.html")
})
module.exports = router;




