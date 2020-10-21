import Phaser from 'phaser';

const ROLL_DURATION = 60

export class Dice extends Phaser.GameObjects.Container {
  
  constructor(config) {

    var diceImage = config.game.add.sprite(0, -20, 'dice')
    var shadow = config.game.add.sprite(0, 100, 'dice-shadow')
    var text = config.game.add.text(-12, -40, '', 
      { fontSize: '42px', fontStyle: 'bold', align: 'center'})

    super(config.game, config.x, config.y, [ shadow, diceImage, text ]);

    this.diceImage = diceImage;
    this.shadow = shadow;
    this.text = text;

    this.diceImage.setScale(0.8);
    this.shadow.setScale(0.7);

    config.game.add.existing(this);
    config.game.physics.world.enableBody(this);

    this.diceImage.setInteractive();
    this.diceImage.on('pointerdown', this.roll, this);

    this.roll = this.scene.tweens.add({
      targets: this.diceImage,
      angle: 359,
      duration: 15000,
      repeat: -1
    });

    this.wobble();
  };

  roll() {
    this.text.setText('');

    var tween = this.scene.tweens.add({
      targets: this.diceImage,
      angle: 359,
      ease: 'Sine.easeInOut',
      duration: 1000,
      onComplete: () => this.generateNumber(this)
    });
  }

  generateNumber() {
    this.roll.resetTweenData();

    this.text.setAlpha(0);
    this.text.setText(1 + Math.floor(Math.random() * Math.floor(6)));
    this.scene.tweens.add({
      targets: this.text,
      alpha: 1,
      duration: 200,
    });
  }

  wobble() {

    this.scene.tweens.add({
      targets: this.diceImage,
      y: -100,
      duration: 2000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.scene.tweens.add({
      targets: this.text,
      y: -120,
      duration: 2000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.scene.tweens.add({
      targets: this.shadow,
      scale: 0.5,
      duration: 2000,
      yoyo: true,
      repeat: -1
    });
  }
};