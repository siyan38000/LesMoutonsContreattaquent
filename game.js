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
backgroundColor: '#71c5cf',
//Ciel bleu
};
// Variables globales
var game = new Phaser.Game(config);
function preload () {
    // C'est là qu'on vas charger les images et les sons
    this.load.image('player','images/player.png')
}
function create () {
    // Ici on vas initialiser les variables, l'affichage ...
    player = this.physics.add.sprite(900,245,'player');

    ///////Definition des controles du joueur
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
function update () {
    // C'est la boucle principale du jeu
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
    if (player.y < 0){
        player.setVelocityY(10);
    } if (player.y > 450) {
        player.setVelocityY(-10);
    }
}