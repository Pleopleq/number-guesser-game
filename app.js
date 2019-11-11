//UI ELEMENTS

const game = document.querySelector('#game'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      message   = document.querySelector('.message');
 
//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 4;

minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(event){
    if(event.target.className === 'play-again'){
        window.location.reload();
    }
})

//validate
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    } 
    //check if is the winning number
    if(guess === winningNum){
        //Winning
        gameOver(true, `${winningNum} is correct. You won!`);
    } else {
    //Minus 1 try
    guessesLeft -= 1;
    if(guessesLeft === 0){
        //game over
        gameOver(false, `Game Over. the correct number was ${winningNum}`);
    } else {
        //clear input
        guessInput.value = '';
        //Wrong number - Try Again
        setMessage(`Wrong number. You have ${guessesLeft} tries left`, 'red')
    }
   }
});


//Setting message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Checking if is game OVER
function gameOver(won, msg){
let color;
if(won === true){
    color = 'green'
} else {
    color = 'red'
}
    //set text color
    message.style.color = color;
    //set border color
    guessInput.style.borderColor = color;
    //disable inputs
    guessInput.disabled = true;
    //set message
    setMessage(msg)
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Changing the winning number
function getWinningNum(min,max){
    return Math.floor(Math.random()*(max-min+1))
}
