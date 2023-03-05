    var minValue;
    var maxValue;
    let gameRun = true;
    let answerNumber;
    let orderNumber;

    // Преобразования числа в текстовую форму. Число выводится в текстовой форме, если в текстовой форме меньше 20 символов, включая пробелы.
    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() { // Функция преобразования числа из цифр в слова (числа от -999 до 999).
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() { // Функция вычисления остатка от сотого числа и преобразования его в числа из цифр в слова (числа от 0 до 99) для последующего присоединения к функции numberToText() расчитывающей сотни hundreds.
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }


document.querySelector('#newGames').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer1').style.display = "none";
    document.querySelector('#collapseContainer2').style.display = "block";

})

document.querySelector('#start').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer2').style.display = "none";
    document.querySelector('#collapseContainer4').style.display = "block";

    minValue = parseInt(document.querySelector('#min').value);
    maxValue = parseInt(document.querySelector('#max').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;

    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }

    let message = document.querySelector('#message');
    message.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

document.querySelector('#go').addEventListener('click', (event) => {

    document.querySelector('#collapseContainer4').style.display = "none";
    document.querySelector('#collapseContainer3').style.display = "block";

    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;

    const orderNumberField = document.querySelector('#orderNumberField');
    const answerField = document.querySelector('#answerField');

    

    orderNumberField.innerText = orderNumber; // Вопрос № 1
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
    // Вы загадали число [__]? - Середина числового диапазона (answerNumber - подставляется середина числового диапазона в функцию numberToText() которая преобразует в текст и записывается в переменную numberWord).
})

document.querySelector('#btnRetry').addEventListener('click', (event) => {
    document.querySelector('#collapseContainer3').style.display = "none";
    document.querySelector('#collapseContainer2').style.display = "block";

    gameRun = true;
})

document.querySelector('#btnOver').addEventListener('click', (event) => {
    if (gameRun){
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                    break;

                case 1:
                    answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                    break;

                case 2:
                    answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                    break;

                case 3:
                    answerPhrase = `Не жульничайте!\n\u{1F620}`
                    break;
            }

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1; // Изменение нижней границы поискового диапазона.
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали число `
                        break;

                    case 1:
                        answerPhrase = `Наверное, это число `
                        break;

                    case 2:
                        answerPhrase = `Возможно `
                        break;

                    case 3:
                        answerPhrase = `Это число `
                        break;

                    case 4:
                        answerPhrase = `Скорее всего это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
})

document.querySelector('#btnLess').addEventListener('click', (event) => {
    if (gameRun){
        if (minValue === maxValue || minValue == answerNumber) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                    break;

                case 1:
                    answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                    break;

                case 2:
                    answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                    break;

                case 3:
                    answerPhrase = `Не жульничайте!\n\u{1F620}`
                    break;
            }

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1; // Изменение верхней границы поискового диапазона.
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
                switch (phraseRandom) {
                    case 1:
                        answerPhrase = `Наверное, это число `
                        break;

                    case 2:
                        answerPhrase = `Возможно `
                        break;

                    case 3:
                        answerPhrase = `Это число `
                        break;

                    case 4:
                        answerPhrase = `Скорее всего это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
})

document.querySelector('#btnEqual').addEventListener('click', (event) => {
    if (gameRun){
        const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Я всегда угадываю\n\u{1F60E}`
                    break;

                case 1:
                    answerPhrase = `Yes! \n\u{1F60E}`
                    break;

                case 2:
                    answerPhrase = `Отлично!\n\u{1F973}`
                    break;

                case 3:
                    answerPhrase = `Я выиграл!\n\u{1F929}`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
})