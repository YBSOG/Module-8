let gameRun;
let minValue;
let maxValue;
let answerNumber;
let orderNumber;
const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

//Получаем минимальное значение
document.querySelector('#btnInputMin').addEventListener('click', function(){
    const InputMin = document.querySelector('#inputMin');
    minValue = parseInt(InputMin.value);
    minValue = parseInt(minValue.toFixed());
    !isNaN(minValue) || (minValue = -999);
    minValue = (minValue >= -999) ? minValue : -999;
    InputMin.value = '';
    document.querySelector('#minValueField').textContent = `Минимальное значение: ${minValue}`
    if (maxValue !== undefined && minValue < maxValue) { 
        document.querySelector('#btnInputMin').disabled = true;
        document.querySelector('#btnInputMax').disabled = true;
        gameStart()
    };
});

//Получаем максимальное значение
document.querySelector('#btnInputMax').addEventListener('click', function(){
    const InputMax = document.querySelector('#inputMax');
    maxValue = parseInt(InputMax.value);
    maxValue = parseInt(maxValue.toFixed());
    !isNaN(maxValue) || (maxValue = 999);
    maxValue = (maxValue <= 999) ? maxValue : 999;
    InputMax.value = '';
    document.querySelector('#maxValueField').textContent = `Максимальное значение: ${maxValue}`;
    if (minValue !== undefined && minValue < maxValue) {
        document.querySelector('#btnInputMax').disabled = true;
        document.querySelector('#btnInputMin').disabled = true;
        gameStart ()};
});

//Начало игры
function gameStart () {
    if (minValue !== undefined && maxValue !== undefined) {
        answerNumber  = Math.floor((minValue + maxValue) / 2);
        orderNumber = 1;
        gameRun = true;
        answerField.innerText = `Вы загадали число ${convertedNumberInput(answerNumber) }?`;
        orderNumberField.innerText = orderNumber;
    } else answerField.innerText = `Игра еще не началась`;
};

//Число в текст
let ones = ['', 'Один', 'Два', 'Три', 'Четыре', 'Пять', 'Шесть', 'Семь', 'Восемь', 'Девять',
            'Десять', 'Одинадцать', 'Двенадцать', 'Тринадцать', 'Четырнадцать', 'Пятнадцать',
            'Шестнадцать', 'Семнадцать', 'Восемнадцать', 'Девятнадцать'];
let tens = ['', '', 'Двадцать', 'Тридцать', 'Сорок', 'Пятьдесят', 'Шестьдесят', 'Семьдесят', 'Восемьдесят', 'Девяносто'];
let hundreds = ['', 'Сто', 'Двести', 'Триста', 'Четыреста', 'Пятьсот', 'Шестьсот', 'Семьсот', 'Восемьсот', 'Девятьсот'];

function convertNumberbers(num) {
    if (num < 0) {
        num = -num;
        return "Минус " + convertPositiveNumberbers(num);
    } else return convertPositiveNumberbers(num);
};

function convertPositiveNumberbers(num) {
    if (num > 99 && ((num % 100) < 20)) {
        return hundreds[Math.floor(num / 100)] + " " + ones[(num % 100)];
    } else if (num > 99 && ((num % 100) > 19)) {
        return hundreds[Math.floor(num / 100)] + " " + tens[Math.floor((num % 100)/10)] + " " + ones[(num % 10)];
    } else if (num > 0 && num < 20) {
        return ones[num];
    } else if (num == 0) {
        return "Ноль"
    } else {
        return tens[Math.floor(num / 10)] + " " + ones[(num % 10)];
    }
};

function convertedNumberInput(num) {
    if (convertNumberbers(num).length <= 20) {
        return convertNumberbers(num)
    } else return num
};

//Кнопка Заново
document.querySelector('#btnRetry').addEventListener('click', function () {
    document.querySelector('#minValueField').textContent = 'Введите Минимальное значение:';
    document.querySelector('#maxValueField').textContent = 'Введите Максимальное значение:';
    orderNumberField.innerText = 1;
    minValue = undefined;
    maxValue = undefined;
    document.querySelector('#btnInputMin').disabled = false;
    document.querySelector('#btnInputMax').disabled = false;
    gameStart ();
});

//Кнока больше
document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.round( Math.random() * 2);
            let answerPhrase = phraseRandom;
                switch (answerPhrase) {
                    case 0:
                        answerPhrase = `Да это легко! Ты загадал ${convertedNumberInput(answerNumber) }?`
                        break;
                    case 1:
                        answerPhrase = `Вы загадали число ${convertedNumberInput(answerNumber) }?`
                        break;
                    case 2:
                        answerPhrase = `Я думаю, Ваше число ${convertedNumberInput(answerNumber) }?`
                        break; 
                };
            answerField.innerText = answerPhrase;
        }
    }
});

//Кнопка меньше
document.querySelector('#btnLess').addEventListener('click', function () { 
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.round( Math.random() * 2);
            let answerPhrase = phraseRandom;
                switch (answerPhrase) {
                    case 0:
                        answerPhrase = `Да это легко! Ты загадал ${convertedNumberInput(answerNumber) }?`
                        break;
                    case 1:
                        answerPhrase = `Вы загадали число ${convertedNumberInput(answerNumber) }?`
                        break;
                    case 2:
                        answerPhrase = `Я думаю, Ваше число ${convertedNumberInput(answerNumber) }?`
                        break; 
                };
            answerField.innerText = answerPhrase;
        }
    }
})

//Кнопка Верно!
document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random() * 2);
        let answerPhrase = phraseRandom;
            switch (answerPhrase) {
                case 0:
                    answerPhrase = `Легкотня!`
                    break;
                case 1:
                    answerPhrase = `Это было просто!`
                    break;
                case 2:
                    answerPhrase = `Моя интуиция меня никогда не подводит!`
                    break; 
            };
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
})