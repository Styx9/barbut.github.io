var dice_images = [
  "images/one.png",
  "images/two.png",
  "images/three.png",
  "images/four.png",
  "images/five.png",
  "images/six.png",
];
var dice_values = [1, 2, 3, 4, 5, 6];
const btnRoll = document.getElementById("btn-roll");
const dices = document.querySelectorAll(".die img");
function rabdomizeDice() {
  dices.forEach((die) => {
    const randomIndex = Math.floor(Math.random() * dice_images.length);
    die.src = dice_images[randomIndex];
  });
}
function bet() {
  let bet1 = prompt("Please enter your bet for player 1:", "20");
  let bet2 = prompt("Please enter your bet for player 2:", "20");
  if (bet1 && bet2) {
    const bet1Elem = document.querySelector(".bet1");
    const bet2Elem = document.querySelector(".bet2");
    bet1Elem.textContent = bet1;
    bet2Elem.textContent = bet2;
  }
}
setTimeout(bet, 100);
btnRoll.addEventListener("click", () => {
  const interval = setInterval(() => {
    rabdomizeDice();
  }, 50);
  setTimeout(() => {
    clearInterval(interval);
    let final_values = [];
    dices.forEach((die) => {
      // Get just the filename from the src
      const filename = die.src.split("/").pop();
      const idx = dice_images
        .map((img) => img.split("/").pop())
        .indexOf(filename);
      final_values.push(dice_values[idx]);
    });
    const score1Elem = document.querySelector(".score1");
    const score2Elem = document.querySelector(".score2");
    score1Elem.textContent = final_values[0] + final_values[1];
    score2Elem.textContent = final_values[2] + final_values[3];
    const money1Elem = document.querySelector(".money1");
    const money2Elem = document.querySelector(".money2");
    if (final_values[0] + final_values[1] > final_values[2] + final_values[3]) {
      money1Elem.textContent =
        parseInt(money1Elem.textContent) +
        parseInt(document.querySelector(".bet1").textContent);
      money2Elem.textContent =
        parseInt(money2Elem.textContent) -
        parseInt(document.querySelector(".bet2").textContent);
    } else if (
      final_values[0] + final_values[1] <
      final_values[2] + final_values[3]
    ) {
      money2Elem.textContent =
        parseInt(money2Elem.textContent) +
        parseInt(document.querySelector(".bet2").textContent);
      money1Elem.textContent =
        parseInt(money1Elem.textContent) -
        parseInt(document.querySelector(".bet1").textContent);
    }
    if (parseInt(money2Elem.textContent) < 0) {
      resultElem = document.querySelector(".title");
      resultElem.textContent = "Player 1 has no money left! Player2 wins!";
      btnRoll.disabled = true;
    } else if (parseInt(money2Elem.textContent) < 0) {
      resultElem = document.querySelector(".title");
      resultElem.textContent = "Player 2 has no money left! Player1 wins!";
      btnRoll.disabled = true;
    } else setTimeout(bet, 100);
  }, 1000);
});

