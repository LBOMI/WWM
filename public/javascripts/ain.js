const express = require('express');
const router = express.Router();
const models = require("../models");

function login() {
    var id = document.querySelector('#id');
    var pw = document.querySelector('#pw');
  
    if(id.value == "" || pw.value == "") {
        alert("로그인을 할 수 없습니다.")
        res.render("user/로그인");
    }
    else {
        location.href = 'index.html'
    }
  }
  
  
  function create_id() {
    var id = document.querySelector('#up_id').value;
    var pw = document.querySelector('#up_pw').value;
    var r_pw = document.querySelector('#r_pw').value;
    var email = document.querySelector('#email').value;
    var pwdcheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/

    // if(id.value == "" || pw.value == "" || r_pw.value == "" || email.value == "") {
    //     alert("회원 정보를 입력해주세요.");
    //     return false;
    // } else {
    //     if (false === pwdcheck.test(pw.value) || pw.value.length<8){
    //         alert('비밀번호는 영대소문자, 숫자로 구성된 8글자 이상으로 조합하시오.');
    //         return false;
    //     }
    //     else {
    //         if (pw.value !== r_pw.value) {
    //             alert("비밀번호를 확인해주세요.")
    //             return false;
    //             } 
    //             else {
    //             location.href ="http://localhost:3000/users/sign_up"
    //             }
    //         }
    //     return true;
    //     }
    
        if(id== "" || pw== "" || r_pw== "" || email== "") {
            alert("회원 정보를 입력해주세요.");
            return false;
        } else if (!pwdcheck.test(pw)){
            alert('비밀번호는 영대소문자, 숫자로 구성된 8글자 이상으로 조합하시오.');
           return false;
        // } else if (pw.length<8) {
        //     alert('숫자로 구성된 8글자 이상으로 조합하시오.');
        //     return false;
        } else if (pw!== r_pw){
            alert("비밀번호를 확인해주세요.")
            return false;
        } return true;
}


  function updateUser() {
    var id = document.querySelector('#up_id').value;
    var pw = document.querySelector('#up_pw').value;
    var r_pw = document.querySelector('#r_pw').value;
    var email = document.querySelector('#email').value;
    var pwdcheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/

    if(id== "" || pw== "" || r_pw== "" || email== "") {
        alert("회원 정보를 입력해주세요.");
        return false;
    } else if (!pwdcheck.test(pw)){
        alert('비밀번호는 영대소문자, 숫자로 구성된 8글자 이상으로 조합하시오.');
       return false;
    // } else if (pw.length<8) {
    //     alert('숫자로 구성된 8글자 이상으로 조합하시오.');
    //     return false;
    } else if (pw!== r_pw){
        alert("비밀번호를 확인해주세요.")
        return false;
    } return true;
}

  function check() {
    var email = document.querySelector('#email');
    // let body = req.body;
    if(email.value == "") {
        alert("이메일을 입력해주세요.")
        // location.href = 'http://localhost:3000/users/passwordch'
    }
    else  {
        location.href = 'http://localhost:3000/users/passwordch'
    }
  }