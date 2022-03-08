class Player {
  constructor(playerName){
    this.playerName = playerName;
    this.weapon = 0;
    this.healthBar =  5;
    this.hasSuper = false;
    this.useSuper = false;
    this.spentSuper = "";
    this.gameWinner = "";
    this.computerSuper = 0;
  }
  randomizeCpuSuper(){
    this.computerSuper = Math.floor(Math.random() * 3);
  }
}
