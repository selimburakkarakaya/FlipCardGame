const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 100;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

// geri sayım
function initTimer(){
    if (timeLeft <= 0){
        return clearInterval(timer)
    }
    timeLeft --;
    timeTag.innerText = timeLeft;
}

// kart seçme ve oyunun başlaması
function flipCard({target: clickedCard}){
    // eğer oyun başladıysa
    if (!isPlaying){
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    //  belirtilen süre içerisinde seçilen kartların eşleşme sorgusu 
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0){
        flips ++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneIcon = cardOne.querySelector(".back-view i").classList.value;
        let cardTwoIcon = cardTwo.querySelector(".back-view i").classList.value;
        matchCards(cardOneIcon, cardTwoIcon);
    }
}

// eşleştirme fonksiyonu
function matchCards(icon1, icon2){
    // eşleşiyorsa
    if (icon1 === icon2){
        matchedCards ++;
        // eşleştirmelerin hepsi doğruysa ve süre bitmemişse
        if (matchedCards == 8 && timeLeft > 0){
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // doğru eşleştirme
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // yanlış eşleştirme
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

// kartların karıştırılması
function shuffleCards(){
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = ["bi-tiktok", "bi-facebook", "bi-twitter", "bi-instagram", "bi-youtube", "bi-reddit", "bi-pinterest", "bi-twitch", "bi-tiktok", "bi-facebook", "bi-twitter", "bi-instagram", "bi-youtube", "bi-reddit", "bi-pinterest", "bi-twitch"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) =>{
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() =>{
            iconTag.classList.value = `bi ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

// oyun her başladığında veya refresh butonu kullanıldığında bu fonksiyon çağırılarak kartların konumlarının rastgele olması için 
shuffleCards(); 

refreshBtn.addEventListener("click", shuffleCards);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

