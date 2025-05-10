$(document).ready(function () {
    // Каркас функций для проверки формы
    const checkFields = function () {
        let errors = [];

        // Проверим поля Фамилия, Имя и Комментарий
        errors = errors.concat(validateStringField("surname", "Фамилия"));
        errors = errors.concat(validateStringField("name", "Имя"));
        errors = errors.concat(validateStringField("comment", "Комментарий"));

        // Проверка возраста
        errors = errors.concat(validateAgeField("age"));

        // Проверка чекбокса "Берите мои данные"
        if (!$("[name='agree']").is(":checked")) {
            errors.push("Вы должны согласиться с обработкой данных");
        }

        console.log(errors);
        updateErrors(errors);

        return errors;
    };

    // Функция обновления ошибок
    const updateErrors = function (errors) {
        // Чистим существующие ошибки
        $(".error").remove();

        // Добавляем новые ошибки
        errors.forEach(function (error) {
            if ($(".errorBlock").length === 0) {
                $("<div>", { class: "errorBlock" }).insertBefore($("[name='laba']"));
            }

            $("<p>", { class: "error", text: error }).appendTo(".errorBlock");
        });
    };

    // Функция валидации формы
    const validateForm = function () {
        if (checkFields().length === 0) {
            $("[name='buttonSubmit']")
                .addClass("active")
                .prop("disabled", false);
        } else {
            $("[name='buttonSubmit']")
                .removeClass("active")
                .prop("disabled", true);
        }
    };

    // Функция отправки формы
    const sendForm = function () {
        if (checkFields().length === 0) {
            alert("Форма отправлена!");
        }
    };

    // Функция проверки строковых полей
    const validateStringField = function (fieldName, humanName) {
        let errors = [];
        const field = $(`[name='${fieldName}']`);
        const value = field.val();

        if (!value || value.length < 3) {
            field.addClass("bad").removeClass("good");
            errors.push(
                !value
                    ? `Поле ${humanName} не заполнено`
                    : `Поле ${humanName} содержит мало символов`
            );
        } else {
            field.addClass("good").removeClass("bad");
        }

        return errors;
    };

    // Функция проверки возраста
    const validateAgeField = function (fieldName) {
        let errors = [];
        const field = $(`[name='${fieldName}']`);
        const age = parseInt(field.val(), 10);

        if (isNaN(age) || age < 18 || age > 45) {
            field.addClass("bad").removeClass("good");
            errors.push("Возраст должен быть в диапазоне от 18 до 45 лет");
        } else {
            field.addClass("good").removeClass("bad");
        }

        return errors;
    };

    // Функция для повторной валидации формы
    const revalidateForm = function () {
        const surnameClasses = $("[name='surname']").attr("class");
        if (surnameClasses.includes("good") || surnameClasses.includes("bad") || $("[name='agree']").is(":checked")) {
            validateForm();
        }
    };

    // Функция для очистки формы
    const clearForm = function () {
        ["surname", "name", "age", "comment"].forEach(function (fieldName) {
            $(`[name='${fieldName}']`).removeClass("bad good");
        });

        $(".errorBlock").remove();

        $("[name='buttonSubmit']").removeClass("active").prop("disabled", true);
    };

    // Добавляем обработчики событий
    $("[name='agree']").on("click", validateForm);

    $("[name='resButton']").on("click", clearForm);

    ["surname", "name", "age", "comment"].forEach(function (fieldName) {
        $(`[name='${fieldName}']`).on("keyup", revalidateForm);
    });

    $("[name='age']").on("change", revalidateForm);

    $("[name='buttonSubmit'").on("click", sendForm);
});