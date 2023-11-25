const header = document.querySelector('.header'); 
const buttonLog = document.querySelector('.btn-warning');
const buttonUser = document.createElement('button');
const selectCity  = document.querySelector('[name=City]');
const inputxtCity = document.querySelector('.inputNumber');
const centerMain = document.querySelector('.centerMain');
const showButton = document.querySelector('.btn-primary');
const showWeather = document.querySelector('.showWeather');
const fir = document.querySelector('.fir');
const downMain = document.querySelector('.downMain');
const inputName = document.createElement('input');
const inputPassword = document.createElement('input');
const buttonReg = document.createElement('button');
const board = document.createElement('div');
const boardUser = document.createElement('div');
const headerUser = document.createElement('div') ;
const mainUser = document.createElement('div');
const headerCard = document.createElement('div');
const buttonDel = document.createElement('button');
const footerUser = document.createElement('div');
const inputChangeName = document.createElement('input');
const inputChangePassword = document.createElement('input');
const topWC = document.querySelector('.topWC');
const tomorrowArr = document.querySelectorAll('.infoPrecent');
const NextTom = document.querySelectorAll('.infoAPrecent');
const gridMain = document.querySelector('.gridMain');
const more = document.querySelector('.more');
const searchNameCity = document.querySelector('.btn-success');


let city = localStorage.getItem('city');
let url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${city}&days=3&aqi=no&alerts=no`;
let itemNight;
let select;
let userSelect;
let isDrag = true; 
let offsetX;
let offsetY;
let localStorageCityArr = [];


citySelected(selectCity, localStorage.getItem('city'));
userButton();
fetchWeather();
locStor();
tomorrow();
gridToday();
storageCityArr();
/* startDrop();  */

buttonLog.addEventListener('click', function(){
    createBlock(board, 'board', document.body);
    board.style.left = `${document.documentElement.clientWidth/2-250}px`;
    board.style.top = `${document.documentElement.clientHeight/2-150}px`;
    createH2('h2', 'Имя пользователя', board);
    createInput(inputName, 'text', board, 'input', 'person');
    createH2('h2', 'Пароль', board);
    createInput(inputPassword, 'password', board, 'input');

    let footerBoard = document.createElement('div');
    createBlock(footerBoard, 'footerBoard', board);
    createBlock(buttonReg, 'buttonReg', footerBoard, 'Дальше');
});
buttonReg.addEventListener('click', function(){
    if((inputName.value.length <= 3) && (inputPassword.value.length >= 8)){
        alert('ошибка: неправильное имя');
    }
    if((inputName.value.length > 3) && (inputPassword.value.length < 8)){
        alert('ошибка: слишком короткий пароль');
    }
    if((inputName.value.length > 3) && (inputPassword.value.length >= 8)){
        localStorage.setItem('name', inputName.value);
        localStorage.setItem('password', inputPassword.value);
            deleteEl(board, buttonReg, inputName, buttonLog); 
            createBlock(buttonUser, 'btn', document.body, 'Пользователь')
            buttonUser.classList.add('btn-warning');
            buttonUser.classList.add('log');
    }
});
 buttonUser.addEventListener('click', function(){

    createBlock(boardUser, 'boardUser', document.body);
    boardUser.style.left = `${document.documentElement.clientWidth/2-400}px`;
    boardUser.style.top = `${document.documentElement.clientHeight/2-300}px`;
    createBlock(headerUser, 'headerUser', boardUser, 'Параметры');
    createBlock(mainUser,'mainUser', boardUser);

    for(let i = 0; i < 3; i++){
        createArrBlock('div', 'mainUserDiv' , mainUser);
    }
    let mainUserDivArr = document.querySelectorAll('.mainUserDiv');
    for(let c = 0; c <= mainUserDivArr.length; c++){
        userSelect = document.createElement('select');
            if(c == 0){
                createArrBlock('div', 'divText', mainUserDivArr[c], 'Фон');
                createBlock(userSelect, 'select', mainUserDivArr[c]);
            }
            if(c == 1){
                createArrBlock('div', 'divText', mainUserDivArr[c], 'Изменить имя:');
                createInput(inputChangeName, 'text', mainUserDivArr[c], 'inputChangeName', `${localStorage.getItem('name')}`);
            }
            if(c == 2){
                createArrBlock('div', 'divText', mainUserDivArr[c], 'Изменить пароль:');
                createInput(inputChangePassword, 'password', mainUserDivArr[c], 'inputChangeName', `${localStorage.getItem('password')}`);
            }
    }
        select = document.querySelector('.select');
        createOption('option', 'День',  select);
        createOption('option', 'Ночь',  select);
        createBlock(footerUser,'footerUser', boardUser);
        createBlock(buttonDel,'buttonDel', footerUser, 'Применить');
        itemNight = document.querySelector('.select');
        if(localStorage.getItem('background') == 'Ночь'){
            itemNight.firstChild.selected = false;
            itemNight.lastChild.selected = true;
        } 
}); 
buttonDel.addEventListener('click', function(){
   for(let i = 0; i < 2; i++){
    if(i == 0){
        for(let item of select.children){
            if(item.selected){
                localStorage.setItem(`background`, `${select.value}`);
            }
    }
    }
    if(i == 1){
        if(inputChangeName.value.length > 3 && inputChangePassword.value.length > 7){
            localStorage.removeItem('name');
            localStorage.removeItem('password');
            localStorage.setItem('name', inputChangeName.value);
            localStorage.setItem('password', inputChangePassword.value);
            inputChangeName.value = '';
            inputChangePassword.value = '';
        }
        if(inputChangeName.value.length > 3 && inputChangePassword.value.length <= 7){
            localStorage.removeItem('name');
            localStorage.setItem('name', inputChangeName.value);
            inputChangeName.value = '';
            inputChangeName.innerText = ''; 
        }
        if(inputChangeName.length < 3 && inputChangePassword.value.length > 7){
            localStorage.removeItem('password');
            localStorage.setItem('password', inputChangePassword.value);
            inputChangePassword.value = '';
            inputChangePassword.innerText = '';
        }
    }  
   }
    
    deleteEl(headerUser, mainUser, footerUser, boardUser);
    changeThemeWindow();
      
});
showButton.addEventListener('click', function(){
    for(let item of selectCity.children){
        if(item.selected){
        
            
            localStorage.setItem('city', item.value);
            city = localStorage.getItem('city');
            url =  `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${city}&days=3&aqi=no&alerts=no`;
            console.log(city);
            citySelected(selectCity, localStorage.getItem('city')); 
        }
    }
    let hourArr = document.querySelectorAll('.hour');
    let iconArr = document.querySelectorAll('.icon');
    let inMain = document.querySelectorAll('.inMain');
    fetchWeather();
    deleteArr(hourArr);
    deleteArr(iconArr);
    deleteArr(inMain);
    tomorrow();
    gridToday(); 
});
more.addEventListener('click', function(){
    more.classList.toggle('moreToggle');
});

more.addEventListener('mousedown', function(e){ 
    isDrag = true; 
    offsetX = e.pageX - parseInt(getComputedStyle(more).left); 
    offsetY = e.pageY - parseInt(getComputedStyle(more).top); 
}); 
document.addEventListener('mouseup', () => {isDrag = false}); 

document.addEventListener('mousemove', function(e){ 
    if(isDrag == true){ 
        more.style.left = `calc(${e.pageX}px - ${offsetX}px)`; 
        more.style.top = `calc(${e.pageY}px  - ${offsetY}px)`;  
    } 
});   
searchNameCity.addEventListener('click', function(){
    searchCity();
});


document.addEventListener('keyup', () => {
    if(inputxtCity == document.activeElement && event.code == "Enter"){
        searchCity();
    }
});
                                                                                                              




 

  
       
           

             


