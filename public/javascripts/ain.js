

function login() {
    var id = document.querySelector('#id');
    var pw = document.querySelector('#pw');
  
    if(id.value == "" || pw.value == "") {
        alert("로그인을 할 수 없습니다.")
    }
    else {
        location.href = 'index.html'
    }
  }
  
  function create_id() {
    var id = document.querySelector('#up_id');
    var pw = document.querySelector('#up_pw');
    var r_pw = document.querySelector('#r_pw');
    var email = document.querySelector('#email')
  
    if(id.value == "" || pw.value == "" || r_pw.value == "" || email.value == "") {
        alert("회원가입을 할 수 없습니다.")
    }
    else {
        if(pw.value !== r_pw.value) {
            alert("비밀번호를 확인해주세요.")
        }
        else {
            location.href = 'index.html'
        }
    }
  }

  function updateUser() {
    var id = document.querySelector('#up_id');
    var pw = document.querySelector('#up_pw');
    var r_pw = document.querySelector('#r_pw');
    var email = document.querySelector('#email')

  
    if(id.value == "" || pw.value == "" || r_pw.value == "" || email.value == "") {
        alert("빈칸을 채워주세요.")
    }
    else {
        if(pw.value !== r_pw.value) {
            alert("비밀번호를 확인해주세요.")
        }
        else {
            location.href = 'index.html'
        }
    }
  }

  function check() {
    var pw = document.querySelector('#up_pw');
  
    if(pw.value == "") {
        alert("비밀번호를 입력해주세요.")
        location.href = 'http://localhost:3000/users/passwordch'
    }
    else {
        location.href = 'http://localhost:3000/users/passwordch'
    }
  }