// Инициализация данных
const users = JSON.parse(localStorage.getItem('users')) || [];
const currentTheme = localStorage.getItem('theme') || 'light';

// Обновление стиля страницы
document.body.classList.toggle('darkTheme', currentTheme === 'dark');

// Функция для рендеринга таблицы
function renderTable() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Очистка контейнера
    if (users.length > 0) {
        if (localStorage.currentTheme == 'light') {
            const table = document.createElement('table');
            table.id = "dataTable";
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>№</th><th>Имя</th><th>Фамилия</th>';
            table.appendChild(headerRow);
            let i = 1;

            users.forEach(user => {
                const row = document.createElement('tr');
                row.id = `${i}`;
                row.innerHTML = `<td>${i}</td><td>${user.name}</td><td>${user.surname}</td>`;
                table.appendChild(row);
                ++i;
            });

            tableContainer.appendChild(table);
        } else {
            const table = document.createElement('table');
            table.id = "dataTable";
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>№</th><th>Имя</th><th>Фамилия</th>';
            table.appendChild(headerRow);
            let i = 1;

            users.forEach(user => {
                const row = document.createElement('tr');
                row.id = `${i}`;
                row.innerHTML = `<td>${i}</td><td>${user.name}</td><td>${user.surname}</td>`;
                table.appendChild(row);
                ++i;
            });

            tableContainer.appendChild(table);
        }

    }
}

// Обработчик отправки данных
document.getElementById('submitData').addEventListener('click', () => {
    const userName = document.getElementById('UserName').value.trim();
    const userSurName = document.getElementById('UserSurName').value.trim();

    if (!userName || !userSurName) {
        alert('Заполните оба поля!');
        return;
    }

    users.push({ name: userName, surname: userSurName });
    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
});

// Обработчик очистки данных
document.getElementById('clearData').addEventListener('click', () => {
    users.length = 0; // Очистка массива
    localStorage.removeItem('users');
    renderTable();
});

// Обработчик удаления строки по номеру
document.getElementById('partialClearData').addEventListener('click', () => {
    const elementNumber = parseInt(prompt("Введите номер строки для удаления:", ""), 10);
    
    if (isNaN(elementNumber) || elementNumber < 1 || elementNumber > users.length) {
        alert("Введена неверная строка или строка с таким номером не существует!");
    } else {
        users.splice(elementNumber - 1, 1);
        
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Строка:  ${elementNumber}  удалена!`);
        
        renderTable();
    }
});

// Обработчики смены темы
document.getElementById('lightMode').addEventListener('click', () => {
    document.body.classList.remove('darkTheme');
    localStorage.setItem('theme', 'light');
});

document.getElementById('darkMode').addEventListener('click', () => {
    document.body.classList.add('darkTheme');
    localStorage.setItem('theme', 'dark');
});




// Валидация:

// Каркас функций для проверки формы
let checkFields = function () {
    let errors = [];

    // Проверим поля Фамилия, Имя
    errors = errors.concat(validateStringField("surename", "Фамилия"));
    errors = errors.concat(validateStringField("name", "Имя"));

    console.log(errors);
    updateErrors(errors);

    return errors;
};

// Функция обновления ошибок
let updateErrors = function (__errors) {
    // Чистим существующие ошибки
    let errorElements = document.body.querySelectorAll(".error");
    while (errorElements.length > 0) {
        errorElements[0].remove();
        errorElements = document.body.querySelectorAll(".error");
    }

    // Добавляем новые ошибки
    __errors.forEach(function (error) {
        let errorBlock = document.createElement("div");
        errorBlock.className = "errorBlock";
        if (!document.body.querySelector("[class='errorBlock']")) {

            document.body.querySelector("[id='div1']").append(errorBlock);
        }

        let errorElement = document.createElement("p");
        errorElement.className = "error";
        errorElement.textContent = error;
        document.body.querySelector("[class='errorBlock']").append(errorElement);
    });
};

// Функция валидации формы
let validateForm = function () {
    if (checkFields().length === 0) {
        let button = document.body.querySelector("[id='submitData']");
        button.classList.add("active");
        button.disabled = false;
    } else {
        let button = document.body.querySelector("[id='submitData']");
        button.classList.remove("active");
        button.disabled = true;
    }
};

// Функция проверки строковых полей
let validateStringField = function (fieldName, humanName) {
    let errors = [];
    let field = document.body.querySelector("[name='" + fieldName + "']");

    if (field.value === '' || field.value.length < 3) {
        field.classList.add("bad");
        field.classList.remove("good");
        errors.push(
            field.value === ''
                ? "Поле " + humanName + " не заполнено"
                : "Поле " + humanName + " содержит мало символов"
        );
    } else {
        field.classList.add("good");
        field.classList.remove("bad");
    }

    return errors;
};

document.body.querySelector("[name='name']").addEventListener("keyup", validateForm);
document.body.querySelector("[name='surename']").addEventListener("keyup", validateForm);

// Инициализация при загрузке страницы
renderTable();