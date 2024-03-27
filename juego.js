class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
    console.log('Constructor GameOverScene');
  }

  preload() {
    // Carga los recursos necesarios para esta escena
  }

  create() {
    // Configura el estado inicial de esta escena
    this.add.text(0, 0, 'Game Over', { fontSize: '32px', fill: '#FFFF00' });
  }

  update() {
    // Actualiza el estado de esta escena en cada frame
  }
}


class PlayGameScene extends Phaser.Scene {
score = 0;
scoreText;
positionImages = [];
imagesToDisplay = ['feijo', 'abascal', 'diaz', 'sanchez'];
gameStarted = false; // Bandera para saber si el juego ha comenzado
countdown = 30; // Tiempo de juego en segundos
countdownText;

constructor() {
  super({ key: 'PlayGameScene' });
  console.log('Constructor PlayGameScene');

}

preload() {
  this.load.image('congreso', 'congreso.png');
  this.load.image('feijo', 'feijo.gif');
  this.load.image('abascal', 'abascal.gif');
  this.load.image('diaz', 'diaz.gif');
  this.load.image('sanchez', 'sanchez.gif');
}

create() {
  this.add.image(0, 0, 'congreso').setOrigin(0);

  this.scoreText = this.add.text(16, 16, 'Score: 0',
                            { fontSize: '32px', fill: '#FFFF00' });
  this.scoreText.setScrollFactor(0);

  this.countdownText = this.add.text(300, 16, 'Tiempo: ' + countdown,
                                { fontSize: '32px', fill: '#FFFF00' });
  //countdownText.setOrigin(1, 0);
  this.countdownText.setScrollFactor(0);
  
  this.positionImages = createPositionImages.call(this);

  style = {
    fontSize: '32px',
    fill: '#FFFF00',
    backgroundColor: '#000000',  // Agrega el color de fondo negro al estilo
    padding: {
      left: 10,
      right: 10,
      top: 5,
      bottom: 5
    }
  };
  //scoreText = this.add.text(16, 16, 'Score: 0', style);
  //countdownText = this.add.text(236, 16, 'Tiempo: ' + countdown, style);

  greenCircleTimer = this.time.addEvent({
    delay: 1000,
    callback: showNextImage,
    callbackScope: this,
    loop: true
  });
}

createPositionImages() {
  images = [];

  positions = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 400, y: 100 },
    { x: 500, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 300, y: 200 },
    { x: 400, y: 200 },
    { x: 500, y: 200 },
    { x: 100, y: 300 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    { x: 400, y: 300 },
    { x: 500, y: 300 }
    // ... (agrega las demás posiciones aquí)
  ];

  for (var i = 0; i < positions.length; i++) {
    position = positions[i];
    positionImage = this.add.image(position.x, position.y, '').setOrigin(0.5);
    positionImage.setDisplaySize(60, 60);
    positionImage.setInteractive();
    positionImage.on('pointerdown', increaseScore);
    images.push(positionImage);
  }

  return images;
}

increaseScore() {
  if (gameStarted) {
    score += 1;
    scoreText.setText('Score: ' + score);
  }
}

startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startButton.visible = false;

    // Elimina el evento de temporizador anterior
    if (greenCircleTimer) {
      greenCircleTimer.remove();
    }

    // Crea un nuevo evento de temporizador
    greenCircleTimer = this.time.addEvent({
      delay: 1000,
      callback: showNextImage,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 1000,
      repeat: countdown,
      callback: function () {
        countdown--;
        countdownText.setText('Tiempo: ' + countdown);
        if (countdown === 0) {
          endGame.call(this);
        }
      },
      callbackScope: this
    });
  }
}
endGame() {
  gameStarted = false;
  scoreText.visible = false;
  countdownText.visible = false;
  positionImages.forEach(function (positionImage) {
    positionImage.visible = false;
  });

  resultText = this.add.text(config.width / 2, config.height / 2 - 50, 'Puntuación: ' + score, {
    fontSize: '32px',
    fill: '#FFFFFF'
  }).setOrigin(0.5);

  startButton.visible = true;
  startButton.setText('Volver a jugar');
  startButton.setInteractive();
  startButton.on('pointerdown', restartGame);
}

restartGame() {
  score = 0;
  scoreText.setText('Score: 0');
  countdown = 30;
  countdownText.setText('Tiempo: ' + countdown);
  startButton.setText('Jugar');
  startButton.off('pointerdown');
  positionImages.forEach(function (positionImage) {
    positionImage.visible = true;
  });
}

showNextImage() {
  if (gameStarted) {
    positionImages.forEach(function (positionImage) {
      positionImage.setAlpha(0);
    });

    randomImage = Phaser.Math.RND.pick(imagesToDisplay);
    randomPositionImage = Phaser.Math.RND.pick(positionImages);

    randomPositionImage.setTexture(randomImage);
    randomPositionImage.setAlpha(1);
   }
}
}




// Configuración del juego
  config = {
  type: Phaser.AUTO,
  width: 611,
  height: 349,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [{
    key: 'initialScene',
    preload: preload,
    create: create,
    update: update
  },
  GameOverScene,
  PlayGameScene]
};

var game = new Phaser.Game(config);

var startButton;

function preload() {
    this.load.image('congreso', 'congreso.png');
}

function create() {
  this.add.image(0, 0, 'congreso').setOrigin(0);
  console.log('Scene created');

  // Pantalla inicial
  startButton = this.add.text(config.width / 2, config.height / 2, 'Jugar', {
    fontSize: '32px',
    fill: '#FF0000'
  }).setOrigin(0.5);
  startButton.setInteractive();

  var startGame = () => {
    // Cargo escena del juego
    console.log('PlayGameScene Scene Called');
  
    this.scene.start('PlayGameScene');
  }

  startButton.on('pointerdown', startGame);
  console.log('Start button added');
}

function update() {
  
}


