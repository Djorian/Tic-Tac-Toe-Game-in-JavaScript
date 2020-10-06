// После события загрузки всего DOMa, выполнить функцию 
document.addEventListener("DOMContentLoaded", () => {
    resetAndCleanValue();
    document.querySelector('#reset-and-clean-value-button').addEventListener('click', resetAndCleanValue);
});

// Условия для победы
const winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Поле для игры
let squares = Array(9).fill(null);

// Блоки для вывода количества побед крестиком, ноликом и ко-ва ничьих
let crossCounter = document.querySelector('#cross-counter');
let ticTacToeCounter = document.querySelector('#tic-tac-toe-counter');
let drawCounter = document.querySelector('#draw-counter');

// Дополнительная переменная для логики игры
let crossOrToeSelected = false;

// Счетчики побед для крестиков, ноликов и ко-ва ничьих
let crossPoint = 0;
let toePoint = 0;
let drawPoint = 0;

// Счетчик ходов
let count = 0;

// Блок для вывода сообщений об итогах игры
let resultBlock = document.querySelector('.result-block');

// Выбрать крестик для первого хода
const chooseACrossButton = document.querySelector('#choose-a-cross-button').onclick = () => {
    if (count == 0) {
        crossOrToeSelected = false;
        return count = 0;
    }
    if (count == 1 && crossOrToeSelected == true) {
        crossOrToeSelected = false;
        return count = 0;
    }
}

// Выбрать нолик для первого хода
const chooseToeButton = document.querySelector('#choose-toe-button').onclick = () => {
    if (count == 0) {
        crossOrToeSelected = true;
        return count = 1;
    }
}

// Функция определяющая кто выйграл
const isWinner = () => {

    for (let index = 0; index < winnerLine.length; index++) {

        let line = winnerLine[index];

        // Условия победы крестиков
        if (squares[line[0]] == 'X' && squares[line[1]] == 'X' && squares[line[2]] == 'X') {

            resultBlock.innerText = 'Выйграл X!';
            resultBlock.style.visibility = 'visible';
            resultBlock.classList.add("message");

            setTimeout(() => {
                resetAndCleanValue();
            }, 1500)

            crossPoint = crossPoint + 1;
            crossCounter.innerHTML = crossPoint;
            crossOrToeSelected = false;
            return true;
        }

        // Условия победы ноликов
        if (squares[line[0]] == 'O' && squares[line[1]] == 'O' && squares[line[2]] == 'O') {

            resultBlock.innerText = 'Выйграл O!';
            resultBlock.style.visibility = 'visible';
            resultBlock.classList.add("message");

            setTimeout(() => {
                resetAndCleanValue();
            }, 1500)

            toePoint = toePoint + 1;
            ticTacToeCounter.innerHTML = toePoint;
            crossOrToeSelected = false;
            return true;
        }
    }
    // Условия для ничьей
    if (count == 9 && crossOrToeSelected == false || count == 10 && crossOrToeSelected == true) {

        resultBlock.innerText = 'Ничья!';
        resultBlock.style.visibility = 'visible';
        resultBlock.classList.add("message");

        setTimeout(() => {
            resetAndCleanValue();
        }, 1500)

        drawPoint = drawPoint + 1;
        drawCounter.innerHTML = drawPoint;
        crossOrToeSelected = false;
        return false;
    }
}

// Функция сброса и очистки значений
const resetAndCleanValue = () => {

    let ticTacToeWrap = document.querySelector('.tic-tac-toe-wrap');

    ticTacToeWrap.innerHTML = '';

    for (let index = 0; index < 9; index++) {
        ticTacToeWrap.innerHTML += `<div class="tic-tac-toe-grid" onclick="crossOrToe(event)" data="${index}"></div>`;
    }

    resultBlock.innerText = '';
    resultBlock.style.visibility = 'hidden';
    resultBlock.classList.remove("message");
    squares = Array(9).fill(null);
    count = 0;
}

// Функция для определения последовательности ходов крестиком и ноликом
const crossOrToe = (event) => {

    const getDataAttribute = event.target.getAttribute('data');

    let eventTarget = event.target;

    if (squares[getDataAttribute] == null) {
        squares[getDataAttribute] = (count % 2 == 0) ? 'X' : 'O';
        count++;
        eventTarget.innerText = squares[getDataAttribute];
        isWinner();
    }
    else {
        resultBlock.innerText = 'Так нельзя делать!';
        resultBlock.style.visibility = 'visible';
        resultBlock.classList.add("error-message");
        setTimeout(() => {
            resultBlock.innerText = '';
            resultBlock.style.visibility = 'hidden';
            resultBlock.classList.remove("error-message");
        }, 1500)
    }
}