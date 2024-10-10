const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const mysql = require("mysql"); 


//회원가입
router.get('/sign_up', function(req, res, next) {
  res.render("user/회원가입");
});


router.post("/sign_up", async function(req,res,next){
  let body = req.body;
console.log("이승현", body);
  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create(
     {
       name: body.name,
       email: body.email,
       password: hashPassword,
       salt: salt
   }
)

  res.redirect("/users/sign_up");
})


// 메인페이지
router.get('/main', function(req, res, next) {
  res.render("user/메인");
});

//로그인 후 메인페이지
router.get("/success", loggedin, function(req, res) {
  res.render('user/success', {});
});
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + "/public/success.html")
// })


router.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
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
  res.render('user/마이페이지', {});
});





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

  res.redirect("http://localhost:3000")
})


//회원정보수정

router.get("/modi", loggedin, function(req, res) {
  res.render('user/회원정보수정', {});
});

router.post("/modi", async function(req,res,next){

  let body = req.body;
  console.log("이승현", body);
    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  
    let result = models.user.update(
       {
         name: body.name,
         email: body.email,
         password: hashPassword,
         salt: salt
     }, {
          where: {
            name : body.name
          },
        },
  )

  // let body = req.body;

  // console.log("이승현", body);
  // let result = models.user.update(
  //   //   {
  //   //     name: body.userName,
  //   //     email: body.userEmail,
  //   //     password: hashPassword,
  //   //     salt: salt
  //   // }
  //   body
  // )
  res.redirect("/users/modi");
});

//탈퇴-비밀번호 확인
router.get("/passwordch",  function(req,res,next) {
  res.render("user/passwordch");
})

router.post("/passwordch", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne ({
    where: {
      email : body.email
  } 
  });
  if (result === null) {
    console.log('Not found!')
    res.redirect("/users/passwordch");
  } else {
     // true
    console.log("성공") // 'My Title'
    res.render("user/탈퇴");
  }
});

// 탈퇴 확인 메세지
router.get("/exit",  function(req,res,next) {
  res.render("user/탈퇴");
})

router.post("/exit", async function(req,res,next){
  let body = req.body;

  let result = await models.user.destroy({
    where: {
      email : body.email
  }
  });
  res.redirect("http://localhost:3000")
});

module.exports = router;





