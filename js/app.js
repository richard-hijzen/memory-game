
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

//moves
let moves = 0;
let counter = document.querySelector(".moves");
//stars
const stars = document.querySelectorAll(".fa-star");
//stars list
let starsList = document.querySelectorAll(".stars li");
//close icon in modal
let closeicon = document.querySelector(".close");
//first pop-up
let modal1 = document.getElementById("begin")
//finished game popup modal
let modal = document.getElementById("final")

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const deck = document.querySelector(".deck");

document.body.onload = beginning();
 
//begin pop-up model
function beginning(){
    modal1.classList.add("show");
};

//to close begin modal
function startPlaying(){
    modal1.classList.remove("show");
    startTimer();
    startGame();
}

function startGame(){
   let shuffledCards = shuffle(cards);
   for (let i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
   }
}
//end of shuffel cards function

//opening the card
let showCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
  }

//matching the cards
let openedCards = [];
let matchedCard = document.getElementsByClassName("match");

function openCard() {
    openedCards.push(this);

    let len = openedCards.length;

    if (len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        }
        else {
            unmatched();
        }
    }
};  

function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },800);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
//end of matching cards

//counting moves
function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
    //star rating
    if (moves > 9 && moves < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 14){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    //end of star rating
}
//end of counting moves

//timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//end timer

//reset game
function resetTimer() {
    second = 0;
    minute = 0; 
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function resetStars() {
    moves = 0;
    counter.innerHTML = moves;
   for (var i= 0; i < stars.length; i++){
       stars[i].style.visibility = "visible";
   }
}

let restart = document.querySelector(".restart");
restart.addEventListener("click", resetTimer);
restart.addEventListener("click", resetStars);
restart.addEventListener("click", startGame);
restart.addEventListener("click", startTimer);
//end reset game



//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        //show congratulations modal
        modal.classList.add("show");
        //declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;
        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        //closeicon on modal
        
    };
}

//to close congrats modal
function closeModal(){
    modal.classList.remove("show");
}

//for player to play Again 
function playAgain(){
    modal.classList.remove("show");
    resetTimer();
    resetStars();
    startPlaying();
}

for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click", congratulations);
};


