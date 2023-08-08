// Configuración del juego
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
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
}

function create() {
  var positions = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 400, y: 100 },
    { x: 500, y: 100 },
    { x: 600, y: 100 },
    { x: 700, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 300, y: 200 },
    { x: 400, y: 200 },
    { x: 500, y: 200 },
    { x: 600, y: 200 },
    { x: 700, y: 200 },
    { x: 100, y: 300 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    { x: 400, y: 300 },
    { x: 500, y: 300 },
    { x: 600, y: 300 },
    { x: 700, y: 300 },
    { x: 100, y: 400 },
    { x: 200, y: 400 },
    { x: 300, y: 400 },
    { x: 400, y: 400 },
    { x: 500, y: 400 },
    { x: 600, y: 400 },
    { x: 700, y: 400 },
    { x: 100, y: 500 },
    { x: 200, y: 500 },
    { x: 300, y: 500 },
    { x: 400, y: 500 },
    { x: 500, y: 500 },
    { x: 600, y: 500 },
    { x: 700, y: 500 },
    { x: 100, y: 600 },
    { x: 200, y: 600 },
    { x: 300, y: 600 },
    { x: 400, y: 600 },
    { x: 500, y: 600 },
    { x: 600, y: 600 },
    { x: 700, y: 600 },
    { x: 100, y: 700 },
    { x: 200, y: 700 },
    { x: 300, y: 700 },
    { x: 400, y: 700 },
    { x: 500, y: 700 },
    { x: 600, y: 700 },
    { x: 700, y: 700 }
    // Agrega las demás posiciones aquí...
  ];

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
