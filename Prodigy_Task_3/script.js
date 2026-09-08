const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "",""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        const index = cell.getAttribute("data-index");

        // Don't allow clicking an already-filled cell
        if (board[index] !== "" || !gameActive) {
            return;
        }

        // Put X or O
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

    });

});


function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            status.textContent = `Player ${currentPlayer} Wins! 🎉`;

            gameActive = false;

            return;
        }
    }

    // Check draw
    if (!board.includes("")) {

        status.textContent = "It's a Draw! 🤝";

        gameActive = false;

        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    status.textContent = `Player ${currentPlayer}'s Turn`;

}


resetBtn.addEventListener("click", function () {

    board = ["", "", "", "", "", "", "", "",""];

    currentPlayer = "X";
    gameActive = true;

    cells.forEach(function (cell) {
        cell.textContent = "";
    });

    status.textContent = "Player X's Turn";

});