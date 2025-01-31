// Switch between games
function showGame(game) {
    const games = ['blackjack', 'ticTacToe'];
    games.forEach(function(g) {
        document.getElementById(g).style.display = 'none';
    });
    document.getElementById(game).style.display = 'block';
}

// Blackjack Game Logic

let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];

const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const restartButton = document.getElementById('restart-button');
const playerCardsDisplay = document.getElementById('player-cards');
const dealerCardsDisplay = document.getElementById('dealer-cards');
const playerScoreDisplay = document.getElementById('player-score');
const dealerScoreDisplay = document.getElementById('dealer-score');
const resultDisplay = document.getElementById('result');

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard() {
    return deck.pop();
}

function getCardValue(card) {
    if (card.value === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card.value)) return 10;
    return parseInt(card.value);
}

function updateScores() {
    playerScore = playerCards.reduce((sum, card) => sum + getCardValue(card), 0);
    dealerScore = dealerCards.reduce((sum, card) => sum + getCardValue(card), 0);
}

function displayCards() {
    playerCardsDisplay.innerText = playerCards.map(card => `${card.value} of ${card.suit}`).join(', ');
    dealerCardsDisplay.innerText = dealerCards.map(card => `${card.value} of ${card.suit}`).join(', ');
    playerScoreDisplay.innerText = playerScore;
    dealerScoreDisplay.innerText = dealerScore;
}

function checkForWinner() {
    if (playerScore > 21) {
        resultDisplay.innerText = "You bust! Dealer wins!";
        disableGame();
    } else if (dealerScore > 21) {
        resultDisplay.innerText = "Dealer busts! You win!";
        disableGame();
    } else if (playerScore === 21) {
        resultDisplay.innerText = "Blackjack! You win!";
        disableGame();
    }
}

function disableGame() {
    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.style.display = 'inline-block';
}

hitButton.addEventListener('click', () => {
    playerCards.push(dealCard());
    updateScores();
    displayCards();
    checkForWinner();
});

standButton.addEventListener('click', () => {
    while (dealerScore < 17) {
        dealerCards.push(dealCard());
        updateScores();
        displayCards();
    }
    if (dealerScore > 21 || playerScore > dealerScore) {
        resultDisplay.innerText = "You win!";
    } else if (dealerScore === playerScore) {
        resultDisplay.innerText = "It's a tie!";
    } else {
        resultDisplay.innerText = "Dealer wins!";
    }
    disableGame();
});

restartButton.addEventListener('click', () => {
    playerCards = [];
    dealerCards = [];
    createDeck();
    playerCards.push(dealCard(), dealCard());
    dealerCards.push(dealCard(), dealCard());
    updateScores();
    displayCards();
    resultDisplay.innerText = '';
    hitButton.disabled = false;
    standButton.disabled = false;
    restartButton.style.display = 'none';
});

// Tic-Tac-Toe Game Logic
let ticTacToeBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';

function makeMove(row, col) {
    if (ticTacToeBoard[row][col] === '') {
        ticTacToeBoard[row][col] = currentPlayer;
        document.querySelector(`#ticTacToe-board .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`).innerText = currentPlayer;
        if (checkTicTacToeWinner()) {
            document.getElementById('ticTacToe-result').innerText = `${currentPlayer} wins!`;
            disableTicTacToe();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkTicTacToeWinner() {
    // Check rows, columns, diagonals
    for (let i = 0; i < 3; i++) {
        if (ticTacToeBoard[i][0] !== '' && ticTacToeBoard[i][0] === ticTacToeBoard[i][1] && ticTacToeBoard[i][1] === ticTacToeBoard[i][2]) return true;
        if (ticTacToeBoard[0][i] !== '' && ticTacToeBoard[0][i] === ticTacToeBoard[1][i] && ticTacToeBoard[1][i] === ticTacToeBoard[2][i]) return true;
    }
    if (ticTacToeBoard[0][0] !== '' && ticTacToeBoard[0][0] === ticTacToeBoard[1][1] && ticTacToeBoard[1][1] === ticTacToeBoard[2][2]) return true;
    if (ticTacToeBoard[0][2] !== '' && ticTacToeBoard[0][2] === ticTacToeBoard[1][1] && ticTacToeBoard[1][1] === ticTacToeBoard[2][0]) return true;
    return false;
}

function disableTicTacToe() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

document.getElementById('restart-ticTacToe').addEventListener('click', () => {
    ticTacToeBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.disabled = false;
    });
    document.getElementById('ticTacToe-result').innerText = '';
});
