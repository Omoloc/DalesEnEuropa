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

function preload() {
  this.load.image('congreso', 'congreso.png');
  this.load.image('feijo', 'feijo.gif');
  this.load.image('abascal', 'abascal.gif');
  this.load.image('diaz', 'diaz.gif');
  this.load.image('sanchez', 'sanchez.gif');
}

function create() {
  this.add.image(0, 0, 'congreso').setOrigin(0);

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
    var positionImage = this.add.image(position.x, position.y, Phaser.Math.RND.pick(imagesToDisplay));
    positionImage.setDisplaySize(60, 60);
    positionImage.setInteractive(); // Habilita interacción con la imagen

    positionImage.on('pointerdown', function () {
      if (this.alpha === 1) {
        score += 1;
        scoreText.setText('Score: ' + score);
        this.alpha = 0;
      }
    });

    positionImages.push(positionImage);
  }

  var style = { fontSize: '32px', fill: '#FFFF00' };
  scoreText = this.add.text(16, 16, 'Score: 0', style);

  greenCircleTimer = this.time.addEvent({
    delay: 1000,
    callback: showNextImage,
    callbackScope: this,
    loop: true
  });
}

function showNextImage() {
  positionImages.forEach(function (positionImage) {
    positionImage.setAlpha(0);
  });

  var randomImage = Phaser.Math.RND.pick(imagesToDisplay);
  var randomPositionImage = Phaser.Math.RND.pick(positionImages);

  randomPositionImage.setTexture(randomImage);
  randomPositionImage.setAlpha(1);
}

function update() {
  // Lógica para el contador y el cambio de colores
  // Se mueve a la función showNextImage()
}




/* *******

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
var greenCircleTimer;
var clickedCircle = null;

function preload() {
  // No se requiere la función preload para este ejemplo
  
  this.load.image('congreso', 'congreso.png');
  this.load.image('feijo','feijo.gif');
}

function create() {
  
  this.add.image(0, 0, 'congreso').setOrigin(0);

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
    // Agrega las demás posiciones aquí...
  ];

  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var feijo = this.add.image(position.x, position.y, 'feijo');
    feijo.setDisplaySize(60, 60);
    feijo.setInteractive();

    feijo.on('pointerdown', function () {
      if (this.alpha === 1) {
        clickedCircle = this;
        this.alpha = 0;
        score += 1;
        scoreText.setText('Score: ' + score);
        greenCircleTimer = this.time.addEvent({
          delay: 100,
          callback: hideFeijo,
          callbackScope: this,
          loop: true
        });
      }
    });
  }

  var style = { fontSize: '32px', fill: '#FFFF00' };
  scoreText = this.add.text(16, 16, 'Score: 0', style);

  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showFeijo,
    callbackScope: this,
    loop: true
  });
}

function hideFeijo() {
  if (clickedCircle) {
    clickedCircle.alpha = 1;
    clickedCircle = null;
  }

  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showFeijo,
    callbackScope: this,
    loop: true
  });
}

function showFeijo() {
  var feijos = this.children.list.filter(function (child) {
    return child.alpha === 0 || child.alpha === 1;
  });

  feijos.forEach(function (feijo) {
    feijo.alpha = 1;
  });

  var randomFeijo = Phaser.Utils.Array.GetRandom(feijos);
  if (randomFeijo) {
    randomFeijo.alpha = 0;
    this.time.delayedCall(2000, function () {
      randomFeijo.alpha = 1;
    });
  }
}

function update() {
  // Lógica para el contador y el cambio de colores
  // Se mueve a la función showFeijo()
}

*********************
  // Tablero de juego
  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var circle = this.add.circle(position.x, position.y, 30, 0x000000);
    circle.setInteractive();

    circle.on('pointerdown', function () {
      if (this.fillColor === 0x00FF00) {
        clickedCircle = this;
        this.fillColor = 0xFF0000;
        score += 1;
        scoreText.setText('Score: ' + score);
        // Temporizador para mostrar círculos verdes cada diez segundos
        greenCircleTimer = this.time.addEvent({
          delay: 100,
          callback: hideRedCircle,
          callbackScope: this,
          loop: true
        });
      }
    });
  }

  // Contador
  var style = { fontSize: '32px', fill: '#FFFF00' };
  scoreText = this.add.text(16, 16, 'Score: 0', style);

  // Temporizador para mostrar círculos verdes cada diez segundos
  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showGreenCircle,
    callbackScope: this,
    loop: true
  });
}

function hideRedCircle() {
  if (clickedCircle) {
    clickedCircle.fillColor = 0x000000;
    clickedCircle = null;
  }
  // Temporizador para mostrar círculos verdes cada diez segundos
  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showGreenCircle,
    callbackScope: this,
    loop: true
  });

}

function showGreenCircle() {
  // Oculta todos los círculos
  var circles = this.children.list.filter(function (child) {
    return child.fillColor === 0x000000 || child.fillColor === 0x00FF00 ;
  });

  circles.forEach(function (circle) {
    circle.fillColor = 0x000000;
  });

  // Muestra un círculo verde en una posición aleatoria
  var randomCircle = Phaser.Utils.Array.GetRandom(circles);
  if (randomCircle) {
    randomCircle.fillColor = 0x00FF00;
    this.time.delayedCall(2000, function () {
      randomCircle.fillColor = 0x000000;
    });
  }
}

function update() {
  // Lógica para el contador y el cambio de colores
  // Se mueve a la función showGreenCircle()
}
*/
