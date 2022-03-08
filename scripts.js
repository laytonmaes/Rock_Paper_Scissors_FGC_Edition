var playerOne = new Player("Player One");
var playerComputer = new Player("CPU");

var game = new Game();

var weaponOptionsComplex = ["dragonPunch", "heavyPunch", "tornadoKick", "fireBall", "heavyKick"];
var weaponOptionsSimple = ["dragonPunch", "tornadoKick", "fireBall"];

// -------------------- Query Selector -------------------- //
var menueGameSelect = document.querySelector("#gameSelectMenue");
var menueKo = document.querySelector("#koMenue");

var optionSelectClassic = document.querySelector("#classic");
var optionSelectTurbo = document.querySelector("#turbo");

var healthBarPlayerOne = document.querySelector(".health-bar-player-one");
var healthBarPlayerComputer = document.querySelector(".health-bar-player-computer");

var buttonAttack = document.querySelector("#attackButton");
var buttonSuper = document.querySelector("#superButton");
var buttonContinue = document.querySelector("#continue");
var buttonReturn = document.querySelector("#returnToSelect");

var weaponSelectDP = document.querySelector("#dragonPunch");
var weaponSelectHP = document.querySelector("#heavyPunch");
var weaponSelectTK = document.querySelector("#tornadoKick");
var weaponSelectFB = document.querySelector("#fireBall");
var weaponSelectHK = document.querySelector("#heavyKick");

var playerOneSelectionPreview = document.querySelector("#playerOneIcon");
var playerComputerSelectionPreview = document.querySelector("#playerComputerIcon");
var playerWinnerComparitor = document.querySelector(".cross");
var diagramGameMode = document.querySelector(".rps-diagram");

var winnerAnnouncement = document.querySelector("#winnerAnnouncement");
var winnerTally = document.querySelector("#winnerTally");

// -------------------- Event Listeners -------------------- //
optionSelectClassic.addEventListener("click", selectGameType);

optionSelectTurbo.addEventListener( "click", selectGameType);

buttonAttack.addEventListener("click", function () {
  game.playSimpleGame();
});

buttonSuper.addEventListener("click", function () {
  playerOne.activatePlayerSuper();
});

buttonContinue.addEventListener("click", resetRound);

buttonReturn.addEventListener("click", function (){
  window.location.reload();
});

weaponSelectDP.addEventListener("click", getPlayerWeapon);

weaponSelectHP.addEventListener("click", getPlayerWeapon);

weaponSelectTK.addEventListener("click", getPlayerWeapon);

weaponSelectFB.addEventListener("click", getPlayerWeapon);

weaponSelectHK.addEventListener("click", getPlayerWeapon);

// -------------------- functions -------------------- //
function selectGameType() {
  game.gameType = this.id;
  if (game.gameType === "classic") {
    menueGameSelect.classList.add("hidden");
    weaponSelectHP.parentNode.removeChild(weaponSelectHP);
    weaponSelectHK.parentNode.removeChild(weaponSelectHK);
    playerComputer.randomizeCpuSuper();
    diagramGameMode.src = "./assets/rps_simple_diagram.png";
  } else {
    menueGameSelect.classList.add("hidden");
    playerComputer.randomizeCpuSuper();
  }
}

function getRandomIndex(array) {
  return Math.floor (Math.random() * array.length);
}

function getRandomWeapon() {
  if (game.gameType === "classic") {
    return weaponOptionsSimple[getRandomIndex(weaponOptionsSimple)];
  } else {
    return weaponOptionsComplex[getRandomIndex(weaponOptionsComplex)];
  }
}

function getPlayerWeapon(){
  playerOne.weapon = this.id;
  replacePreviewImagePlayerOne();
}

function replacePreviewImagePlayerOne() {
  playerOneSelectionPreview.src = `./assets/weapon_${playerOne.weapon}_icon.png`;
}

function replacePreviewImagePlayerComputer() {
playerComputerSelectionPreview.src = `./assets/weapon_${playerComputer.weapon}_icon.png`;
}

function displayGameResults() {
  if (game.winner === playerOne){
    playerOneSelectionPreview.classList.add("winner-border");
    playerOneSelectionPreview.classList.remove("trade-border");
    playerComputerSelectionPreview.classList.remove("winner-border");
    playerComputerSelectionPreview.classList.remove("trade-border");
    playerWinnerComparitor.innerText = ">";
  } else if(game.winner === playerComputer) {
    playerComputerSelectionPreview.classList.add("winner-border");
    playerComputerSelectionPreview.classList.remove("trade-border");
    playerOneSelectionPreview.classList.remove("trade-border");
    playerOneSelectionPreview.classList.remove("winner-border");
    playerWinnerComparitor.innerText = "<";
  } else {
    playerComputerSelectionPreview.classList.add("trade-border");
    playerOneSelectionPreview.classList.add("trade-border");
    playerOneSelectionPreview.classList.remove("winner-border");
    playerComputerSelectionPreview.classList.remove("winner-border");
    playerWinnerComparitor.innerText = "=";
  }
}

function displayHealth(){
  var healthBarSrc = ["health_bar_0", "health_bar_20", "health_bar_40", "health_bar_60", "health_bar_80", "health_bar_full"];
  for (var i = 0; i < 6; i++) {
    if (i === playerOne.healthBar) {
      healthBarPlayerOne.src = `./assets/${healthBarSrc[i]}.png`;
    }
    if (i === playerComputer.healthBar) {
      healthBarPlayerComputer.src = `./assets/${healthBarSrc[i]}.png`;
    }
  }
}

function evalGameEnd() {
  if (playerOne.healthBar <= 0 || playerComputer.healthBar <= 0) {
    displayHealth();
    if (playerOne.healthBar <= 0 && playerComputer.healthBar <= 0){
      game.Winner = "Draw";
      winnerAnnouncement.innerText = "KO DRAW! No Winner!";
    } else if (playerOne.healthBar <=0) {
      game.gameWinner ="CPU";
      game.roundsLost++;
      winnerAnnouncement.innerText = " KO! CPU wins!";
    } else {
      game.gameWinner = "Player One";
      game.roundsWon++;
      winnerAnnouncement.innerText = "KO! Player One wins!";
    }
    winnerTally.innerText = `Player One: ${game.roundsWon} CPU: ${game.roundsLost}`;
    openMenueKO();
  }
}

function openMenueKO() {
  menueKo.classList.remove("hidden");
}

function resetRound() {
  menueKo.classList.add("hidden");
  playerOne = new Player("Player One");
  playerComputer = new Player("CPU");
  playerOneSelectionPreview.classList.remove("winner-border");
  playerComputerSelectionPreview.classList.remove("winner-border");
  playerOneSelectionPreview.classList.remove("trade-border");
  playerComputerSelectionPreview.classList.remove("trade-border");
  playerOneSelectionPreview.src = `./assets/weapon_empty_icon.png`;
  playerComputerSelectionPreview.src = `./assets/weapon_empty_icon.png`;
  playerComputer.randomizeCpuSuper();
  displayHealth();
}
