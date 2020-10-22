import Phaser from 'phaser';

export class Dice extends Phaser.GameObjects.Container {
  
  constructor(config) {

    var diceImage = config.game.add.sprite(0, -20, 'dice-' + config.sides)
    var shadow = config.game.add.sprite(0, 100, 'dice-shadow')
    var text = config.game.add.text(0, -20, '', 
      { fontSize: '42px', fontStyle: 'bold', align: 'center'}).setOrigin(0.5);

    super(config.game, config.x, config.y, [ shadow, diceImage, text ]);

    this.diceImage = diceImage;
    this.shadow = shadow;
    this.text = text;

    this.updateSum = config.updateSum;
    this.sides = config.sides;
    this.number = undefined;

    this.diceImage.setScale(0.9);
    this.shadow.setScale(0.7);

    this.diceImage.setInteractive();
    this.diceImage.on('pointerdown', this.roll, this);

    this.rotateTween = this.scene.tweens.add({
      targets: this.diceImage,
      angle: 359,
      duration: 15000,
      repeat: -1
    });

    this.rollTween = undefined;

    this.wobble();

    config.game.add.existing(this);
    //config.game.physics.world.enableBody(this);
  };

  roll() {
    this.text.setText('');

    if (this.rollTween && this.rollTween.isPlaying())
      this.rollTween.stop();

    this.rollTween = this.scene.tweens.add({
      targets: this.diceImage,
      angle: 359,
      ease: 'Sine.easeInOut',
      duration: 1000,
      onComplete: () => this.generateNumber(this)
    });
  }

  generateNumber() {
    this.rotateTween.resetTweenData();

    var new_number = 1 + Math.floor(Math.random() * Math.floor(this.sides));
    this.updateSum(this.scene, this.number, new_number);
    this.number = new_number;
    this.text.setText(this.number);
    this.text.setAlpha(0);


    this.scene.tweens.add({
      targets: this.text,
      alpha: 1,
      duration: 200,
    });
  }

  wobble() {

    this.scene.tweens.add({
      targets: [ this.diceImage, this.text ],
      y: -100,
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

  destroy() {

    this.updateSum(this.scene, this.number, 0);

    if (this.rollTween && this.rollTween.isPlaying())
      this.rollTween.stop();

    super.destroy();
  }
};