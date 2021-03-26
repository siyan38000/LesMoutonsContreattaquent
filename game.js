var config = {
    width: 1000,
    height: 450,
    parent: 'game',  
    scene: [
        MainScene,
        GameOverScene
      ], 
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


