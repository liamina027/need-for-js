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
    speed: 3,
    traffic: 3
};

//Функция - получение количества элементов
function getQuantityElements (heightElement) {
    return document.documentElement.clientHeight / heightElement +1;
}

//Функция - начало игры 
function startGame () {
    start.classList.add('hide'); // добавление класса (скрыть блок)
    //ЦИКЛ - добавление разметки на дорогу
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';
        line.y = i*100;
        gameArea.appendChild(line); // показ линий на экране
    }
    //ЦИКЛ - создание автомобилей-соперников
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = 100 * setting.traffic * i+1;
        enemy.style.top = -enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = 'transparent url(../img/enemy.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }
    setting.start = true;
    gameArea.appendChild(car); //добавление элемента (gameArea - родитель, car - ребенок)
    setting.x = car.offsetLeft; //Добавление свойства х(координата по горизонтальной оси) в объект setting
    setting.y = car.offsetTop; // Добавление свойства y(координата по вертикальной оси) в объект setting
    requestAnimationFrame (playGame); // запуск анимации (анимация ф-ии playGame)
}

//Функция - запуск игры
function playGame () {
    if (setting.start) {
        moveRoad();
        moveEnemy();
        //Реализация передвижения автомобиля
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        car.style.left = setting.x + 'px'; //Передача стиля на страницу

        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        car.style.top = setting.y + 'px';

        requestAnimationFrame (playGame); //рекурсия - функция презапускает саму себя
    }
    
}

//Функция - начало движения
function startRun (event) {
    event.preventDefault(); //Отключение стандартного поведения браузера при нажатии на клавиши
    keys [event.key] = true;
    //console.log(event.key); //Вывод в консоль названия нажатой клавиши
}

//Функция - окончание движения
function stopRun (event) {
    event.preventDefault();
    keys [event.key] = false;
}

//Функция - движение дороги
function moveRoad () {
    let lines = document.querySelectorAll('.line'); //получение всех линий
    //перебор всех элементов (линий)
    lines.forEach (function(line) {
       line.y += setting.speed;
       line.style.top = line.y + 'px'; 

       if (line.y >= document.documentElement.clientHeight) {
           line.y = -100;
       }
    }); 
}

//Функция - передвижение соперников
function moveEnemy () {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach (function(item) {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}