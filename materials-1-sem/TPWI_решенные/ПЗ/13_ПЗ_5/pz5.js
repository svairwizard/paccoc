function getTime() {
    let myData = new Date();

    let hourNow = myData.getHours();
    let minutesNow = myData.getMinutes();
    let secondsNow = myData.getSeconds();

    return "Сейчас " + hourNow + ":" + minutesNow + ":" + secondsNow;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mainFunction() {

    let userNameData = document.getElementById("idUserName");

    console.dir(userNameData.value);

    if (userNameData.value === "") {
        alert("Введите сообщение!!!");
    }
    else {
        let dataString = userNameData.value;

        // Создаём новый элемент в документе и вставляем в него текстовый контент (просто строка)
        let myPout = document.createElement("p");

        myPout.textContent = dataString;

        // Добаавляем плашку со временем отправления сообщения
        let myTime = document.createElement("p");
        myTime.classList.add("data");

        myTime.textContent = getTime();

        // Снова создаем элемент и в него вставляем предыдущий
        let myDivOut = document.createElement("div");
        myDivOut.classList.add("message");
        myDivOut.classList.add("out");
        myDivOut.appendChild(myTime);
        myDivOut.appendChild(myPout);

        let justDiv = document.querySelector("#mainContainer");
        justDiv.appendChild(myDivOut);


        // Генерируем ответ
        let textOtvet = ["В последнее время погода становится всё более непредсказуемой.",
            "Интересно, как быстро летит время, когда занимаешься любимым делом. ",
            "Разговоры о будущем всегда захватывающие, даже если они не имеют ясного направления",
            "Иногда стоит просто наслаждаться моментом и отвлечься от суеты.",
            "Можно отметить, что жизнь полна неожиданных поворотов, и это делает её ещё более увлекательной.",
            "Вера в то, что всё случается не просто так, иногда придаёт уверенности.",
            "В любом случае, общение - это важная часть нашей жизни, позволяющая нам расширять горизонты и делиться впечатлениями.",
            "В сердце древнего леса, где солнечные лучи пробиваются сквозь густую листву, тихо шепчут ветры старых деревьев, хранящих тайны многовековых времён.",
            "Каждый шаг по мшистой тропе напоминает о былых временах, когда мир был полон магии и загадок, а ночное небо озарялось светом волшебных звезд.",
            "Близ озера с прозрачной водой, где отражается каждый листок, природа словно оживает, наполняясь мелодиями щебетающих птиц и мягкого журчания ручья.",
            "На горизонте возникает силуэт старинного замка, окутанного легким туманом, который манит искателей приключений раскрыть его скрытые секреты.",
            "Носитесь по лугам, усыпанным сказочными цветами, и ощущайте, как каждый вдох наполняет душу неведомым вдохновением.",
            "В этом уголке мира время останавливается, и каждый момент дарит счастье, как манящий аромат свежесваренного кофе на золотой утренней ярмарке.",
            "Глубокие мысли и мечты растут, как древние корни деревьев, стремящихся познать больше о самом себе.",
            "Эх...",
            "",];

        let pOtvet = document.createElement("p");

        let countMassiv = Math.round(Math.random()) * 8 + Math.round(Math.random()) * 4 + Math.round(Math.random()) * 2 + Math.round(Math.random());
        pOtvet.textContent = textOtvet[countMassiv];

        if (pOtvet.textContent !== "") {
            await sleep(countMassiv*320);

            // Добаавляем плашку со временем прихода сообщения
            let inTime = document.createElement("p");
            inTime.classList.add("data");
    
            inTime.textContent = getTime();

            // Создаём овтвет на сообщение
            let divIn = document.createElement("div");
            divIn.classList.add("message");
            divIn.classList.add("in");
            divIn.appendChild(inTime);
            divIn.appendChild(pOtvet);

            justDiv.appendChild(divIn);
        }
    }
}

function testData() {
    let stringTimeNow = getTime();
    //console.log("Сейчас ", hourNow);
    document.querySelector("#myDivForTime").textContent = stringTimeNow;

}



setInterval(testData, 1000);