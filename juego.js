let TituloFinal1 = "¡Enhorabuena!";
let Quepaso = "¿Qué ha pasado?";
let vuelveajugar = "Vuelve a jugar y no pulses en el Escaño en Blanco sólo a los políticos.\n\n ¡Dales en el escaño!";
let Hasdejado = "¡Has dejado ";
let escanosovacios = " escaños vacío!\n\nSi esto fuera el Parlamento Vasco, habrías ahorrado más de ";
let unescanovacio = " ¡Has dejado un escaño vacío!\n\n Si esto fuera el Parlamento Vasco, habrías ahorrado más de ";
let euros = "€";
let Quienessomos = "¿Quienes somos?";
let Somosungrupo = "Somos un grupo de ciudadanos cansados de la clase política que no encontramos utilidad ni en el voto nulo, blanco ni la abstención";
let Quequeremos = "¿Qué queremos?";
let Visibilizar = "Visibilizar la falta de representación, llamar la atención de los medios y abrir un debate sobre las carencias de nuestro sistema.";
let Comolo = "¿Cómo lo hacemos?";
let Nospresentamos = "Nos presentamos a las elecciones para dejar escaños vacíos. De esta forma nadie cobrará por ese escaño. Nosotros tampoco.";
let Estoes = "¿Esto es posible?";
let Siyahay14 = "Sí. Ya hemos dejado vacías 14 concejalías y un Ayuntamiento. ¡Ayúdanos a dejar un escaño vacío en el Parlamento Vasco!";
let Comopuedo = "¿Cómo puedo ayudar?";
let Comenta = "Comenta nuestra propuesta con tus amigos, familiares y conocidos. Síguenos en redes sociales y comparte nuestras publicaciones.";


class GameOverScene extends Phaser.Scene {

  contador = 0;
  textContent = ""
  textTitle = ""
  mensajes = 0;
  moreButton = "";

  style = {
    fontSize: '50px',
    fontFamily: 'Arial',
    fill: '#FFFFFF',
    wordWrap: { width: 850, useAdvancedWrap: true }
  }
    
  styleTitle = {
    fontSize: '75px',
    fontFamily: 'Arial',
    fontWeight: 'bold', 
    fill: '#FFFF66',
    wordWrap: { width: 850, useAdvancedWrap: true }
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
    this.textTitle = this.add.text(120, 320, '', this.styleTitle)
    this.textContent = this.add.text(120, 406, '', this.style );

    this.updateText(); 

    // Boton de jugar de nuevo  
    this.startButton = this.add.text(550, 845, 'Jugar', {
      fontSize: '32px',
      fontFamily: 'Arial' ,
      fill: '#FFFFFF'
    }).setOrigin(0);
        this.startButton.setInteractive();
    this.startButton.on('pointerdown', this.startGame);

    //Enlace a la web de Escaños en Blanco
    this.moreButton = this.add.text(120, 845, 'escanos.org', { fontSize: '42px', fontFamily: 'Arial', fill: '#FFFFFF'});
    this.moreButton.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.moreButton.on('pointerup', () => {
      window.open('https://escanos.org', '_blank'); // Abre el enlace en una nueva pestaña
    });
    

    //Botón de compartir
    this.link = this.add.text(890, 845, 'X', { fontSize: '32px', fontFamily: 'Arial', fill: '#FFFFFF'});
    this.link.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.link.on('pointerup', () => {
      if(this.contador === 0) {
        window.open('https://twitter.com/intent/tweet?text=¡Me ha hecho mucha gracia este juego de eliminar diputados!%0ATe invito a jugarlo en este enlace http://escanos.org y a seguir a @escanosenblanco #dalesenlosescaños', '_blank'); // Abre el enlace en una nueva pestaña
      }
      else
      {
        window.open('https://twitter.com/intent/tweet?text=¡He eliminado '+this.contador+ ' diputados!%0A%0ASi tú también quieres eliminar algunos diputados, pulsa en el enlace http://escanos.org y sigue a @escanosenblanco #dalesenlosescaños' , '_blank'); // Abre el enlace en una nueva pestaña
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
          this.textTitle.setText(Quepaso, this.styleTitle);
          this.textContent.setText( vuelveajugar);
        } else if (this.contador > 1) {
          console.log('contador='+this.contador);
          this.textTitle.setText(TituloFinal1);
          this.textContent.setText( Hasdejado + this.contador + escanosovacios + (this.contador*120000).toLocaleString('es-ES') +'€');
        } else {
          console.log('contador='+this.contador);
          this.textTitle.setText(TituloFinal1);
          this.textContent.setText(unescanovacio+ ((this.contador*120000)+220000).toLocaleString('es-ES') +'€');
        }
        break;
      case 1:
        this.textTitle.setText(Quienessomos);
        this.textContent.setText(Somosungrupo);
        break;
      case 2:   
      this.textTitle.setText(Quequeremos);
      this.textContent.setText( Visibilizar );
        break;
      case 3:   
        this.textTitle.setText(Comolo);
      this.textContent.setText( Nospresentamos );
        break;
      case 4:
        this.textTitle.setText(Estoes);
        this.textContent.setText(Siyahay14);
        break;
      case 5:   
      this.textTitle.setText(Comopuedo);
      this.textContent.setText( Comenta );
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

  increaseScore(posX, posY) {
    console.log('increaseScore called');

    //Si la imagen es la de los escaños decrece el escore y reproduce sonido failed. En caso contrario aumenta el score y reproduce sonido catched
    if (this.randomImage === '0') {
      this.score -= 3;
      if (this.score < 0) {
        this.score = 0;
      }
      this.scoreText.setText('Score: ' + this.score);

      this.playSound('failed');

      //Fogonazo rojo
      // Crea un rectángulo que cubra toda la pantalla
      let flash = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xff0000);
      flash.setOrigin(0, 0); // Asegúrate de que el origen esté en la esquina superior izquierda

      // Configura la opacidad del rectángulo para que sea semitransparente
      flash.alpha = 0.5;

      // Haz que el fogonazo desaparezca después de un corto período de tiempo
      this.time.delayedCall(100, () => {
          flash.destroy();
      });
    } 
    else {

      let coin = this.add.sprite(posX, posY , 'coin1');
      coin.play('spin');
  
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score);

      this.playSound('catched');
      this.playSound('monedas');
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

    console.log('Images to display '+this.imagesToDisplay.length);
    this.randomImage = Phaser.Math.RND.pick(this.imagesToDisplay);

    this.randomPositionImage = Phaser.Math.RND.pick(this.positionImages);
    
    if (this.randomImage)
    {
      console.log('showNextImage called '+this.randomImage);

      this.randomPositionImage.setTexture(this.randomImage);
      this.randomPositionImage.setAlpha(1);
     }
     else
      {
        console.log('No image to display');
      }

  }

  //Variables
  timeup=0
  score = 0;
  positionImages = [];
  imagesToDisplay = ['feijo', 'abascal', 'diaz', 'sanchez', '0', '1', '2', '3', '4', '5', '6', 'aitor'];
  countdown = 0; // Tiempo de juego en segundos
  scoreText ="";
  countdownText="";
  readyText="";
  soundOpened = null;
  soundCatched = null;
  soundMonedas = null;
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
    this.load.image('0', '0.webp');
    this.load.image('1', '1.webp');
    this.load.image('2', '2.webp');
    this.load.image('3', '3.webp');
    this.load.image('4', '4.webp');
    this.load.image('5', '5.webp');
    this.load.image('6', '6.webp');
    //this.load.image('rufian', 'rufian.webp');
    //this.load.image('nogueras', 'nogueras.webp');
    this.load.image('aitor', 'aitor.webp');
    
    // Cargar imágenes animación monedas
    for(let i = 1; i <= 12; i++) {
        this.load.image(`coin${i}`, `monedas/${i.toString().padStart(3, '0')}.png`);
    }
    
    // Sonidos
    this.load.audio('opened', 'Open.wav');
    this.load.audio('catched', 'Catch.mp3');
    this.load.audio('failed', 'Replay.wav');
    this.load.audio('ready', 'Ready.mp3');
    this.load.audio('go', 'Go.mp3');
    this.load.audio('win', 'Win.mp3');
    this.load.audio('monedas', 'monedas01.mp3');
     
        
  }

  create() {
    console.log('Create PlayGameScene');
    this.countdown = 15; // Tiempo de juego en segundos
    this.score = 0;
    this.timeup = 1000;

    this.add.image(0, 0, 'congreso').setOrigin(0);
    console.log('1');

    this.scoreText = this.add.text(16, 36, 'Score: 0',
                              { fontSize: '52px', fill: '#FFFF00' });
    //this.scoreText.setScrollFactor(0);

    this.readyText = this.add.text((config.width / 2)- 150,(config.height / 2)-45, 'Ready?',
    { fontSize: '80px', fill: '#FFFF00' });


    this.countdownText = this.add.text(380, 36, 'Tiempo: ' + this.countdown,
                                  { fontSize: '52px', fill: '#FFFF00' });
    //countdownText.setOrigin(1, 0);
    //this.countdownText.setScrollFactor(0);
    console.log('2');
    
// Paso 2: Crear la animación en la función create
    let frames = [];
    for(let i = 1; i <= 12; i++) {
        frames.push({ key: `coin${i}` });
    }
    console.log('3');

    this.anims.create({
        key: 'spin',
        frames: frames,
        frameRate: 10,
        repeat: 0
    });

    // Agrega un evento de finalización de animación para eliminar la moneda una vez que la animación haya terminado
    this.anims.on('animationcomplete', (anim, frame, gameObject) => {
      if (anim.key === 'spin') {
          gameObject.destroy();
      }
    }, this);

    console.log('4');
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
    
    console.log('5');

    //Sonidos
    this.playSound('ready');

    console.log('6')
    this.startGame();
  }

  loadSounds() {
    this.soundOpened = this.sound.add('opened');
    this.soundCatched = this.sound.add('catched');
    this.soundMonedas = this.sound.add('monedas');
    this.soundFail = this.sound.add('failed');
    this.soundReady = this.sound.add('ready');
    this.soundGo = this.sound.add('go');
    this.soundWin = this.sound.add('win');
  }

  createPositionImages() {
    this.images = [];

    this.positions = [
      { x: 236, y: 326 },
      { x: 417, y: 326 },
      { x: 601, y: 326 },
      { x: 782, y: 326 },
      { x: 124, y: 496 },
      { x: 319, y: 496 },
      { x: 506, y: 496 },
      { x: 697, y: 496 },
      { x: 894, y: 496 },
      { x: 200, y: 666 },
      { x: 398, y: 665 },
      { x: 598, y: 666 },
      { x: 798, y: 666 },
      { x: 316, y: 853 },
      { x: 524, y: 853 },
      { x: 734, y: 853 }
      // ... (agrega las demás posiciones aquí)
    ];

  for (var i = 0; i < this.positions.length; i++) {
    let currentPosition = this.positions[i];
    this.positionImage = this.add.image(currentPosition.x, currentPosition.y -10, '').setOrigin(0.5);
    this.positionImage.setDisplaySize(30, 30);
    this.positionImage.setInteractive();
    console.log('ADDED IMAGE');
    this.positionImage.on('pointerdown', () => this.increaseScore(currentPosition.x, currentPosition.y));
    this.images.push(this.positionImage);
  }
    
    return this.images;
  }

  decreaseCountdown() {
    this.countdown--;
  
    this.countdownText.setText('Tiempo: ' + this.countdown);

    if (this.countdown <= 5)
    {
      this.countdownText.setText(this.countdownText.text + '  ¡Deprisa!');
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
      case 'monedas':
        if (this.soundMonedas) this.soundMonedas.play(); else console.log('Sound not found');
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
  startButton = this.add.text( 480, 820 , 'JUGAR', {
    fontSize: '100px',
    fontWeight: 'bold', // Hace que el texto sea negrita
    fill: '#FFFFFF',
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

  this.add.text(980, 1000, '1.59', { fontSize: '19px', fontFamily: 'Arial', fill: '#FFFFFF' }) 
}

function update() {
}


