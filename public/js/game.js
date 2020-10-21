import Phaser from 'phaser'
import { Dice } from './dice'

const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

const RATIO = MAX_WIDTH / MAX_HEIGHT;

var CUBES = 1;

function preload() {
  //this.load.setBaseURL('http://labs.phaser.io')
  this.load.image('dice', 'static/red-dice.png')
  this.load.image('dice-shadow', 'static/red-dice-shadow.png')
  this.load.image('add-button', 'static/add-button.png')

}

function create() {

  this.dices = []; 

  for (var i = 0; i < CUBES; i++) {
    this.dices[i] = new Dice({
      game: this, 
      x: this.scale.width * (i + 1) / (CUBES + 1), 
      y: this.scale.height / 2
    });
  }

  this.buttonAdd = this.add.sprite(
    this.scale.width / 2, 
    this.scale.height / 1.2, 
    'add-button'
  );

  this.buttonAdd.setScale(0.15);
  this.buttonAdd.setInteractive();
  this.buttonAdd.on('pointerdown', () => addCube(this), this);
   
  this.scale.on('resize', () => resize(this), this);
  resize(this);
}

function addCube(game) {

    CUBES++;

    game.dices[CUBES - 1] = new Dice({
      game: game, 
      x: game.scale.width * (CUBES) / (CUBES + 1), 
      y: game.scale.height / 2
    });

    resize(game);
}

function update() {
  for (var i = 0; i < CUBES; i++) {
    this.dices[i].update();
  }
}

function resize(game)
{
    var width = game.scale.width;
    var height = game.scale.height;

    game.cameras.resize(width, height);

    for (var i = 0; i < CUBES; i++) {

      game.tweens.add({
        targets: game.dices[i],
        x: game.scale.width * (i + 1) / (CUBES + 1),
        y: height / 2,
        ease: 'Power1',
        duration: 1000
      });
      
      if (CUBES * 200 > width) 
        game.tweens.add({
          targets: game.dices[i],
          scale: width / (CUBES * 200),
          ease: 'Power1',
        });
    }

    game.tweens.add({
      targets: game.buttonAdd,
      x: width / 2,
      y: height / 1.2,
      ease: 'Power1',
    });
}

const config = {
  type: Phaser.AUTO,
    backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        width: '100%',
        height: '100%'
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {  },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
}

const game = new Phaser.Game(config)