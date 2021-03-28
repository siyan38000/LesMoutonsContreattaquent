/*
Scene principale du jeu

*/
class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' }); 
    }
     preload () {
        this.load.image('player','/LesMoutonsContreattaquent/images/player.png');
        this.load.image('sheep', '/LesMoutonsContreattaquent/images/sheep.png');
        this.load.image('vie', 'images/life.png');
        this.load.image('void', 'images/void.png');
        this.load.image('attack','images/attack.png');
        this.load.image('panneau','images/ferme.png');
        this.load.image('sky', 'images/sky.jpg');
        this.load.audio('oof', 'sounds/oof.mp3');
        this.load.audio('musiccque', 'sounds/music.mp3');
        this.load.audio('beh', 'sounds/beh.mp3');
    }
    create () {
        this.playerLife = 3;
        this.score = 0;
        this.sound.play('musiccque', { volume: 0.5, loop: true });
        this.player = this.physics.add.sprite(900,245,'player');
        this.physics.add.sprite(500, 0, 'sky');
        this.physics.add.sprite(600,75, 'panneau');
        //Affichage des coeurs de vie
        this.life = this.physics.add.sprite(490,30,'vie');
        this.life2 = this.physics.add.sprite(510,30,'vie');
        this.life3 = this.physics.add.sprite(530,30,'vie');
        //Zone morte (sprite transparant derrière le joueur)
        this.deadZone = this.physics.add.sprite(900,10, 'void');
        this.mouton = this.physics.add.group();
        this.balles = this.physics.add.group();
    
        this.deadZone.setImmovable(true);
    
        ///////Definition des controles du joueur
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        //Affichage du score
        this.dispScore = this.add.text(10,10,"Score : "+this.score,{ font: "35px Arial", fill: "#000000" });
    
        this.spawnMoutons = this.time.addEvent({
            delay: 3500,
            callback: this.newMouton,
            callbackScope: this,
            loop: true,
        });
    
    }
     update () {
        if (this.playerLife > 0){
            if (Phaser.Input.Keyboard.JustDown(this.up) || Phaser.Input.Keyboard.JustDown(this.z) ) {
                this.player.setVelocityY(-100);
            }
            else if((Phaser.Input.Keyboard.JustUp(this.up) || Phaser.Input.Keyboard.JustUp(this.z) )){
                this.player.setVelocityY(0);
            }
            if (Phaser.Input.Keyboard.JustDown(this.down) || Phaser.Input.Keyboard.JustDown(this.s) ) {
                this.player.setVelocityY(100);
            }
            else if((Phaser.Input.Keyboard.JustUp(this.down) || Phaser.Input.Keyboard.JustUp(this.s) )){
               this.player.setVelocityY(0);
            }
            if (Phaser.Input.Keyboard.JustDown(this.space)){
            this.fireBullets();
            }
    
            //Afin que le joueur ne puisse pas aller jusqu'au ciel :
             if (this.player.y < 135) {
                this.player.setVelocityY(10);
            }
        }
        //Appelle de la scene GameOver lorsque le joueur n'as plus de vies
        if (this.playerLife <= 0){
            this.scene.start('GameOverScene');
        }
    
        
        //Colision entre les moutons et les balles
        this.physics.add.collider(this.mouton, this.balles, this.killMouton, null, this);
    
    
        //Colision entre mouton et zone morte (derrière le joueur)
        this.physics.add.collider(this.deadZone, this.mouton, this.oof,null, this);
        
        //MAJ du score
        this.dispScore.setText("Score : "+this.score);
    
    
    }
    
     oof(deadZone,mouton){
       this.playerLife -= 1;
    
        //Suppression de l'affichage des vies en fonction du nombre restant
        switch(this.playerLife){
            case 2:
                this.life3.disableBody(true,true);
                break;
            case 1:
                this.life2.disableBody(true,true);
                break;
            case 0:
                this.life.disableBody(true,true);
        }
        mouton.disableBody(true,true);
        this.sound.play('oof');
    }
     newMouton(){
        this.mouton = this.physics.add.group();
        //Limitation de la zone ou apparaise les moutons
        this.mouton.create(10,Math.random() * (400 - 200) + 200,'sheep'); 
        if (this.score < 150){
            this.mouton.setVelocityX(200);
        }
        else if (this.score < 300){
            this.mouton.setVelocityX(330);
        }
        else if (this.score > 299){
            this.mouton.setVelocityX(350);
        }
        this.increaseDifficulty();
    }
    fireBullets(){
        if (this.canFire){
            this.balles = this.physics.add.group();
            this.balles.create(this.player.x, this.player.y, 'attack');
            this.balles.setVelocityX(-1000);
        }
        //Espacement des coups de feux d'au moins une secondes
        //afin d'éviter de spammer la barre espace
        this.canFire = false;
        this.time.addEvent({
            delay: 1000,
            callback: this.resetCanFire,
            callbackScope: this,
            loop: false,
        });
    }
    resetCanFire(){
        this.canFire = true;
    }

    //Augmentation de difficulté en fonction du score
    increaseDifficulty(){
        if (this.score > 50){
            this.spawnMoutons.delay = 2000;
        }
        else if (this.score > 100){
            this.spawnMoutons.delay = 1000;
        }
        else if (this.score > 300){
            this.spawnMoutons.delay = 750;
        }
    }

     killMouton(bullet, mouton){
        mouton.disableBody(true, true);
        bullet.disableBody(true, true);
        this.sound.play('beh');
        this.score += 10;
    }
}
