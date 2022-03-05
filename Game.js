class Game {
  constructor () {
    this.round = 0;
    this.winner = 0;
    this.loser = 0;
    this.gameType = "";
  }
  selectGameType(gameType){
    this.gameType = gameType;
  }
}
