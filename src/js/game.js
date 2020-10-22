import Phaser from 'phaser'
import { Dice } from './dice'
import { Bar } from './Bar'

const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;
const RATIO = MAX_WIDTH / MAX_HEIGHT;

const SIDES = [4, 6, 8, 12, 20];

var sum = 0;
var dicesNumber = 1;

function preload() {
  this.load.image('dice-shadow', 'static/dice-shadow.png')
  this.load.image('add-button', 'static/add-button.png')

  for (let s of SIDES)
    this.load.image(`dice-${s}`, `static/dice-${s}.png`)
}

function create() {

  // Creating an initial portion of dices

  this.dices = []; 

  for (var i = 0; i < dicesNumber; i++) {
    this.dices[i] = new Dice({
      game: this, 
      x: this.scale.width * (i + 1) / (dicesNumber + 1), 
      y: this.scale.height / 2.2,
      sides: SIDES[4], // 20-sided dice
      updateSum: updateSum
    });
  }

  // Creating a toolbar

  this.bar = new Bar({
    game: this, 
    x: this.scale.width / 2, 
    y: this.scale.height / 1.2,
    addCube: addCube,
    deleteCube: deleteCube,
    rollAll: rollAll
  });
   
  this.scale.on('resize', () => resize(this), this);
  resize(this);

}


function addCube(game, i) {

  dicesNumber++;

  game.dices[dicesNumber - 1] = new Dice({
    game: game, 
    x: game.scale.width * (dicesNumber) / (dicesNumber + 1), 
    y: game.scale.height / 2.2,
    sides: SIDES[i],
    updateSum: updateSum
  });

  resize(game);
}

function deleteCube(game) {

    if (dicesNumber == 0)
      return;

    var n = dicesNumber - 1;

    game.tweens.add({
      targets: game.dices[n],
      alpha: 0,
      duration: 100,
      onComplete: () => game.dices[n].destroy()
    });

    dicesNumber--;
    resize(game);
}

function rollAll(game) {
  for (var i = 0; i < dicesNumber; i++) {
    game.dices[i].roll();
  }
}

function updateSum(game, num_old, num_new) {
  sum -= num_old ? num_old : 0;
  sum += num_new;
  game.bar.updateResult(sum);
}

function update() {

}

function resize(game)
{
    var width = game.scale.width;
    var height = game.scale.height;

    game.cameras.resize(width, height);

    for (var i = 0; i < dicesNumber; i++) {

      game.tweens.add({
        targets: game.dices[i],
        x: width * (i + 1) / (dicesNumber + 1),
        y: height / 2.2,
        ease: 'Power1',
        duration: 1000
      });
      
      if (dicesNumber * 200 > width)
        game.tweens.add({
          targets: game.dices[i],
          scale: width / (dicesNumber * 200),
          ease: 'Power1',
        });

      else if (400 > height) 
         game.tweens.add({
          targets: game.dices[i],
          scale: height / 400,
          ease: 'Power1',
        });

      else
        game.tweens.add({
          targets: game.dices[i],
          scale: 1,
          ease: 'Power1',
        });
    }

    game.tweens.add({
      targets: game.bar,
      x: width / 2,
      y: height / 1.2,
      ease: 'Power1',
    });

    if (width < game.bar.getWidth()) {
      game.tweens.add({
        targets: game.bar.list[0],
        x: 0,
        y: -40,
        ease: 'Power1',
      });

      game.tweens.add({
        targets: game.bar.list[1],
        y: 15,
        ease: 'Power1',
      });

      game.tweens.add({
        targets: game.bar.list[2],
        x: 0 ,
        y: 50,
        scale: 0.5,
        ease: 'Power1',
      });
    }
    else {
      game.tweens.add({
        targets: game.bar.list[0],
        x: -160,
        y: 0,
        ease: 'Power1',
      });

      game.tweens.add({
        targets: game.bar.list[1],
        y: 0,
        ease: 'Power1',
      });

      game.tweens.add({
        targets: game.bar.list[2],
        x: 120 ,
        y: 0,
        scale: 1,
        ease: 'Power1',
      });
    }
}

const config = {
  type: Phaser.AUTO,
    backgroundColor: '#eee',
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