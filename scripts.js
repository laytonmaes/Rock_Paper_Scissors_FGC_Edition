var playerOne = new Player("Player One");
var playerComputer = new Player("CPU");

var game = new Game();

var weaponOptionsComplex = ["dragonPunch", "heavyPunch", "tornadoKick", "fireBall", "heavyKick"]
var weaponOptionsSimple = ["dragonPunch", "tornadoKick", "fireBall"]

var optionSelectClassic = document.querySelector("#classic")
var optionSelectTurbo = document.querySelector("#turbo")

var buttonAttack = document.querySelector("#attackButton")
var buttonSuper = document.querySelector("#superButton")

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

optionSelectClassic.addEventListener("click", test)
optionSelectTurbo.addEventListener( "click", test)

buttonSuper.addEventListener("click", playerUseSuper)
buttonAttack.addEventListener("click", playSimpleGame)

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

//-----------------------game execution ----------------------------//
function getRandomIndex(array) {
  return Math.floor (Math.random() * array.length)
}

function getRandomWeapon() {
  if (game.gameType === "simple") {
    return weaponOptionsSimple[getRandomIndex(weaponOptionsSimple)]
  } else {
    return weaponOptionsComplex[getRandomIndex(weaponOptionsComplex)]
  }
}

function playSimpleGame() {
  game.selectGameType("simple")
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
  timeout= setTimeout(evalGameEnd, 5000)
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

function alertKO() {
      alert("KO")
}

function evalGameEnd() {
  if (playerOne.healthBar <= 0 || playerComputer.healthBar <= 0) {
    displayHealth()
    timeoutKO= setTimeout(alertKO, 1000)
    timeoutReset= setTimeout(resetRound, 3000)

  }
}

function resetRound() {
  playerOne = new Player("Player One");
  playerComputer = new Player("CPU");
  displayHealth()
}
