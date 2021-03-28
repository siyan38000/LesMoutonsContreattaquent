class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }
preload(){
    this.load.image('gameOver', 'images/game-over.jpg');
}
create(){
    this.physics.add.sprite(config.width/2,config.height/2,'gameOver');
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.r);
    this.add.text(config.width/2,config.width/2+35,"Score : "+this.score,{ font: "35px Arial", fill: "#FFFFFF" });
    this.add.text(config.width/2,config.width/2+45, "¨Press R to Retry",{ font: "35px Arial", fill: "#FFFFFF" });
}
update(){
    if (Phaser.Input.Keyboard.JustDown(this.r)){
        this.scene.start('MainScene');
    }
    
}


}