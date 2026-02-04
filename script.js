const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const resetBtn = document.getElementById('reset');

let moves = 0;
let flippedCards = [];
let lockBoard = false;

// 4 cặp thẻ (8 thẻ)
const cardsArray = ['🍎','🍌','🍇','🍓','🍎','🍌','🍇','🍓'];

// Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Render thẻ
function createBoard() {
  gameBoard.innerHTML = '';
  moves = 0;
  movesDisplay.textContent = moves;
  flippedCards = [];
  lockBoard = false;

  const shuffled = shuffle([...cardsArray]);
  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${symbol}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, symbol));
    gameBoard.appendChild(card);
  });
}

// Flip logic
function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push({card, symbol});

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

// Check match
function checkMatch() {
  const [first, second] = flippedCards;
  if (first.symbol === second.symbol) {
    flippedCards = [];
    if (document.querySelectorAll('.flipped').length === cardsArray.length) {
      setTimeout(() => alert(`Bạn thắng sau ${moves} lượt!`), 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      first.card.classList.remove('flipped');
      second.card.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// Reset game
resetBtn.addEventListener('click', createBoard);

// Khởi tạo
createBoard();
