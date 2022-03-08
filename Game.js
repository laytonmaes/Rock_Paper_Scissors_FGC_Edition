class Game {
  constructor () {
    this.round = 0;
    this.winner = 0;
    this.loser = 0;
    this.roundsWon = 0;
    this.roundsLost = 0;
    this.gameType = "";
  }
  selectGameType(gameType){
    this.gameType = gameType;
  }
}
