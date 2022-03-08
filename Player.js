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
    this.computerSuper = Math.floor(Math.random() * 2) + 1;
  }
  evalHasSuper(){
    if (this.healthBar < 3 && !this.spentSuper) {
      this.hasSuper = true;
    }
  }
  evalCpuSuper() {
    if (this.healthBar === this.computerSuper) {
      this.activatePlayerSuper();
    }
  }
  activatePlayerSuper() {
    if (this.hasSuper === true){
      this.useSuper = true;
    }
   }
  spendSuper() {
    if (this.useSuper === true) {
      this.spentSuper = true;
    }
  }
}
