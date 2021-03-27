class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }
preload(){
    this.load.image('gameOver', 'images/game-over.jpg');
}
create(){
    this.physics.add.sprite(config.width/2,config.height/2,'gameOver');
}
update(){
    
}


}