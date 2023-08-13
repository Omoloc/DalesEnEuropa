// ... (código previo)

function create() {
  this.add.image(0, 0, 'congreso').setOrigin(0);

  // Código de creación de posiciones omitido...

  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    var feijo = this.add.image(position.x, position.y, 'feijo');  // Cambio aquí
    feijo.setDisplaySize(60, 60);  // Ajusta el tamaño de la imagen
    feijo.setInteractive();

    feijo.on('pointerdown', function () {
      if (this.alpha === 1) {
        clickedCircle = this;
        this.alpha = 0;  // Cambio aquí
        score += 1;
        scoreText.setText('Score: ' + score);
        // Temporizador para mostrar imágenes de nuevo cada diez segundos
        greenCircleTimer = this.time.addEvent({
          delay: 100,
          callback: hideFeijo,
          callbackScope: this,
          loop: true
        });
      }
    });
  }

  // Contador
  var style = { fontSize: '32px', fill: '#FFFF00' };
  scoreText = this.add.text(16, 16, 'Score: 0', style);

  // Temporizador para mostrar imágenes de nuevo cada diez segundos
  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showFeijo,
    callbackScope: this,
    loop: true
  });
}

function hideFeijo() {
  if (clickedCircle) {
    clickedCircle.alpha = 1;  // Cambio aquí
    clickedCircle = null;
  }
  // Temporizador para mostrar imágenes de nuevo cada diez segundos
  greenCircleTimer = this.time.addEvent({
    delay: 2000,
    callback: showFeijo,
    callbackScope: this,
    loop: true
  });
}

function showFeijo() {
  // Oculta todas las imágenes
  var feijos = this.children.list.filter(function (child) {
    return child.alpha === 0 || child.alpha === 1;
  });

  feijos.forEach(function (feijo) {
    feijo.alpha = 1;  // Cambio aquí
  });

  // Muestra una imagen "feijo" en una posición aleatoria
  var randomFeijo = Phaser.Utils.Array.GetRandom(feijos);
  if (randomFeijo) {
    randomFeijo.alpha = 0;  // Cambio aquí
    this.time.delayedCall(2000, function () {
      randomFeijo.alpha = 1;  // Cambio aquí
    });
  }
}

// ... (código posterior)
