// Configuración del juego
var config = {
  type: Phaser.AUTO,
  width: 611,
  height: 349,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var score = 0;
var scoreText;
var positionImages = [];
var imagesToDisplay = ['feijo', 'abascal', 'diaz', 'sanchez'];
var gameStarted = false; // Bandera para saber si el juego ha comenzado
var countdown = 30; // Tiempo de juego en segundos
var countdownText;
var startButton;

function preload() {
  this.load.image('congreso', 'congreso.png');
  this.load.image('feijo', 'feijo.gif');
  this.load.image('abascal', 'abascal.gif');
  this.load.image('diaz', 'diaz.gif');
  this.load.image('sanchez', 'sanchez.gif');
}

function create() {
  this.add.image(0, 0, 'congreso').setOrigin(0);

    // Pantalla inicial
  startButton = this.add.text(config.width / 2, config.height / 2, 'Jugar', {
    fontSize: '32px',
    fill: '#FFFFFF'
  }).setOrigin(0.5);
  startButton.setInteractive();
  startButton.on('pointerdown', startGame);

  scoreText = this.add.text(16, 16, 'Score: 0',
                            { fontSize: '32px', fill: '#FFFF00' });
  scoreText.setScrollFactor(0);

  countdownText = this.add.text(config.width - 16, 16, 'Tiempo: ' + countdown,
                                { fontSize: '32px', fill: '#FFFF00' });
  //countdownText.setOrigin(1, 0);
  countdownText.setScrollFactor(0);
  
  positionImages = createPositionImages.call(this);

 var style = {
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
scoreText = this.add.text(16, 16, 'Score: 0', style);
//countdownText = this.add.text(config.width - 16, 16, 'Tiempo: ' + countdown, style);

  greenCircleTimer = this.time.addEvent({
    delay: 1000,
    callback: showNextImage,
    callbackScope: this,
    loop: true
  });
}

function createPositionImages() {
  var images = [];

  var positions = [
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
    var position = positions[i];
    var positionImage = this.add.image(position.x, position.y, '').setOrigin(0.5);
    positionImage.setDisplaySize(60, 60);
    positionImage.setInteractive();
    positionImage.on('pointerdown', increaseScore);
    images.push(positionImage);
  }

  return images;
}

function increaseScore() {
  if (gameStarted) {
    score += 1;
    scoreText.setText('Score: ' + score);
  }
}

function startGame() {
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


function endGame() {
  gameStarted = false;
  scoreText.visible = false;
  countdownText.visible = false;
  positionImages.forEach(function (positionImage) {
    positionImage.visible = false;
  });

  var resultText = this.add.text(config.width / 2, config.height / 2 - 50, 'Puntuación: ' + score, {
    fontSize: '32px',
    fill: '#FFFFFF'
  }).setOrigin(0.5);

  startButton.visible = true;
  startButton.setText('Volver a jugar');
  startButton.setInteractive();
  startButton.on('pointerdown', restartGame);
}

function restartGame() {
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

function showNextImage() {
  if (gameStarted) {
    positionImages.forEach(function (positionImage) {
      positionImage.setAlpha(0);
    });

    var randomImage = Phaser.Math.RND.pick(imagesToDisplay);
    var randomPositionImage = Phaser.Math.RND.pick(positionImages);

    randomPositionImage.setTexture(randomImage);
    randomPositionImage.setAlpha(1);
  }
}

function update() {
  // Lógica para el contador y el cambio de colores
  // Se mueve a la función showNextImage()
}
