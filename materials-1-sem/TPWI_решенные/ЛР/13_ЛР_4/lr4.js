console.log(document.body.querySelectorAll("[name='age']"));

// Каркас функций для проверки формы
let checkFields = function () {
    let errors = [];

    // Проверим поля Фамилия, Имя и Комментарий
    errors = errors.concat(validateStringField("surname", "Фамилия"));
    errors = errors.concat(validateStringField("name", "Имя"));
    errors = errors.concat(validateStringField("comment", "Комментарий"));

    // Проверка возраста
    errors = errors.concat(validateAgeField("age"));

    // Проверка чекбокса "Берите мои данные"
    if (!document.body.querySelector("[name='agree']").checked) {
        errors.push("Вы должны согласиться с обработкой данных");
    }

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

            document.body.querySelector("[name='laba']").before(errorBlock);
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
        let button = document.body.querySelector("[name='buttonSubmit']");
        button.classList.add("active");
        button.disabled = false;
    } else {
        let button = document.body.querySelector("[name='buttonSubmit']");
        button.classList.remove("active");
        button.disabled = true;
    }
};

// Функция отправки формы
let sendForm = function () {
    if (checkFields().length === 0) {
        alert("Форма отправлена!");
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

// Функция проверки возраста
let validateAgeField = function (fieldName) {
    let errors = [];
    let field = document.body.querySelector("[name='" + fieldName + "']");
    let age = parseInt(field.value);

    if (isNaN(age) || age < 18 || age > 45) {
        field.classList.add("bad");
        field.classList.remove("good");
        errors.push("Возраст должен быть в диапазоне от 18 до 45 лет");
    } else {
        field.classList.add("good");
        field.classList.remove("bad");
    }

    return errors;
};

// Добавляем обработчики событий
document.body.querySelector("[name='agree']").addEventListener("click", validateForm);


let revalidateForm = function () {
    let surnameClasses = document.body.querySelector("[name='surname']").classList;

    if (
        surnameClasses.contains("good") ||
        surnameClasses.contains("bad") ||
        document.body.querySelector("[name='agree']").checked
    ) {
        validateForm();
    }
};

let clearForm = function () {
    document.body.querySelector("[name='surname']").classList.remove("bad");
    document.body.querySelector("[name='surname']").classList.remove("good");

    document.body.querySelector("[name='name']").classList.remove("bad");
    document.body.querySelector("[name='name']").classList.remove("good");

    document.body.querySelector("[name='age']").classList.remove("bad");
    document.body.querySelector("[name='age']").classList.remove("good");

    document.body.querySelector("[name='comment']").classList.remove("bad");
    document.body.querySelector("[name='comment']").classList.remove("good");

    if (document.body.querySelector("[class='errorBlock']")) document.body.querySelector("[class='errorBlock']").remove();

    let button = document.body.querySelector("[name='buttonSubmit']");
    button.classList.remove("active");
    button.disabled = true;
}
// Удаляем у всех классы bad и good и очищаем теги с выводом ошибок
document.body.querySelector("[name='resButton']").addEventListener("click", clearForm);

["surname", "name", "age", "comment"].forEach(function (fieldName) {
    document.body.querySelector("[name='" + fieldName + "']").addEventListener("keyup", revalidateForm);
});

document.body.querySelector("[name='age']").addEventListener("change", revalidateForm);