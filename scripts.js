var playerOne = new Player("Player One");
var playerComputer = new Player("CPU");

var game = new Game();

var weaponOptionsComplex = ["dragon punch", "heavy punch", "tornado kick", "fire ball", "heavy kick"]
var weaponOptionsSimple = ["dragon punch", "tornado kick", "fire ball"]

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
  playerOne.weapon = getRandomWeapon();
  playerComputer.weapon = getRandomWeapon();
  evaluateGame()
  console.log(playerOne)
  console.log(playerComputer)
  console.log(game.winner)
  console.log(game.loser)
}

function evaluateGame() {
  evaluateGameWinner()
  evaluateGameLoser()
  dealDamage()
}

function evaluateGameWinner() {
  if (playerOne.weapon === playerComputer.weapon) {
    game.winner = game.loser = 0
  } else if (playerOne.weapon === "dragon punch" && (playerComputer.weapon === "heavy punch" || playerComputer.weapon === "tornado kick")) {
    game.winner = playerOne;
  } else if(playerOne.weapon === "heavy punch" && (playerComputer.weapon === "tornado kick" || playerComputer.weapon === "fire ball")){
    game.winner = playerOne;
  } else if (playerOne.weapon === "tornado kick" && (playerComputer.weapon === "fire ball" || playerComputer.weapon === "heavy kick")) {
    game.winner = playerOne;
  } else if (playerOne.weapon === "fire ball" && (playerComputer.weapon === "heavy kick" || playerComputer.weapon === "dragon punch")) {
    game.winner = playerOne;
  } else if(playerOne.weapon === "heavy kick" && (playerComputer.weapon === "dragon punch" || playerComputer.weapon ==="heavy punch")){
    game.winner = playerOne;
  } else {
    game.winner = playerComputer
  }
}

function evaluateGameLoser() {
  if (game.winner === playerOne) {
    game.loser =playerComputer;
  } else if (game.winner === playerComputer) {
    game.loser = playerOne;
  }
}

// function winnerUseSuper() {
//   if () {
//
//   }
// }

function dealDamage() {
  damage = 1
  if (game.winner) {
    game.loser.healthBar -= damage;
  } else {
    playerOne.healthBar -= damage
    playerComputer.healthBar -= damage;
  }
}
