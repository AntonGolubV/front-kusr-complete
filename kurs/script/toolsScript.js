function createBlock(value, classL, inBlock, innerText = ''){
    value.classList.add(`${classL}`);
    value.innerText = `${innerText}`;  
    inBlock.append(value);
}
function optionSelected(value, what){
    for(let item of value.children){
        if(item.selected == `${what}`){
            localStorage('city', item.selected);
        }
    }
}
function createArrBlock(value, classL, inBlock, innerText = ''){
let el = document.createElement(`${value}`);
el.classList.add(`${classL}`);
el.innerText = `${innerText}`;  
inBlock.append(el);
}
function createImg(classImg, link, inblock){
let img = document.createElement('img');
img.classList.add(`${classImg}`);
img.src = 'https:' + link;  
inblock.append(img);
}
function createH2(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.innerText = `${innerText}`;
    inBlock.append(el);
}
function createOption(val, innerText, inBlock){
    let el = document.createElement(`${val}`);
    el.value = `${innerText}`;
    el.innerText = `${el.value}`;
    inBlock.append(el);
}
function createInput(value, typeI, inblock, classI = '', placeholderI = ''){
    value.type = `${typeI}`;
    value.placeholder = `${placeholderI}`;
    value.classList.add(`${classI}`);
    inblock.append(value);
}
function deleteEl(){
    for(let item  in arguments){
    arguments[item].remove();
    }
}
function userButton(){
    if(localStorage.getItem('password')){
        deleteEl(buttonLog); 
        createBlock(buttonUser, 'btn', document.body, 'Пользователь');
        buttonUser.classList.add('btn-warning');
        buttonUser.classList.add('log');
    }
}
function locStor(optionValue = ''){
    if(localStorage.getItem('background') == 'Ночь' || optionValue == 'Ночь'){
            fir.style.background = 'url(img/night1.jpg) no-repeat center /cover';
            downMain.style.background = 'url(img/night2.jpg) no-repeat center /cover';
        }
        if(localStorage.getItem('background') == 'День' || optionValue == 'День'){
            fir.style.background = 'url(img/leto3.jpg) no-repeat center /cover';
            downMain.style.background = 'url(img/leto1.jpg) no-repeat center /cover';
        }
}
function changeThemeWindow(){
    const getOptions = itemNight.querySelectorAll('option');
        for(let item of getOptions) {
            if(item.selected){
                locStor(item.value);
            }
        }
}
function fetchWeather(){ 
   let  error = '';
            fetch(url)
               .then(res => res.json())
               .then((res) => {
                   let weatherArr = document.getElementsByClassName('weatherCard');
                    for(let k = 0; k < weatherArr.length; k++){
                       let headerCard = document.querySelectorAll('.headerCard');
                       headerCard[k].innerText = `${res.forecast.forecastday[k].day.condition.text}`;
                       createImg('imgCard', res.forecast.forecastday[k].day.condition.icon, weatherArr[k]);
                       let tempCard = document.querySelectorAll('.temp');
                       tempCard[k].innerText =`${res.forecast.forecastday[k].day.avgtemp_c}`;
                       let dataCard = document.querySelectorAll('.data');
                       dataCard[k].innerText = `${res.forecast.forecastday[k].date}`;
                   } 
               })
                .catch((e) =>  {
                
                error = `${e}`;
                console.log(error);
                return error; 
                } 
            )    
            
            
}
function tomorrow(){
    fetch(url)
    .then(res => res.json())
    .then(res => {
        let baseWayData = res.forecast.forecastday[1].day;
        let baseWay2 = res.forecast.forecastday[2].day;
            function tomArr(bWD, arr){
                for(let i = 0; i < 9; i++){
                    if(i == 0){
                        arr[i].innerText = `${bWD.avghumidity}%`;
                    }
                    if(i == 1){
                        arr[i].innerText = `${bWD.maxwind_kph}`;
                    }
                    if(i == 2){
                        arr[i].innerText = `${bWD.maxwind_mph}`;
                    }
                    if(i == 3){
                        arr[i].innerText = `${bWD.daily_chance_of_snow}%`;
                    }
                    if(i == 4){
                        arr[i].innerText = `${bWD.daily_chance_of_rain}%`;
                    }
                    if(i == 5){
                        arr[i].innerText = `${bWD.maxtemp_c}`;
                    }
                    if(i == 6){
                        arr[i].innerText = `${bWD.mintemp_c}`;
                    }
                    if(i == 7){
                        arr[i].innerText = `${bWD.maxtemp_f}`;
                    }
                    if(i == 8){
                        arr[i].innerText = `${bWD.mintemp_f}`;
                    }
                }
            }
            tomArr(baseWayData, tomorrowArr);
            tomArr(baseWay2, NextTom);     
})
}
function gridToday(){ 
    fetch(url)
    .then(res => res.json())
    .then((res) => {
        let imgLink =  res.forecast.forecastday[0];
    
        for(let i = 0; i < 8; i++){
            createArrBlock('div', 'inMain', gridMain); 
        }
        let inMainArr = document.querySelectorAll('.inMain');
        
        createArrBlock('div', 'hour', inMainArr[0]);
            for(let k = 1; k < 9; k++){
            if(k){
                    createArrBlock('div', 'hour', inMainArr[0], `${(k-1)*3}:00`);
            }
        }
            for(let c = 0; c < 9; c++){
            if(c == 0){
                createArrBlock('div', 'hour', inMainArr[1], 'Icon');
            }
            if(c){
            createImg('icon', imgLink.hour[(c-1)*3].condition.icon, inMainArr[1]);
            }
            } 
            function hourBlock(inBlockNumber, text, link, text2){
            for(let k = 0; k < 9; k++){
                if(k == 0){
                    createArrBlock('div', 'hour', inMainArr[inBlockNumber], `${text}`);
                }
                if(k){
                    createArrBlock('div', 'hour', inMainArr[inBlockNumber], `${imgLink.hour[(k-1)*3][link]}${text2}`);
                }
            }
        }
            hourBlock(2, 'Temp', 'temp_c', 'C');
            hourBlock(3, 'Wind', 'wind_kph', 'kph');
            hourBlock(4, 'Precip', 'precip_mm','mm');
            hourBlock(5, 'Cloud', 'cloud', '%');
            hourBlock(6, 'Humidity', 'humidity', '%');
            hourBlock(7, 'Pressure', 'pressure_in', 'in');  
    })
}
function deleteArr(arr){
    for(let item of arr){
        item.remove();
    }
}
class Drop {
    constructor(numDrop) {
        this.generateRandom = function (min, max) {
            return Math.trunc(Math.random() * (max - min) + min);
        };

        this.el;
        this.timer;
        this.coordY = -150;
        this.speed = this.generateRandom(5, 10);
        this.maxHeight = document.documentElement.scrollHeight;
        this.promisFetch = function(){
            fetch(url)
            .then(res => res.json())
            .then((res) => {
                url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${localStorage.getItem('city')}&aqi=no&alerts=no`;
            })
        }
        this.createDrop = function () {
            
            let el = document.createElement('i');
            el.classList.add('bi');
            el.classList.add('bi-droplet-fill');
            el.classList.add('pos');
            el.id = `drop${numDrop}`;
            el.style.left = `${this.generateRandom(0, document.documentElement.clientWidth)}px`;
            el.style.fontSize = `${this.generateRandom(8, 50)}px`;

            document.body.append(el);
            this.el = el;
        };
        this.moveDrop = function () {
            this.el.style.top = `${this.coordY}px`;
            this.coordY += this.speed;
            if (this.coordY > this.maxHeight) {
                clearInterval(this.timer);
                this.el.remove();
            }
        };
        this.dropDroped = function () {
            this.timer = setInterval(this.moveDrop.bind(this), 50);
        };
    }
}   

let drops = [];   
let timer1;  
let timer2;   

function startDrop(){   
    let numDrop = 1;   
    timer1 = setInterval(function(){   
        drops.push(new Drop(numDrop));   
        drops[numDrop - 1].createDrop();   
        drops[numDrop - 1].dropDroped();   
        numDrop++;                                
    }, 50);   
 }
 function citySelected(arrLink, city){
    for(let item of arrLink.children){ 
        if(item.value != city){
            item.selected = false;
        }
        if(item.value == city){
            item.selected = true;
        }
    }
}
function storageCityArr(){
    for(let item of localStorageCityArr){
        console.log(localStorageCityArr[item]);
        createOption('option', localStorageCityArr[item], selectCity);
    }
}
/* function searchCity(){ */
   /*  city = inputxtCity.value;
    url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${city}&days=3&aqi=no&alerts=no`;
    let res = fetchWeather();
    console.log(res);
    
    if(res){
        alert('Ошибка: введитие город правильно!');
    } 
    if(!res){ 
        fetchWeather();
        tomorrow();
        let hourArr = document.querySelectorAll('.hour');
        let iconArr = document.querySelectorAll('.icon');
        let inMain = document.querySelectorAll('.inMain');
        deleteArr(hourArr);
        deleteArr(iconArr);
        deleteArr(inMain);
        gridToday(); 
        localStorageCityArr.push(inputxtCity.value);
        localStorage.setItem('cityArr', localStorageCityArr);
        
    } */
    function searchCity(){ 
        let res; 
        city = inputxtCity.value; 
        url = `http://api.weatherapi.com/v1/forecast.json?key=7263066957634ac7a15142941232102&q=${city}&days=3&aqi=no&alerts=no`; 
        const getSerchCity = new Promise((resolve, reject)=> { 
            resolve(fetchWeather()); 
        }) 
        
     
        getSerchCity.then(() => { 
            fetchWeather(); 
            let errProm = fetchWeather();
            console.log(errProm);
            tomorrow(); 
            let hourArr = document.querySelectorAll('.hour'); 
            let iconArr = document.querySelectorAll('.icon'); 
            let inMain = document.querySelectorAll('.inMain'); 
            deleteArr(hourArr); 
            deleteArr(iconArr); 
            deleteArr(inMain); 
            gridToday();  
            localStorageCityArr.push(inputxtCity.value); 
            localStorage.setItem('cityArr', localStorageCityArr); 
        }).catch(() => { 
            console.log('++++++++');
            alert('Ошибка: введитие город правильно!'); 
            city = localStorage.getItem('city'); 
            
                } 
        ) 
}

