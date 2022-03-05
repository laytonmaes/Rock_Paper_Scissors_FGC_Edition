class Player {
  constructor(playerName){
    this.playerName = playerName;
    this.weapon = "";
    this.healthBar =  5;
    this.hasSuper = false;
    this.useSuper = false;
    this.roundsWon = 0;
    this.computerSuper = 0;
  }
  randomizeCpuSuper(){
    this.computerSuper = Math.floor(Math.random() * 3);
  }
}
