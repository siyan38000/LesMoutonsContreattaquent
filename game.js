var config = {
    width: 1000,
    height: 450,
    scene: {
        preload: preload,   
// Chargement des ressources
        create: create,     
// Initialisation des variables & objets
        update: update      
// Fonction appelée 60 fois par seconde
    },
    parent: 'game',   
// Affiche le jeu dans le div id="game"
physics: {
    default: 'arcade',
//Permet d'appliquer un set de mouvements aux objets
    arcade: {
        gravity: {
            y: 0
        },
    },
},
backgroundColor: '#1ea41c',
};

// Variables globales
var game = new Phaser.Game(config);
var mouton;
var player;
var spawnMoutons;
var playerLife = 3;
var score = 0;
var speed;


function preload () {
    this.load.image('player','/LesMoutonsContreattaquent/images/player.png');
    this.load.image('sheep', '/LesMoutonsContreattaquent/images/sheep.png');
    this.load.image('vie', 'images/life.png');
    this.load.image('void', 'images/void.png');
    this.load.image('test', 'images/black.png');
    this.load.image('attack','images/attack.png');
}
function create () {
    player = this.physics.add.sprite(900,245,'player');
    //Affichage des coeurs de vie
    life = this.physics.add.sprite(490,30,'vie');
    life2 = this.physics.add.sprite(510,30,'vie');
    life3 = this.physics.add.sprite(530,30,'vie');
    //Zone morte (sprite transparant derrière le joueur)
    deadZone = this.physics.add.sprite(900,10, 'void');
    mouton = this.physics.add.group();
    

    deadZone.setImmovable(true);

    ///////Definition des controles du joueur
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Affichage du score
    this.add.text(10,10,"Score : "+score,{ font: "35px Arial", fill: "#19de65" });

    spawnMoutons = this.time.addEvent({
        delay: 3500,
        callback: newMouton,
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

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    speed = Phaser.Math.GetSpeed(300, 1);

}
function update (time, delta) {
    if (playerLife > 0){
        if (Phaser.Input.Keyboard.JustDown(up) || Phaser.Input.Keyboard.JustDown(z) ) {
            player.setVelocityY(-100);
        }
        else if((Phaser.Input.Keyboard.JustUp(up) || Phaser.Input.Keyboard.JustUp(z) )){
            player.setVelocityY(0);
        }
        if (Phaser.Input.Keyboard.JustDown(down) || Phaser.Input.Keyboard.JustDown(s) ) {
            player.setVelocityY(100);
        }
        else if((Phaser.Input.Keyboard.JustUp(down) || Phaser.Input.Keyboard.JustUp(s) )){
            player.setVelocityY(0);
        }
        if (Phaser.Input.Keyboard.JustDown(space)){
            var bullet = bullets.get();
            if (bullet)
        {
            bullet.fire(player.x, player.y);

            lastFired = time + 50;
        }
        }
        /*else if (Phaser.Input.Keyboard.JustUp(space)){
            mousseTouchDown = false;

        }*/
        
        //this.physics.add.collider(test, mouton, oof,null,this);
        if (this.physics.col)
        if (player.y < 0){
            player.setVelocityY(10);
        } if (player.y > 450) {
            player.setVelocityY(-10);
        }
    }
    if (playerLife <= 0){
        this.scene.restart();
        //TODO : Scene de game-over
    }

    this.physics.add.collider(bullets, mouton, killMouton, null, this);

    //Colision entre mouton et zone morte (derrière le joueur)
    this.physics.add.collider(deadZone, mouton, oof,null, this);
    



}
function oof(deadZone,mouton){
    playerLife -= 1;

    //Suppression de l'affichage des vies en fonction du nombre restant
    switch(playerLife){
        case 2:
            life3.disableBody(true,true);
            break;
        case 1:
            life2.disableBody(true,true);
            break;
        case 0:
            life.disableBody(true,true);
    }
    console.log(playerLife);
    mouton.disableBody(true,true);
}
function newMouton(){
    mouton = this.physics.add.group();
    mouton.create(10,Math.random()*100+Math.random()*100,'sheep');
    mouton.setVelocityX(200);
}
function killMouton(bullets, mouton){
    mouton.disableBody(true, true);
    score += 10;
    console.log("lol");
    console.log(score);
}

