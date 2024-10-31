const openPopUp = document.getElementById('openPopUp');
const openG = document.getElementById('openG');

openPopUp.addEventListener('click', () => {
    window.open("http://localhost:3000/users/reprofile", 'popup', 'width=500, height=400, left=10, top=20' );
});

openG.addEventListener('click', () => {
    window.open("http://localhost:3000/users/goal_set", 'popup', 'width=500, height=400, left=10, top=20' );
});



