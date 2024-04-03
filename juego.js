let TituloFinal1 = "¡Enhorabuena!";

class GameOverScene extends Phaser.Scene {

  contador = 0;
  textContent = ""
  textTitle = ""
  mensajes = 0;
  moreButton = "";

  style = {
    fontSize: '32px',
    fontFamily: 'Arial',
    fill: '#000000',
    wordWrap: { width: 580, useAdvancedWrap: true }
  }
    
  styleTitle = {
    fontSize: '42px',
    fontFamily: 'Arial',
    fontWeight: 'bold', 
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
    this.textTitle = this.add.text(120, 20, '', this.styleTitle)
    this.textContent = this.add.text(20, 66, '', this.style );

    this.updateText(); 

    // Boton de jugar de nuevo  
    this.startButton = this.add.text(20, 260, '   Jugar\nde nuevo', {
      fontSize: '32px',
      fontFamily: 'Arial' ,
      fill: '#FFAA00'
    }).setOrigin(0);
        this.startButton.setInteractive();
    this.startButton.on('pointerdown', this.startGame);

    //Botón de compartir
    this.moreButton = this.add.text(200, 260, 'escanos.org', { fontSize: '32px', fontFamily: 'Arial', fill: '#FFAA00'});
    this.moreButton.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.moreButton.on('pointerup', () => {
      window.open('https://escanos.org', '_blank'); // Abre el enlace en una nueva pestaña
    });
    

    //Botón de compartir
    this.link = this.add.text(445, 260, 'Compartir\nen Twitter', { fontSize: '32px', fontFamily: 'Arial', fill: '#FFAA00'});
    this.link.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.link.on('pointerup', () => {
      if(this.contador === 0) {
        window.open('https://twitter.com/intent/tweet?text=¡Me ha hecho mucha gracia este juego de eliminar diputados!%0ATe invito jugarlo en este enlace http://escanos.org y a seguir a @escanosenblanco', '_blank'); // Abre el enlace en una nueva pestaña
      }
      else
      {
        window.open('https://twitter.com/intent/tweet?text=¡He eliminado '+this.contador+ ' diputados!%0A%0ASi tú también quieres eliminar algunos diputados, pulsa en el enlace http://escanos.org y sigue a @escanosenblanco' , '_blank'); // Abre el enlace en una nueva pestaña
      }
    });

    this.countdownTimer = this.time.addEvent({
      delay: 9000,
      callback: this.updateText,
      callbackScope: this,
      loop: true
    });

  }
  
  updateText() {
    console.log('AboutEB Scene Called');
    // Cargo escena de saber más
    switch (this.mensajes) {
      case 0:
        if (this.contador === 0) {
          console.log('contador='+this.contador);
          this.textTitle.setText('¿Qué ha pasado?', this.styleTitle)
          this.textContent.setText('Vuelve a jugar y no pulses en el Escaño en Blanco sólo a los políticos.\n\n ¡Dales en el escaño!');
        } else if (this.contador > 1) {
          console.log('contador='+this.contador);
          this.textTitle.setText(TituloFinal1);
          this.textContent.setText('¡Has dejado '+ this.contador + ' escaños vacíos!\n\nSi esto fuera el Parlamento Vasco, habrías ahorrado más de '+ (this.contador*120000).toLocaleString('es-ES') +'€');
        } else {
          console.log('contador='+this.contador);
          this.textTitle.setText(TituloFinal1);
          this.textContent.setText('¡Has dejado un escaño vacío!\n\nSi esto fuera el Parlamento Vasco, habrías ahorrado más de '+ ((this.contador*120000)+220000).toLocaleString('es-ES') +'€');
        }
        break;
      case 1:
        this.textTitle.setText('¿Quienes somos?');
        this.textContent.setText('Somos un grupo de ciudadanos cansados de la clase política que no encontramos utilidad ni en el voto nulo, blanco ni la abstención');
        break;
      case 2:   
      this.textTitle.setText('¿Qué queremos?');
      this.textContent.setText('Visibilizar el descontento, llamar la atención de los medios y abrir un debate sobre las carencias de nuestro sistema.');
        break;
      case 3:   
        this.textTitle.setText('¿Cómo lo hacemos?');
      this.textContent.setText('Nos presentamos a las elecciones para dejar escaños vacíos. De esta forma nadie cobrará por ese escaño. Nosotros tampoco.');
        break;
      case 4:
        this.textTitle.setText('¿Esto es posible?');
        this.textContent.setText('Sí. Ya hemos dejado vacías 14 concejalías y un Ayuntamiento. ¡Ayúdanos a dejar un escaño vacío en el Parlamento Vasco!');
        break;
      case 5:   
      this.textTitle.setText('¿Cómo puedo ayudar?');
      this.textContent.setText('Comenta nuestra propuesta con tus amigos, familiares y conocidos. Síguenos en redes sociales y comparte nuestras publicaciones.');
        break;
        //Se pueden añadir más mensajes 5, 6, 7, etc.
      default:
        this.mensajes = 0;
        break;
      }
      this.mensajes += 1;
  
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
    //this.endGame = this.endGame.bind(this);
  }

  increaseScore() {
    //console.log('increaseScore called');
    
    //Si la imagen es la de los escaños decrece el escore y reproduce sonido failed. En caso contrario aumenta el score y reproduce sonido catched
    if (this.randomImage === 'escanos') {
      this.score -= 3;
      if (this.score < 0) {
        this.score = 0;
      }
      this.scoreText.setText('Score: ' + this.score);

      this.playSound('failed');
    } 
    else {
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score);

      this.playSound('catched');
    }

    //Cargo una nueva imagen
    this.showNextImage(); // Muestra la siguiente imagen

    // Elimina el temporizador actual
    this.time.removeEvent(this.greenCircleTimer);

    // Crea un nuevo temporizador
    this.greenCircleTimer = this.time.addEvent({
      delay: this.timeup,
      callback: this.showNextImage,
      callbackScope: this,
      loop: true
    });

  }

  //Muestra la siguiente imagen
  showNextImage() {
    this.positionImages.forEach(function (positionImage) {
      positionImage.setAlpha(0);
    });

    this.randomImage = Phaser.Math.RND.pick(this.imagesToDisplay);
    this.randomPositionImage = Phaser.Math.RND.pick(this.positionImages);

    this.randomPositionImage.setTexture(this.randomImage);
    this.randomPositionImage.setAlpha(1);
  }

  //Variables
  timeup=0
  score = 0;
  positionImages = [];
  imagesToDisplay = ['feijo', 'abascal', 'diaz', 'sanchez', 'escanos', '1', '2', '3', '4', '5', '6'];
  countdown = 0; // Tiempo de juego en segundos
  scoreText ="";
  countdownText="";
  readyText="";
  soundOpened = null;
  soundCatched = null;
  soundFail = null; 
  soundReady = null;
  soundGo = null;
  soundWin = null;
  

  preload() {
    console.log('Preload PlayGameScene');

    //imagenes
    this.load.image('congreso', 'congreso.png');
    this.load.image('feijo', 'feijo.gif');
    this.load.image('abascal', 'abascal.gif');
    this.load.image('diaz', 'diaz.gif');
    this.load.image('sanchez', 'sanchez.gif');
    this.load.image('escanos', 'escanos.png');
    this.load.image('1', '1.webp');
    this.load.image('2', '2.webp');
    this.load.image('3', '3.webp');
    this.load.image('4', '4.webp');
    this.load.image('5', '5.webp');
    this.load.image('6', '6.webp');
 
    // Sonidos
    this.load.audio('opened', 'Open.wav');
    this.load.audio('catched', 'Catch.mp3');
    this.load.audio('failed', 'Replay.wav');
    this.load.audio('ready', 'Ready.mp3');
    this.load.audio('go', 'Go.mp3');
    this.load.audio('win', 'Win.mp3');

        
  }

  create() {
    console.log('Create PlayGameScene');
    this.countdown = 15; // Tiempo de juego en segundos
    this.score = 0;
    this.timeup = 1000;

    this.add.image(0, 0, 'congreso').setOrigin(0);
    console.log('1');

    this.scoreText = this.add.text(16, 16, 'Score: 0',
                              { fontSize: '32px', fill: '#FFFF00' });
    //this.scoreText.setScrollFactor(0);

    this.readyText = this.add.text((config.width / 2)- 150,(config.height / 2)-45, 'Ready?',
    { fontSize: '80px', fill: '#FFFF00' });


    this.countdownText = this.add.text(210, 16, 'Tiempo: ' + this.countdown,
                                  { fontSize: '32px', fill: '#FFFF00' });
    //countdownText.setOrigin(1, 0);
    //this.countdownText.setScrollFactor(0);
    
    console.log('2');
    this.loadSounds();

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

    //Comenzamos
    
    console.log('3');

    //Sonidos
    this.playSound('ready');

    console.log('4')
    this.startGame();
  }

  loadSounds() {
    this.soundOpened = this.sound.add('opened');
    this.soundCatched = this.sound.add('catched');
    this.soundFail = this.sound.add('failed');
    this.soundReady = this.sound.add('ready');
    this.soundGo = this.sound.add('go');
    this.soundWin = this.sound.add('win');
  }

  createPositionImages() {
    this.images = [];

    this.positions = [
      { x: 167, y: 237 },
      { x: 343, y: 237 },
      { x: 515, y: 237 },
      { x: 693, y: 237 },
      { x: 63, y: 409 },
      { x: 239, y: 409 },
      { x: 429, y: 409 },
      { x: 603, y: 409 },
      { x: 807, y: 409 },
      { x: 119, y: 589 },
      { x: 315, y: 589 },
      { x: 503, y: 589 },
      { x: 707, y: 589 },
      { x: 211, y: 735 },
      { x: 421, y: 735 },
      { x: 637, y: 735 }
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
    this.countdown--;
  
    this.countdownText.setText('Tiempo: ' + this.countdown);

    if (this.countdown <= 5)
    {
      this.countdownText.setText(this.countdownText.text + ' ¡Deprisa!');
      this.timeup=600
    }

    if (this.countdown === 0) {
      this.scene.start('GameOverScene', { puntuacion: this.score });

      if (this.score >0 ) this.playSound('win'); else this.playSound('failed');
    }

  }

  playSound(sound) {
    console.log('playSound called '+sound);

    switch (sound) {
      case 'opened':
        if (this.soundOpened) this.soundOpened.play(); else console.log('Sound not found');
        break;  
      case 'catched':
        if (this.soundCatched) this.soundCatched.play(); else console.log('Sound not found');
        break;
      case 'failed':
        if (this.soundFail) this.soundFail.play(); else console.log('Sound not found');
        break;
      case 'ready':
        if (this.soundReady) this.soundReady.play(); else console.log('Sound not found');
        break;
      case 'go':
        if (this.soundGo) this.soundGo.play(); else console.log('Sound not found');
        break;
      case 'win':
        if (this.soundWin) this.soundWin.play(); else console.log('Sound not found');
        break;
      default:
        console.log('No sound found');
        break;
    }
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
    } 
  }

  startGame() {
    console.log('startGame called');

    if (this.greenCircleTimer) {
      this.greenCircleTimer.remove();
    }
    if (this.countdownTimer) {
      this.countdownTimer.remove();
    }

    //añadir un contador de tres segundos para empezar el juego
    this.readyTimer = this.time.addEvent({
      delay: 1500,
      callback: this.startReady,
      callbackScope: this,
      loop: false
    })
  }
  
  
  startReady() {
    console.log('startReady called');
    this.readyText.setText('');

    this.playSound('go');
    
    this.positionImages = this.createPositionImages();


    this.greenCircleTimer = this.time.addEvent({
      delay: this.timeup,
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

    //this.startGame();

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
  width: 1024,
  height: 1024,
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
  this.add.text(586, 339, '1.41', { fontSize: '9px', fontFamily: 'Arial', fill: '#FFFFFF' }) 
}


