let answer = [];                                    //Генерируется в функции generateAnswer
let guessedArr=[];                                  //Генерируется в функции check
let divOut = document.querySelector('.out');        //Получаем блок вывода
let input=document.querySelector('.i-1');           //Получаем блок ввода
let button =  document.querySelector('.b-1');
generateAnswer();                                   //Генерация числа из 4х неповторяющихся случайных цифр
console.log(answer); 
let counter = 0;

function check() {
    counter++;
    let byki=0;
    let korovi=0;
    let korovi_=0;
    
    //Создается массив из строки, полученной в input
    guessedArr=Array.from(String(input.value), Number);
    // console.log(guessedArr);

    //проверка на не-число
    if (isNaN(input.value)){
        divOut.innerHTML = 'Введите число! <br>';
        return;
    //проверка на количество введенных символов
    } else if (guessedArr.length!==4) {
            divOut.innerHTML += 'Введите число из 4х цифр! <br>';
            return;
    } 
    
    //проверка на повторяемость цифр в числе
    for (let i=0; i<guessedArr.length; i++) {
        for (let k = 0; k<i; k++) {
            if (guessedArr[i]==guessedArr[k]) {
                divOut.innerHTML += 'Цифры не должны повторяться! <br>';
                return;
            }
        }
    }

    //перебор массива и вычисление количества быков и коров
    for (let i=0; i<=3;i++){
        if(guessedArr[i]===answer[i]){
            byki++;
        } 

        for (let k=0; k<=3; k++) {
            if (guessedArr[k]===answer[i]){
                    korovi_++;
            }
        }
        korovi= korovi_-byki;
    }
   
    //вывод в div резульата операции
    divOut.innerHTML += `${input.value}   Быков: ${byki}, Коров: ${korovi} <br>`;

    //в случае выигрыша выводится сообщение
    if (byki===4) {
        divOut.innerHTML += `You won in ${counter} attempts! <br>`;
        //и вызывается функция, которая создает новый div с сообщением и перегружает страницу
        again();
        button.setAttribute("disabled", "disabled");
        }
    
        document.querySelector('.i-1').value="";
        
}

button.addEventListener('click', check);
button.addEventListener('touch', check);
input.addEventListener("keypress", function(event){
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      check();
      event.preventDefault();
    //   // Trigger the button element with a click
    //   document.getElementById("myBtn").click();
    }
    
});

$('.rules-collaps').hide();
$('.rules').click(function(){
    $('.rules-collaps').slideToggle();
});




function again() {
    let divAgain = document.createElement('input');
    let mainDiv = document.querySelector('.cont2');
    mainDiv.append(divAgain);
    divAgain.type = 'button';
    divAgain.value = 'Начать игру заново';
    divAgain.setAttribute('class', "b-1");
    divAgain.addEventListener("click", reloadPage);
    // setTimeout(reloadPage, 6000);
}
    
function reloadPage() {
   location.reload();
}

function generateAnswer() {
    let num;
    
     for (let i = 0; i<= 3; i++) {
        num = Math.floor(Math.random()*10);
        if (answer.includes(num)) {
            i--;
        } else {
            answer.push(num);
        }
     }
     return answer;
}