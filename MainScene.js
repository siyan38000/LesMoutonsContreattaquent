class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' }); 
    }
     preload () {
        this.load.image('player','/LesMoutonsContreattaquent/images/player.png');
        this.load.image('sheep', '/LesMoutonsContreattaquent/images/sheep.png');
        this.load.image('vie', 'images/life.png');
        this.load.image('void', 'images/void.png');
        this.load.image('test', 'images/black.png');
        this.load.image('attack','images/attack.png');
        
        this.load.audio('oof', 'sounds/oof.mp3');
        this.load.audio('musiccque', 'sounds/music.mp3s');
        this.load.audio('beh', 'sounds/beh.mp3');
    }
     create () {
    this.mouton;
    this.player;
    this.spawnMoutons;
    this.playerLife = 3;
    this.score = 0;
    this.speed;
    this.bullet;
    this.player = this.physics.add.sprite(900,245,'player');
    //Affichage des coeurs de vie
    this.life = this.physics.add.sprite(490,30,'vie');
    this.life2 = this.physics.add.sprite(510,30,'vie');
    this.life3 = this.physics.add.sprite(530,30,'vie');
    //Zone morte (sprite transparant derrière le joueur)
    this.deadZone = this.physics.add.sprite(900,10, 'void');
    this.mouton = this.physics.add.group();
        
        //this.sound.play('music'); 
    
        this.deadZone.setImmovable(true);
    
        ///////Definition des controles du joueur
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        //Affichage du score
        this.add.text(10,10,"Score : "+this.score,{ font: "35px Arial", fill: "#19de65" });
    
        this.spawnMoutons = this.time.addEvent({
            delay: 3500,
            callback: this.newMouton,
            callbackScope: this,
            loop: true,
        });
    
        //Balles tirées par le joueur
        var Bullet = new Phaser.Class({
    
            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'attack');
    
                this.speed = Phaser.Math.GetSpeed(400, 1);
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y - 50);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.x -= this.speed * delta;
                if (this.x < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });
    
        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });
        this.physics.add.overlap(this.bullets, this.mouton, this.killMouton, this.killMouton, this);
    
        this.speed = Phaser.Math.GetSpeed(300, 1);
    
    }
     update (time, delta) {
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
                this.bullet = this.bullets.get();
                if (this.bullet)
            {
                this.bullet.fire(this.player.x, this.player.y);
                //this.physics.add.collider(bullet, mouton, killMouton, null, this);
                this.lastFired = time + 50;
            }
            }
    
            
            if (this.physics.col)
            if (this.player.y < 0){
                this.player.setVelocityY(10);
            } if (this.player.y > 450) {
                this.player.setVelocityY(-10);
            }
        }
        if (this.playerLife <= 0){
            this.scene.start('GameOverScene');
        }
    
        
        //Colision entre les moutons et les balles
        this.physics.add.collider(this.mouton, this.bullet, this.killMouton, null, this);
    
    
        //Colision entre mouton et zone morte (derrière le joueur)
        this.physics.add.collider(this.deadZone, this.mouton, this.oof,null, this);
        
    
    
    
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
        this.mouton.create(10,Math.random()*100+Math.random()*100,'sheep');
        this.mouton.setVelocityX(200);
    }
     killMouton(bullet, mouton){
        mouton.disableBody(true, true);
        bullet.disableBody(true, true);
        this.sound.play('beh');
        this.score += 10;
    }
}
