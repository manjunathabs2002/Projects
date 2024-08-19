let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game");
const msg = document.querySelector(".msg");
const msgContainer = document.querySelector(".msg-container");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.style.backgroundColor = ""; // reset background color
    });
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { //playerO
            box.style.backgroundColor = "#4B88A2"
            box.textContent = "O";
            turnO = false
        } else { //playerX
            box.style.backgroundColor = "#6B717E";
            box.textContent = "X";
            turnO = true
        }
        box.disabled = true;

        checkWinner();
    })
})

const enableBox = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
    })
}

const disableBox = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

const showWinner = (Winner) => {
    msgContainer.classList.remove("hide")
    msg.textContent = `congratulations winner is ${Winner}`
    disableBox();
}

const checkWinner = () => {
    winPatterns.forEach((pattern) => {
        let pos1val = boxes[pattern[0]].textContent;
        let pos2val = boxes[pattern[1]].textContent;
        let pos3val = boxes[pattern[2]].textContent;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    })
}


newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)