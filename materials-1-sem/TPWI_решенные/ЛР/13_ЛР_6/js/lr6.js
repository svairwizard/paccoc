// Добавление функционала для кнопки входа
document.getElementById('login-btn').addEventListener('click', function () {
    var officeForm = document.getElementById('office-form');
    if (officeForm.style.display === 'block') {
        officeForm.style.display = 'none';
    } else {
        officeForm.style.display = 'block';
    }
});

// Добавление функционала для кнопки входа
document.getElementById('student-btn').addEventListener('click', function () {
    var studentBlock = document.getElementById('student');
    if (studentBlock.style.display === 'block') {
        studentBlock.style.display = 'none';
    } else {
        studentBlock.style.display = 'block';
    }
});