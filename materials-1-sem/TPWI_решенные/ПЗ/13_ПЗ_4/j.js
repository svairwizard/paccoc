function getVowels(str) {
    let m = str.match(/[aeiyouуеыаоэяиюё]/gi);
    return m === null ? 0 : m.length;
}

function showVowels() {
    let vowelsNode = document.getElementById("inputForText").value;
    let tmpNode;

    let result = "";
    for (let char of vowelsNode) {
        if (/[aeiyouуеыаоэяиюё]/i.test(char)) {
            result += `<b>${char}</b>`;
        } else {
            result += char;
        }
    }
    return result;
}

function changeText() {
    let text = document.getElementById("inputForText").value;
    let vowelsNode = document.getElementById("vowels");
    let vowelsCountElem = document.getElementById("result");
    
    // Выделяем гласные
    vowelsNode.innerHTML = showVowels();
    
    // Показываем количество гласных
    let vowelsCount = getVowels(text);
    vowelsCountElem.textContent = `В строке ${vowelsCount} гласных.`;
}

// Ограничиваем кол-во вводимых символов
document.getElementById("inputForText").addEventListener("input", function() {
    var maxLength = 99;
    if(this.value.length > maxLength) {
      this.value = this.value.substring(0, maxLength);
    }
  });