var playerOne = new Player("Player One");
var playerComputer = new Player("CPU");

var game = new Game();

var weaponOptionsComplex = ["dragonPunch", "heavyPunch", "tornadoKick", "fireBall", "heavyKick"]
var weaponOptionsSimple = ["dragonPunch", "tornadoKick", "fireBall"]

var optionSelectClassic = document.querySelector("#classic")
var optionSelectTurbo = document.querySelector("#turbo")

var buttonAttack = document.querySelector("#attackButton")
var buttonSuper = document.querySelector("#superButton")
var buttonContinue = document.querySelector("#continue")
var buttonReturn = document.querySelector("#returnToSelect")

var weaponSelectDP = document.querySelector("#dragonPunch")
var weaponSelectHP = document.querySelector("#heavyPunch")
var weaponSelectTK = document.querySelector("#tornadoKick")
var weaponSelectFB = document.querySelector("#fireBall")
var weaponSelectHK = document.querySelector("#heavyKick")

var playerOneSelectionPreview = document.querySelector("#playerOneIcon")
var playerComputerSelectionPreview = document.querySelector("#playerComputerIcon")
var playerWinnerComparitor = document.querySelector(".cross")

var healthBarPlayerOne = document.querySelector(".health-bar-player-one")
var healthBarPlayerComputer = document.querySelector(".health-bar-player-computer")

var menueGameSelect = document.querySelector("#gameSelectMenue")
var menueKo = document.querySelector("#koMenue")

var winnerAnnouncement = document.querySelector("#winnerAnnouncement")
var winnerTally = document.querySelector("#winnerTally")

optionSelectClassic.addEventListener("click", selectGameType)
optionSelectTurbo.addEventListener( "click", selectGameType)

buttonSuper.addEventListener("click", playerUseSuper)
buttonAttack.addEventListener("click", playSimpleGame)
buttonContinue.addEventListener("click", resetRound)
buttonReturn.addEventListener("click", function (){
  window.location.reload()
})

weaponSelectDP.addEventListener("click", getPlayerWeapon)
weaponSelectHP.addEventListener("click", getPlayerWeapon)
weaponSelectTK.addEventListener("click", getPlayerWeapon)
weaponSelectFB.addEventListener("click", getPlayerWeapon)
weaponSelectHK.addEventListener("click", getPlayerWeapon)

function test(){
  console.log(this)
}

function getPlayerWeapon(){
  playerOne.weapon = this.id
  console.log(playerOne.weapon)
  replacePreviewImagePlayerOne()
}

function replacePreviewImagePlayerOne() {
  playerOneSelectionPreview.src = `./assets/weapon_${playerOne.weapon}_icon.png`
}

function replacePreviewImagePlayerComputer() {
playerComputerSelectionPreview.src = `./assets/weapon_${playerComputer.weapon}_icon.png`
}

function displayGameResults() {
  if (game.winner === playerOne){
    playerOneSelectionPreview.classList.add("winner-border")
    playerOneSelectionPreview.classList.remove("trade-border")
    playerComputerSelectionPreview.classList.remove("winner-border")
    playerComputerSelectionPreview.classList.remove("trade-border")
    playerWinnerComparitor.innerText = ">"
  } else if(game.winner === playerComputer) {
    playerComputerSelectionPreview.classList.add("winner-border")
    playerComputerSelectionPreview.classList.remove("trade-border")
    playerOneSelectionPreview.classList.remove("trade-border")
    playerOneSelectionPreview.classList.remove("winner-border")
    playerWinnerComparitor.innerText = "<"
  } else {
    playerComputerSelectionPreview.classList.add("trade-border")
    playerOneSelectionPreview.classList.add("trade-border")
    playerOneSelectionPreview.classList.remove("winner-border")
    playerComputerSelectionPreview.classList.remove("winner-border")
    playerWinnerComparitor.innerText = "="
  }
}

function displayHealth(){
  var healthBarSrc = ["health_bar_0", "health_bar_20", "health_bar_40", "health_bar_60", "health_bar_80", "health_bar_full"]
  for (var i = 0; i < 6; i++) {
    if (i === playerOne.healthBar) {
      healthBarPlayerOne.src = `./assets/${healthBarSrc[i]}.png`
    }
    if (i === playerComputer.healthBar) {
      healthBarPlayerComputer.src = `./assets/${healthBarSrc[i]}.png`
    }
  }
}

function playerUseSuper(){
  activatePlayerSuper(playerOne);
}

function selectGameType() {
  game.gameType = this.id
  if (game.gameType === "classic") {
    menueGameSelect.classList.add("hidden")
     weaponSelectHP.parentNode.removeChild(weaponSelectHP);
     weaponSelectHK.parentNode.removeChild(weaponSelectHK)
  } else {
    menueGameSelect.classList.add("hidden")
  }
}

function resetRound() {
  menueKo.classList.add("hidden");
  resetRound()
}

//-----------------------game execution ----------------------------//
function getRandomIndex(array) {
  return Math.floor (Math.random() * array.length)
}

function getRandomWeapon() {
  if (game.gameType === "classic") {
    return weaponOptionsSimple[getRandomIndex(weaponOptionsSimple)]
  } else {
    return weaponOptionsComplex[getRandomIndex(weaponOptionsComplex)]
  }
}

function playSimpleGame() {
  game.selectGameType("classic")
  if (!playerOne.weapon) {
    console.log ("error");
  } else{
    playerComputer.weapon = getRandomWeapon();
    replacePreviewImagePlayerComputer();
    evalGame();
    console.log(playerOne)
    console.log(playerComputer)
    console.log(game.winner)
    console.log(game.loser)
  }
}

function evalGame() {
  evalGameWinner()
  evalGameLoser()
  dealDamage()
  displayGameResults()
  displayHealth()
  spendSuper()
  evalHasSuper()
  evalGameEnd();
}

function evalGameWinner() {
  if (playerOne.weapon === playerComputer.weapon) {
    game.winner = game.loser = 0
  } else if (playerOne.weapon === "dragonPunch" && (playerComputer.weapon === "heavyPunch" || playerComputer.weapon === "tornadoKick")) {
    game.winner = playerOne;
  } else if(playerOne.weapon === "heavyPunch" && (playerComputer.weapon === "tornadoKick" || playerComputer.weapon === "fireBall")){
    game.winner = playerOne;
  } else if (playerOne.weapon === "tornadoKick" && (playerComputer.weapon === "fireBall" || playerComputer.weapon === "heavyKick")) {
    game.winner = playerOne;
  } else if (playerOne.weapon === "fireBall" && (playerComputer.weapon === "heavyKick" || playerComputer.weapon === "dragonPunch")) {
    game.winner = playerOne;
  } else if(playerOne.weapon === "heavyKick" && (playerComputer.weapon === "dragonPunch" || playerComputer.weapon ==="heavyPunch")){
    game.winner = playerOne;
  } else {
    game.winner = playerComputer;
  }
}

function evalGameLoser() {
  if (game.winner === playerOne) {
    game.loser =playerComputer;
  } else if (game.winner === playerComputer) {
    game.loser = playerOne;
  }
}

function activatePlayerSuper(player) {
  if (player.hasSuper === true){
    player.useSuper = true;
  }
 }

function evalHasSuper(){
  if (playerOne.healthBar < 3 && playerOne.useSuper !== "spent") {
    playerOne.hasSuper = true;
  };
  if (playerComputer.healthBar < 3 && playerComputer.useSuper !== "spent") {
    playerComputer.hasSuper = true
  }
}

function spendSuper() {
  if (playerOne.useSuper === true) {
      playerOne.useSuper = "spent";
      playerOne.hasSuper = "spent";
  }
  if (playerComputer.useSuper === true) {
    playerComputer.useSuper = "spent";
    playerComputer.hasSuper = "spent";
  }
}

function evalTradeDamage() {
  damage = 2;
  if (playerOne.useSuper === true && playerComputer.useSuper === true) {
    playerOne.healthBar -= damage;
    playerComputer.healthBar -= damage;
  } else if (playerOne.useSuper === true) {
    playerComputer.healthBar -= damage;
  } else if (playerComputer.useSuper === true) {
    playerOne.healthBar-= damage;
  } else {
    damage = 1
    playerOne.healthBar -= damage;
    playerComputer.healthBar -= damage;
  }
}

function dealDamage() {
  damage = 1;
  if (game.winner.useSuper === true) {
    damage = 2;
  }
  if (game.winner) {
    game.loser.healthBar -= damage;
  } else {
    evalTradeDamage()
  }
}

function openMenueKO() {
  menueKo.classList.remove("hidden")
}

function evalGameEnd() {
  if (playerOne.healthBar <= 0 || playerComputer.healthBar <= 0) {
    displayHealth()
    if (playerOne.healthBar <= 0 && playerComputer.healthBar <= 0){
      game.Winner = "Draw"
      winnerAnnouncement.innerText = "KO DRAW! No Winner!"
    } else if (playerOne.healthBar <=0) {
      game.gameWinner ="CPU"
      game.roundsLost = game.roundsLost + 1
      winnerAnnouncement.innerText = " KO! CPU wins!"
    } else {
      game.gameWinner = "Player One"
      game.roundsWon = game.roundsWon +1
      winnerAnnouncement.innerText = "KO! Player One wins!"
    }
    winnerTally.innerText = `Player One: ${game.roundsWon} CPU: ${game.roundsLost}`
    openMenueKO()
  }
}

function resetRound() {
  menueKo.classList.add("hidden")
  playerOne = new Player("Player One");
  playerComputer = new Player("CPU");
  playerOneSelectionPreview.classList.remove("winner-border")
  playerComputerSelectionPreview.classList.remove("winner-border")
  playerOneSelectionPreview.classList.remove("trade-border")
  playerComputerSelectionPreview.classList.remove("trade-border")
  playerOneSelectionPreview.src = `./assets/weapon_empty_icon.png`
  playerComputerSelectionPreview.src = `./assets/weapon_empty_icon.png`
  displayHealth()
}
