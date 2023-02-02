let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw")
const header = document.getElementById('header')
const remainingNumOfCards = document.getElementById('remaining')
const computerScoreEl = document.getElementById('computer')
const myScoreEl = document.getElementById('my-score')




async function handleClick() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    remainingNumOfCards.innerHTML = `
        <p class="remaining-cards">Remaining cards: ${data.remaining}</p>       
    `
    if(data.remaining) {
        drawCardBtn.disabled = false
    }     
}

newDeckBtn.addEventListener("click", handleClick)



drawCardBtn.addEventListener('click', async () => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
    `
    cardsContainer.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card" />
    `
    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    header.textContent = winnerText

    remainingNumOfCards.innerHTML = `
        <p class="remaining-cards">Remaining cards: ${data.remaining}</p>       
    `
    if(data.remaining === 0) {
        drawCardBtn.disabled = true
        endMessage()
    }
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
     "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if(card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.innerHTML =`Computer score: ${computerScore}`
        return "Computer wins!"
    } else if(card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.innerHTML = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
    
}

function endMessage() {
    if(computerScore > myScore) {
        header.innerHTML = 'The computer wins the game!'
    } else if(computerScore < myScore) {
        header.innerHTML = 'You win the game!!'
    } else if(computerScore === myScore) {
        header.innerHTML = "It's a tie!"
    }
    computerScoreEl.innerHTML = 'Computer Score: 0'
    myScoreEl.innerHTML = 'My Score: 0'
}



