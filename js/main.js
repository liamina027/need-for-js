//Константы
const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div'); //создание элемента
      
car.classList.add('car'); //добавление класса

//Обработчики событий
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun); //Нажимание кнопки (любой) на клавиатуре
document.addEventListener('keyup', stopRun); //Отпускание кнопки

//Объект - скорость (Up/Down) и направление(left/Right)
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

//Объект - первоначальные данные игры
const setting = {
    start: false,
    score: 0,
    speed: 3
};

//Функция начало игры - добавление класса (скрыть блок) и запуск анимации (анимация ф-ии playGame)
function startGame () {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car); //добавление элемента (gameArea - родитель, car - ребенок)
    requestAnimationFrame (playGame);
};

//Функция - начало игры
function playGame () {
    console.log('Play game!');
    if (setting.start) {
        requestAnimationFrame (playGame); //рекурсия - функция презапускает саму себя
    }
    
};

//Функция - начало движения
function startRun (event) {
    event.preventDefault(); //Отключение стандартного поведения браузера при нажатии на клавиши
    keys [event.key] = true;
    //console.log(event.key); //Вывод в консоль названия нажатой клавиши
};

//Функция - окончание движения
function stopRun (event) {
    event.preventDefault();
    keys [event.key] = false;
};