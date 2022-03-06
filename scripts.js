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

optionSelectClassic.addEventListener("click", test)
optionSelectTurbo.addEventListener( "click", test)

buttonSuper.addEventListener("click", test)
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
  spendSuper()
  evalHasSuper()
  evalGameEnd()
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

function evalGameEnd() {
  if (playerOne.healthBar <= 0 || playerComputer.healthBar <= 0) {
    console.log ("KO")
    resetRound()
  }
}

function resetRound() {
  playerOne = new Player("Player One");
  playerComputer = new Player("CPU");
}
