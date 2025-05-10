// Создать div
const createDiv = document.createElement("div");
// Добавить к нему класс wrapper
createDiv.classList.add("wrapper");
// Поместить его внутрь тэга body
document.body.appendChild(createDiv);
// Создать заголовок H1 "DOM (Document Object Model)"
const header = document.createElement("h1");
header.textContent = "DOM (Document Object Model)";
// Добавить H1 перед div с классом wrapper
createDiv.before(header);
// Создать список <ul></ul>
// Добавить в него 3 элемента с текстом "один, два, три"
const ulElem = `
    <ul class="markers">
    <li class="rotate">один</li>
    <li class="rotate">два</li>
    <li class="rotate">три</li>
    </ul>
`
// Поместить список внутрь элемента с классом wrapper
createDiv.innerHTML = ulElem;

// =================================================
// Создать изображение
const img = document.createElement("img");
// Добавить следующие свойства к изображению
// 1. Добавить атрибут source
img.src = "./iksi1.png";
// 2. Добавить атрибут width со значением 240
img.width = 240;
// 3. Добавить класс super
img.classList.add("super");
// 4. Добавить свойство alt со значением "Super Man"
img.alt = "Super Man";
// Поместить изображение внутрь элемента с классом wrapper
createDiv.appendChild(img);
// Используя HTML строку, создать div с классом 'pDiv' + c 2-мя параграфами
const elemHTML = `
    <div class="pDiv" >
        <p>Параграф 1</p>
        <p>Параграф 2</p>
    </div>
`
// Поместить этот DIV до элемента <ul></ul>
const ulList = createDiv.querySelector("ul");
ulList.insertAdjacentHTML("beforebegin", elemHTML);
// Добавить для 2-го параграфа класс text
const pDiv = document.querySelector(".pDiv");
pDiv.children[1].classList.add("text");
// Удалить 1-й параграф
pDiv.firstElementChild.remove();
// Создать функцию generateAutoCard, 
// которая принимает 3 аргумента: brand, color, year
function generateAutoCard(brand, color, year) {
    const curDate = new Date();
    const years = curDate.getFullYear() - year;
    const ageText = years > 1 ? `${years} лет` : "новое";
    return `
        <div class="autoCard">
            <h2 class="text" style="font-size: 30px;">${brand} ${year}</h2>
            <p>Автомобиль ${brand} - ${year} года. Возраст авто - ${ageText}.</p>
            <p>Цвет: ${color}</p>
            <button type="button" class="battonchik">Удалить</button>
        </div>
    `;
}
// Функция должна возвращать разметку HTML:
// <div class="autoCard">
//   <h2>BRAND YEAR</h2>
//   <p>Автомобиль BRAND - YEAR года. Возраст авто - YEARS лет.</p>
// </div>

// Создать новый div с классом autos
const divAutos = document.createElement("div");
divAutos.classList.add("autos");
// Создать 3 карточки авто, используя функцию generateAutoCard
const carsList = [
    { brand: 'Tesla', year: 2015, color: 'Красный' },
    { brand: 'Lexus', year: 2016, color: 'Серебристый' },
    { brand: 'Nissan', year: 2022, color: 'Черный' },
]

// Поместить эти 3 карточки внутрь div с классом autos
const htmlAutos = carsList.map(car => generateAutoCard(car.brand, car.color, car.year)).join("");
divAutos.innerHTML = htmlAutos;
// Поместить div c классом autos на страницу DOM - до div с классом wrapper
header.after(divAutos);

// Добавить кнопку Удалить на каждую карточку авто
// Сделано 

// При клике на кнопку - удалять карточку из структуры DOM
// 1. Выбрать все кнопки
const buttons = divAutos.querySelectorAll(".battonchik");
// 2. Создать функцию удаления
function handleClick(deleteCardClick) {
    const currentButton = deleteCardClick.currentTarget;
    //currentButton.parentElement.remove();
    currentButton.closest(".autoCard").remove();
}
// 3. Использовать цикл - чтобы повесить обработчик события на каждую кнопку
buttons.forEach(button => {
    button.addEventListener("click", handleClick);
})


// Чуть-чуть отсебятины
// Добавим кнопку для создания новой карточки
const addCardButton = document.createElement("button");
addCardButton.textContent = "Добавить автомобиль";
addCardButton.classList.add("add-card-button");
divAutos.after(addCardButton); // Помещаем кнопку после заголовка

// Напишим функция для добавления новой карточки
function addNewCard() {
    const currentYear = new Date().getFullYear();

    // Через всплывающие окна получаем данные о новом автомобиле
    const brand = prompt("Введите марку автомобиля:", "");
    const year = parseInt(prompt("Введите год выпуска автомобиля:", ""));
    const color = prompt("Введите цвет автомобиля:", "");

    // Потом проверяем корректность ввода
    if (!brand || isNaN(year) || !color) {
        alert("Некорректные данные. Попробуйте снова.");
        return;
    }
    // Проверка года выпуска
    if (year < 1800 || year > currentYear) {
        alert("Некорректный год выпуска автомобиля");
        return;
    }


    // Создаём новую карточки
    const newCardHTML = generateAutoCard(brand, color, year);

    // Вставляем новую карточку в контейнер с авто
    divAutos.insertAdjacentHTML("beforeend", newCardHTML);

    // Находим добавленную карточку и добавляем обработчик на кнопку удаления
    const newButton = divAutos.lastElementChild.querySelector(".battonchik");
    newButton.addEventListener("click", handleClick);
}

// Добавляем обработчик на кнопку "Добавить автомобиль"
addCardButton.addEventListener("click", addNewCard);