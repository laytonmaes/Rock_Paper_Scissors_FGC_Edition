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
  evalGame();
  console.log(playerOne)
  console.log(playerComputer)
  console.log(game.winner)
  console.log(game.loser)
}

function evalGame() {
  evalGameWinner()
  evalGameLoser()
  dealDamage()
  spendSuper()
  evalHasSuper()
}

function evalGameWinner() {
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

function resetRound() {
  playerOne = new Player("Player One");
  playerComputer = new Player("CPU");
}
