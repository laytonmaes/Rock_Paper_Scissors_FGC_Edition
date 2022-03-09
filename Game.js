class Game {
  constructor () {
    this.round = 0;
    this.winner = 0;
    this.trade = false;
    this.loser = 0;
    this.roundsWon = 0;
    this.roundsLost = 0;
    this.gameType = "";
  }
  evalGameWinner() {
    if (playerOne.weapon === playerComputer.weapon) {
      game.trade = true;
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
  evalGameLoser() {
    if (game.winner === playerOne) {
      game.loser =playerComputer;
    } else if (game.winner === playerComputer) {
      game.loser = playerOne;
    }
  }
  evalTradeDamage() {
    var damage = 2;
    var playerOneSuper = playerOne.useSuper === true && !playerOne.spentSuper;
    var playerComputerSuper = playerComputer.useSuper === true && !playerComputer.spentSuper;

    if (playerOneSuper && playerComputerSuper) {
      playerOne.healthBar -= damage;
      playerComputer.healthBar -= damage;
    } else if (playerOneSuper) {
      playerComputer.healthBar -= damage;
    } else if (playerComputerSuper) {
      playerOne.healthBar-= damage;
    } else {
      damage = 1;
      playerOne.healthBar -= damage;
      playerComputer.healthBar -= damage;
    }
  }
  dealDamage() {
    var damage = 1;
    if (this.winner.useSuper === true && !this.winner.spentSuper) {
      damage = 2;
    }
    if (!this.winner) {
      this.evalTradeDamage();
    } else {
      game.loser.healthBar -= damage;
    }
  }
  resetWinner() {
    this.winner = 0;
    this.loser = 0;
  }
  evalSpentSupers() {
    playerOne.spendSuper();
    playerComputer.spendSuper();
    if(playerOne.spentSuper) {
      buttonSuper.disabled = true;
    }
  }
  evalGameSuper() {
    playerOne.evalHasSuper();
    playerComputer.evalHasSuper();
    if (playerOne.hasSuper === true && !playerOne.spentSuper) {
      buttonSuper.disabled = false;
    }
  }
  evalGame() {
    playerComputer.evalCpuSuper();
    this.evalGameWinner();
    this.evalGameLoser();
    this.dealDamage();
    displayGameResults();
    this.resetWinner();
    displayHealth();
    this.evalSpentSupers();
    this.evalGameSuper()
    evalGameEnd();
  }
  playSimpleGame() {
    if (!playerOne.weapon) {
      alert("error! No weapon selected");
    } else{
      playerComputer.weapon = getRandomWeapon();
      replacePreviewImagePlayerComputer();
      this.evalGame();
    }
  }
}
