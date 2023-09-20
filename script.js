const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'green';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        message.textContent = "It's a draw!";
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.backgroundColor = 'lightgray';

        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#eee';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);