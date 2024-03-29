class GameOverScene extends Phaser.Scene {

  contador = 0;
  textContent = ""
  mensajes = 0;
  moreButton = "";

  style = {
    fontSize: '32px',
    fontFamily: 'Arial',
    fill: '#000000',
    wordWrap: { width: 580, useAdvancedWrap: true }
  }
    

  constructor() {
    super({ key: 'GameOverScene' });
    console.log('Constructor GameOverScene');

    // Vincula el contexto de 'this' en 'startGame' a la instancia de 'GameOverScene'
    this.startGame = this.startGame.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  init(data) {
    console.log('init GameOverScene ' + data.puntuacion);
    this.contador = data.puntuacion;
}

  preload() {
    // Carga los recursos necesarios para esta escena
    this.load.image('background', 'Background.png');

  }
  startGame() {
    // Cargo escena del juego
    console.log('PlayGameScene Scene Called');
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
    }
    this.scene.start('PlayGameScene');
  }

  create() {

    this.mensajes = 0;
    // Configura el estado inicial de esta escena
    this.add.image(0, 0, 'background').setOrigin(0);
     // Cambia el color de fondo a blanco
    this.cameras.main.setBackgroundColor('#FFFFFF');
  
    //this.add.text(120, 10, '¡Enhorabuena!', { fontSize: '32px', fontFamily: 'Arial', fill: '#000000' });
    //this.add.text(20, 50, '¡Has eliminado a '+this.contador+ ' diputados!', { fontSize: '32px', fontFamily: 'Arial' , fill: '#000000' });
    if (this.contador === 0) {
      this.textContent = this.add.text(20, 16, '¡No has eliminado a ningún diputado!\nNo tengas miedo de golpearles, es solo un juego', this.style );
    }
    else
    {
      this.textContent = this.add.text(20, 16, '      ¡Enhorabuena!\n¡Has eliminado a '+this.contador+ ' diputados!', this.style );
    }

    // Boton de jugar de nuevo  
    this.startButton = this.add.text(20, 260, '   Jugar\nde nuevo', {
      fontSize: '32px',
      fontFamily: 'Arial' ,
      fill: '#FFAA00'
    }).setOrigin(0);
        this.startButton.setInteractive();
    this.startButton.on('pointerdown', this.startGame);

    //botón de saber más
    this.moreButton = this.add.text(220, 260, 'Saber\n más', {
      fontSize: '32px',
      fontFamily: 'Arial' ,
      fill: '#FFAA00'
    }).setOrigin(0);
        this.moreButton.setInteractive();
    this.moreButton.on('pointerdown', this.updateText);

    //Botón de compartir
    this.link = this.add.text(420, 260, 'Compartir\nen Twitter', { fontSize: '32px', fontFamily: 'Arial', fill: '#FFAA00'});
    this.link.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.link.on('pointerup', () => {
        window.open('https://twitter.com/intent/tweet?text=Me ha gustado mucho este juego. Te invito a jugarlo y a seguir a @escanosenblanco http://escanos.org', '_blank'); // Abre el enlace en una nueva pestaña
    });

  }
   
  updateText() {
    console.log('AboutEB Scene Called');
    // Cargo escena de saber más
    this.mensajes += 1;
    switch (this.mensajes) {
      case 1:
        this.textContent.setText('Escaños en Blanco es una alternativa útil al voto en blanco, voto nulo y abstención que permite a los ciudadanos dejar escaños vacíos como forma de rechazo a los candidatos o el sistema');
        break;
      case 2:   
        this.textContent.setText('Escaños en Blanco se presenta a las elecciones con un partido, y no toma posesión de los escaños obtenidos.\nCon ello renuncia al escaño y a cualquier sueldo o subvención que pudiera corresponderle.');
        break;
      case 3:   
        this.textContent.setText('De esa forma de visibiliza a aquellas personas que buscamos cambios profundos en la política y que no nos sentimos representados por los partidos tradicionales.');
        break;
      case 4:   
        this.textContent.setText('Con esta iniciativa se busca:\n1. Visibilizar el descontento\n2. Llamar la atención de los medios\n3. Abrir un debate sobre los deficits de nuestro sistema');
        break;
      case 5:
        window.open('https://escanos.org', '_blank'); // Abre el enlace en una nueva pestaña
        this.moreButton.setText('');
        this.mensajes = 0;
        break;
      }
  
  }


  update() {
    // Actualiza el estado de esta escena en cada frame
  }
}


class PlayGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayGameScene' });
    console.log('Constructor PlayGameScene');

    // Bind the context
    this.increaseScore = this.increaseScore.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  increaseScore() {
    //Cargo una nueva imagen
    this.showNextImage(); // Muestra la siguiente imagen
    //console.log('increaseScore called');
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    // Elimina el temporizador actual
    this.time.removeEvent(this.greenCircleTimer);

// Crea un nuevo temporizador
    this.greenCircleTimer = this.time.addEvent({
      delay: 1000,
      callback: this.showNextImage,
      callbackScope: this,
      loop: true
    });

    this.soundCatched.play();
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
    }
  }

  showNextImage() {
    this.positionImages.forEach(function (positionImage) {
      positionImage.setAlpha(0);
    });

    this.randomImage = Phaser.Math.RND.pick(this.imagesToDisplay);
    this.randomPositionImage = Phaser.Math.RND.pick(this.positionImages);

    this.randomPositionImage.setTexture(this.randomImage);
    this.randomPositionImage.setAlpha(1);
  }
  endGame() {
    this.scoreText.visible = false;
    this.countdownText.visible = false;
    this.positionImages.forEach(function (positionImage) {
      positionImage.visible = false;
    }.bind(this));

    this.resultText = this.add.text(config.width / 2, config.height / 2 - 50, 'Puntuación: ' + score, {
      fontSize: '32px',
      fill: '#FFFFFF'
    }).setOrigin(0.5);

  }


  score = 0;
  positionImages = [];
  imagesToDisplay = ['feijo', 'abascal', 'diaz', 'sanchez'];
  countdown = 0; // Tiempo de juego en segundos
  scoreText ="";
  countdownText="";
  soundOpened = null;
  soundCatched = null;

  preload() {
    console.log('Preload PlayGameScene');
    this.load.image('congreso', 'congreso.png');
    this.load.image('feijo', 'feijo.gif');
    this.load.image('abascal', 'abascal.gif');
    this.load.image('diaz', 'diaz.gif');
    this.load.image('sanchez', 'sanchez.gif');
    this.load.audio('opened', 'Open.wav');
    this.load.audio('catched', 'Catch.mp3');
    console.log('this.load.audio(opened, Open.wav)');
        
  }

  create() {
    console.log('Create PlayGameScene');
    this.countdown = 20; // Tiempo de juego en segundos
    this.score = 0;

    this.add.image(0, 0, 'congreso').setOrigin(0);

    this.scoreText = this.add.text(16, 16, 'Score: 0',
                              { fontSize: '32px', fill: '#FFFF00' });
    this.scoreText.setScrollFactor(0);

    this.countdownText = this.add.text(300, 16, 'Tiempo: ' + this.countdown,
                                  { fontSize: '32px', fill: '#FFFF00' });
    //countdownText.setOrigin(1, 0);
    this.countdownText.setScrollFactor(0);
    
    this.positionImages = this.createPositionImages();

    this.style = {
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

    this.greenCircleTimer = this.time.addEvent({
      delay: 1000,
      callback: this.showNextImage,
      callbackScope: this,
      loop: true
    });
    this.showNextImage();

    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: this.decreaseCountdown,
      callbackScope: this,
      loop: true
    });

    //Comenzamos
    this.soundOpened = this.sound.add('opened');
    this.soundCatched = this.sound.add('catched');
    this.soundOpened.play();
    console.log('soundpOpened add and played');
    

  }

  createPositionImages() {
    this.images = [];

    this.positions = [
      { x: 100, y: 105 },
      { x: 200, y: 104 },
      { x: 300, y: 103 },
      { x: 400, y: 103 },
      { x: 500, y: 104 },
      { x: 100, y: 195 },
      { x: 200, y: 193 },
      { x: 300, y: 189 },
      { x: 400, y: 192 },
      { x: 500, y: 192 },
      { x: 100, y: 304 },
      { x: 200, y: 300 },
      { x: 300, y: 301 },
      { x: 400, y: 299 },
      { x: 500, y: 299 }
      // ... (agrega las demás posiciones aquí)
    ];

    for (var i = 0; i < this.positions.length; i++) {
      this.position = this.positions[i];
      this.positionImage = this.add.image(this.position.x, this.position.y -10, '').setOrigin(0.5);
      this.positionImage.setDisplaySize(30, 30);
      this.positionImage.setInteractive();
      this.positionImage.on('pointerdown', this.increaseScore);
      this.images.push(this.positionImage);
    }

    return this.images;
  }

  decreaseCountdown() {
    //console.log('decreaseCountdown called');

    this.countdown--;
    this.countdownText.setText('Tiempo: ' + this.countdown);
    if (this.countdown === 0) {
      this.scene.start('GameOverScene', { puntuacion: this.score });
    }
  }

  startGame() {
    // Elimina el evento de temporizador anterior
    if (this.greenCircleTimer) {
      this.greenCircleTimer.remove();
    }
  
    // Crea un nuevo evento de temporizador
    this.greenCircleTimer = this.time.addEvent({
      delay: 1000,
      callback: this.showNextImage,
      callbackScope: this,
      loop: true
    });

    if (this.countdownTimer) {
      this.countdownTimer.remove();
    }

    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: this.decreaseCountdown,
      callbackScope: this,
      loop: true
    });

  }
  
  

}

//Clase para saber más sobre Escaños en Blanco
class AboutEB extends Phaser.Scene {
  constructor() {
    super({ key: 'AboutEB' });
  }

  preload() {
    // Carga los recursos necesarios para esta escena
  }

  create() {
    // Configura el estado inicial de esta escena
  }

  update() {
    // Actualiza el estado de esta escena en cada frame
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
  GameOverScene, PlayGameScene, AboutEB ]
};

var game = new Phaser.Game(config);

var startButton;

function preload() {
    this.load.image('intro', 'Intro.png');
}

function create() {
  this.add.image(0, 0, 'intro').setOrigin(0);
  console.log('Scene created');

  // Pantalla inicial
  startButton = this.add.text( config.width / 2, 300 , '¡EMPEZAR!', {
    fontSize: '40px',
    fontWeight: 'bold', // Hace que el texto sea negrita
    fill: '#FFAA00',
    fontFamily: 'Arial' 
  }).setOrigin(0.5);
  startButton.setInteractive();

  var startGame = () => {
    // Cargo escena del juego
    console.log('PlayGameScene Scene Called');
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
  }
    this.scene.start('PlayGameScene');
  }

  startButton.on('pointerdown', startGame);
  console.log('Start button added');
}

function update() {
  this.add.text(598, 340, '1.5', { fontSize: '8px', fontFamily: 'Arial', fill: '#FFFFFF' }) 
}


