const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-button");
let xIsNext = true;
let winner = null;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      winner = cells[a].textContent;
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return;
    }
  }
  if ([...cells].every((cell) => cell.textContent)) {
    winner = "draw";
  }
}

function handleClick(event) {
  const cell = event.target;
  if (!cell.textContent && !winner) {
    cell.textContent = xIsNext ? "X" : "O";
    xIsNext = !xIsNext;
    checkWinner();
  }

  if (winner) {
    if (winner === "draw") {
      winnerMessage.textContent = "It's a draw!";
    } else {
      winnerMessage.textContent = `${winner} wins!`;
    }
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  winnerMessage.textContent = "";
  winner = null;
  xIsNext = true;
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
