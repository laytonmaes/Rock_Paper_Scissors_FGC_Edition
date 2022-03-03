playerOne = new Player("Player One")
computerPlayer = new Player("CPU")

weaponOptions = ["dragon punch", "heavy punch", "tornado kick", "fire ball", "heavy kick"]

function getRandomIndex(array) {
  return Math.floor (Math.random() * array.length)
}

function getRandomWeapon() {
  weaponOptions[getRandomIndex(weaponOptions)]
}

function playSimpleRPS() {
  playerOne.weaponSelection = getRandomWeapon();
  computerPlayer.weaponSelection = getRandomWeapon();
  evaluateSimpleRps()
}

function evaluateSimpleRps(){

}
function playComplexRPS() {

}
function dealDamage() {
  
}
