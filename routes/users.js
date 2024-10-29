const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const mysql = require("mysql");
// const { existsSync } = require('fs');

//회원가입
router.get('/sign_up', function(req, res, next) {
  res.render("user/회원가입");
});


router.post("/sign_up", async function(req,res,next){
  let body = req.body;

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

  res.redirect("/users/profileset");
})




// 메인페이지
router.get('/main', function(req, res, next) {
  res.render("user/메인");
});

//로그인 후 메인페이지
router.get("/success", loggedin, function(req, res) {
  res.render('user/success', {});
});



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
  })
  if (result) {
    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  
    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");
        //세션 설정
        req.session.name = body.userName;
        res.redirect("/users/login");
      } else {
        console.log("비밀번호 불일치");
        res.send("<script>alert('비밀번호를 다시 확인해주세요.');location.href='/users/login';</script>")
      }
  } else {
    // console.log("ㄴㄴ");
    res.send("<script>alert('회원정보가 없습니다.');location.href='/users/login';</script>");
  }
  } 
);


//마이페이지
router.get("/mypage", loggedin, async function(req, res) {
  let body = req.body;

  let result = await models.preferences.findOne({
    // attributes: ['name', 'age'],
  });
  console.log(result);

  let ni = await models.profile.findOne({

  });
 
  res.render('user/마이페이지', { body, result, ni});
});





//로그인했는지
function loggedin(req, res, next) {
  //로그인 후 세션이 있다면 req.session.name이 항상 있음
  if(req.session.name) {
    next(); //통과
  } else {
    res.send("<script>alert('로그인이 필요합니다.');location.href='/users/login';</script>");
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
  
    let result = await models.user.update(
       {
         name: body.name,
         email: body.email,
         password: hashPassword,
         salt: salt
     }, {
          where: {
            name : body.name,
          },
        },
  );

  if (result) {
    console.log("성공")
  } else {
    console.log('Not found!')
  }

  res.send("<script>alert('성공적으로 수정되었습니다.');location.href='/users/mypage';</script>")
});


//탈퇴-비밀번호 확인
router.get("/passwordch",  function(req,res,next) {
  res.render("user/passwordch");
})

router.post("/passwordch", async function(req,res,next){
  let body = req.body;

  let result = await models.user.destroy ({
    where: {
      email : body.email
  } 
  });
  if (result) {
    req.session.destroy();
    console.log("성공") 
    res.send("<script>alert('탈퇴되었습니다.');location.href='/';</script>");

  } else {
    console.log('Not found!')
    res.send("<script>alert('이메일을 확인해주세요.');location.href='/users/passwordch';</script>");
  }
});


// 사용자 정보
router.post("/success1", async function(req,res,next){
  let body = req.body;

  let result = models.preferences.create(
    {
      name: body.uname, 
      age: body.age,
      city: body.city,
      healthcondition: body.healthCondition,
      exerciseTime: body.exerciseTime,
  }
)
});


//산책로 추천
router.post("/success", async function(req,res,next){
  let body = req.body;

  let result = models.paths.create(
    {
      start: body.start, 
      end: body.end,
      // searchRoute: body.searchRoute,
      // findTrails: body.findTrails,
  }
)
    // res.redirect("/users/success");

});


//프로필 설정
router.get("/profileset",  function(req,res,next) {
  res.render("user/profileset");
})

router.post("/profileset", async function(req,res,next){
  let body = req.body;

  let result = models.profile.create(
    {
      name: body.name, 
      introduce: body.introduce,
      searchRoute: body.searchRoute,
      findTrails: body.findTrails,
  }
)
res.redirect("/users/login");
});

//프로필 수정
router.get("/reprofile",  function(req,res,next) {
  res.render("user/reprofile");
})

router.post("/reprofile", async function(req,res,next){
  let body = req.body;

  let result = await models.profile.update(
    {
      name: body.name,
      introduce: body.introduce,
  }, {
       where: {
         name : body.name,
       },
     },
)
// res.redirect("/users/mypage");
});

module.exports = router;





