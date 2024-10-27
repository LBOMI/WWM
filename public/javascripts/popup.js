const openPopUp = document.getElementById('openPopUp');


openPopUp.addEventListener('click', () => {
    window.open("http://localhost:3000/users/reprofile", 'popup', 'width=500, height=400, left=10, top=20' );
});

