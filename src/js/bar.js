import Phaser from 'phaser';

const SIDES = [4, 6, 8, 12, 20];

export class Bar extends Phaser.GameObjects.Container {

  constructor(config) {

    // Creating an output for a sum of dropped out numbers

    var result = config.game.add.text(
      0, 
      0, 
      'SUM: ' + 0, 
      { color: '#000', 
      fontSize: '20px',
      align: 'center',
      fontFamily: '"Courier New", Courier, monospace'
    }).setOrigin(0.5);

    // Creating buttons for N-sided dices adding

    var buttonsAdd = [];
    var tipsAdd = [];

    for (var i = 0; i < 5; ++i) {

      buttonsAdd[i] = config.game.add.sprite(
        (35 * (i - 2)), 
        0, 
        'dice-' + SIDES[i]
      );

      tipsAdd[i] = config.game.add.text(
        (35 * (i - 2)),  
        30, 
        SIDES[i], 
        { color: '#000', 
        fontSize: '15px',
        align: 'center',
        fontFamily: '"Courier New", Courier, monospace'
      }).setOrigin(0.5)

      buttonsAdd[i].setDepth(1);
      buttonsAdd[i].setScale(0.2);
      buttonsAdd[i].setInteractive();

      buttonsAdd[i].on('pointerdown', config.addCube.bind('', config.game, i), config.game);
    }

    var addWrap = config.game.add.container(-160, 0, [ ...buttonsAdd, ...tipsAdd ] ); 

    // Creating a delete button

    var buttonDelete = config.game.add.sprite(
      -25, 
      0, 
      'add-button'
    );

    buttonDelete.setDepth(1);
    buttonDelete.setScale(0.15);
    buttonDelete.setInteractive();
    buttonDelete.on('pointerdown', () => config.deleteCube(config.game), config.game);

    // Creating a button for simultaneous rolling

    var buttonRoll = config.game.add.sprite(
      25, 
      0, 
      'add-button'
    );

    buttonRoll.setDepth(1);
    buttonRoll.setScale(0.15);
    buttonRoll.setInteractive();
    buttonRoll.on('pointerdown', () => config.rollAll(config.game), config.game);

    var editWrap = config.game.add.container(120, 0, [ buttonDelete, buttonRoll ] ); 

    super(
      config.game, 
      config.x, 
      config.y, 
      [ addWrap, result, editWrap ]
    );

    this.result = result;

    config.game.add.existing(this);
  }

  updateResult(sum) {
    this.result.setText('SUM: ' + sum);
  }

  getWidth() {
    return 500;
  }
}