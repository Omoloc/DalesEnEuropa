class BaseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BaseScene' });
    }

    preload() {
        // Cargar la imagen de fondo para la pantalla de carga
        this.load.image('loadingScreen', 'media/img/Intro_Base_EU.png');
    }

    create() {
        console.log('BaseScene started');
        
        let background_Base = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'loadingScreen').setOrigin(0.5, 0.5);
        
        background_Base.alpha = 0;
        
        this.tweens.add({
        targets: background_Base,
        alpha: 1,
        duration: 500,
        onComplete: () => {
                // Pasar a la siguiente escena después de un breve retraso
                this.time.delayedCall(500, () => {
                    this.scene.transition({
                        target: 'InitialScene',
                        duration: 1000,
                        moveBelow: true,
                        onUpdate: this.transitionOut,
                        data: { x: this.cameras.main.centerX, y: this.cameras.main.centerY }
                    });
                }, [], this);
            }
        });
    }

    transitionOut(progress) {
        this.cameras.main.alpha = 1 - progress;
    }
}

class InitialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScene' });
        this.languageChanged = false;
    }

    preload() {
        this.load.image('initialScreen', 'media/img/Intro_EU.png');
        changeLanguage();
        this.load.image('bandera_esp', 'media/img/idiomas/boton_castellano.png');
        this.load.image('bandera_eus', 'media/img/idiomas/boton_euskera.png');
        this.load.image('bandera_cat', 'media/img/idiomas/boton_catalan.png');
        this.load.image('bandera_gal', 'media/img/idiomas/boton_gallego.png');
    }

    create() {
        console.log('InitialScene started');
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'initialScreen').setOrigin(0.5, 0.5);
        
        this.addTextPlay();
        this.addImageFlag(bandera);
        
        addTextWithAdjustedPosition(this, 1024, 1024, '20px', '#FFFFFF', 'v3.01','Arial');
    }

    update() {
        
    }

    addTextPlay() {
        
        if (this.TextPlay) {
            this.TextPlay.destroy();
        }
        
        const optimalFontSize_TextPlay = getOptimalFontSize(this, Jugar, 320, 90, 'MyFont', 4);
        this.TextPlay = addCenteredText(this, Jugar, optimalFontSize_TextPlay, 'MyFont', '#FFFFFF');
        
        this.TextPlay.y = 865;
        this.TextPlay.setInteractive({ useHandCursor: true });
        this.TextPlay.on('pointerup', () => {
            this.scene.start('InstructionsGame');
        });
    }

    addImageFlag(bandera_actual) {
        if (!this.ImageFlag) {
            this.ImageFlag = this.add.image(890, 865, bandera).setOrigin(0.5);
            this.ImageFlag.setInteractive({ useHandCursor: true });
            this.ImageFlag.on('pointerup', () => {
                changeLanguage();
                this.addTextPlay();
                this.addImageFlag(bandera)
            });
        } else {
            this.ImageFlag.setTexture(bandera_actual);
        }
    }
}

class InstructionsGame extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsGame' });
    }

    preload() {
        this.load.image('info', 'media/img/info.png');
        this.load.image('bandera_esp', 'media/img/idiomas/boton_castellano.png');
        this.load.image('bandera_eus', 'media/img/idiomas/boton_euskera.png');
        this.load.image('bandera_cat', 'media/img/idiomas/boton_catalan.png');
        this.load.image('bandera_gal', 'media/img/idiomas/boton_gallego.png');
        this.load.image('boton', 'media/img/Boton.png');
    }

    create() {
        console.log('InstructionsGame started');
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'info').setOrigin(0.5, 0.5);
        this.add.image(this.cameras.main.centerX, 865, 'boton').setOrigin(0.5, 0.5);
        
        this.addTextPlay();
        this.addImageFlag(bandera);
        this.addTextInstruction()
        
        addTextWithAdjustedPosition(this, 1024, 1024, '20px', '#FFFFFF', 'v3.01','Arial');
    }

    update() {
    }
    
    transitionOut(progress) {
        this.cameras.main.alpha = 1 - progress;
    }
    
    addImageFlag(bandera_actual) {
        if (!this.ImageFlag) {
            this.ImageFlag = this.add.image(878, 890, bandera).setOrigin(0.5);
            this.ImageFlag.setInteractive({ useHandCursor: true });
            this.ImageFlag.on('pointerup', () => {
                changeLanguage();
                this.addTextPlay();
                this.addTextInstruction()
                this.addImageFlag(bandera)
            });
        } else {
            this.ImageFlag.setTexture(bandera_actual);
        }
    }
    
    addTextPlay() {
        
        if (this.TextPlay) {
            this.TextPlay.destroy();
        }
        
        const optimalFontSize_TextPlay = getOptimalFontSize(this, Jugar, 320, 90, 'MyFont', 4);
        
        this.TextPlay = addCenteredText(this, Jugar, optimalFontSize_TextPlay, 'MyFont', '#FFFFFF');
        this.TextPlay.y = 865;
        this.TextPlay.setInteractive({ useHandCursor: true });
        this.TextPlay.on('pointerup', () => {
            this.cameras.main.setAlpha(1);

            this.tweens.add({
                targets: this.cameras.main,
                alpha: 1,
                duration: 300,
                onComplete: () => {
                    this.time.delayedCall(0, () => {
                        this.scene.transition({
                            target: 'PlayGameScene',
                            duration: 1000,
                            moveBelow: true,
                            onUpdate: this.transitionOut,
                        });
                    }, [], this);
                }
            });
        });
    }
    
    addTextInstruction() {
        
        if (this.TextInstruction) {
            this.TextInstruction.destroy();
        }
        
        const optimalFontSize_TextInstruction = getOptimalFontSize(this, info1, 665, 565, 'MyFont', 4);
        this.TextInstruction = addCenteredText(this, info1, optimalFontSize_TextInstruction, 'MyFont', '#000000');
        
    }
}

class PlayGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayGameScene' });
        this.increaseScore = this.increaseScore.bind(this);
        this.showNextImage = this.showNextImage.bind(this);
        this.music = null;
        this.wosh = null;
        this.TextReady = null;
        this.TextDeprisa = null;
        this.TextCountdown=null;
    }

    increaseScore(posX, posY) {

        if (this.randomImage === 'escanoblanco') {
            this.score -= 3;
            if (this.score < 0) {
                this.score = 0;
            }
            this.TextScore.setText(Puntuacion+': ' + this.score);

            this.playSound('failed');

            let flash = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xff0000);
            flash.setOrigin(0, 0);

            flash.alpha = 0.5;

            this.time.delayedCall(100, () => {
                flash.destroy();
            });
        } else {
            let coin = this.add.sprite(posX, posY-120 , 'coin1');
            coin.play('spin');

            this.score += 1;
            this.TextScore.setText( Puntuacion + ': ' + this.score);

            this.playSound('catched');
            this.playSound('monedas');
        }

        this.time.removeEvent(this.greenCircleTimer);

        this.ReloadGreenCircleTimer()

    }

    showNextImage() {
        this.auxcount=0;

        if (this.tweenUp) {
            this.tweenUp.stop();
            this.tweenUp.destroy();
        }
        
        if (this.tweenStay) {
            this.tweenStay.stop();
            this.tweenStay.destroy();
        }
        
        if (this.tweenDown) {
            this.tweenDown.stop();
            this.tweenDown.destroy();
        }
        
        if (this.randomPositionImage) this.randomPositionImage.y = this.originalY;

        this.positionImages.forEach(function (positionImage) {
            positionImage.setAlpha(0);
        });

        console.log('Images to display '+this.imagesToDisplay.length);
        this.randomImage = Phaser.Math.RND.pick(this.imagesToDisplay);

        this.randomPositionImage = Phaser.Math.RND.pick(this.positionImages);
        this.originalY = this.randomPositionImage.y;

        if (this.randomImage) {
            console.log('showNextImage called '+this.randomImage);
            this.randomPositionImage.setTexture(this.randomImage);
            this.randomPositionImage.setAlpha(1);

            this.tweenDown = this.tweens.add({
                targets: this.randomPositionImage,
                y: '+=' + this.randomPositionImage.height,
                duration: this.timeup/2,
                paused: true,
            });

            if (this.countdown <= 5) {
                this.staytime = 300;
            } else {
                this.staytime = 700;
            }
            
            this.tweenStay = this.tweens.add({
                targets: this.escanoblanco,
                y: '-=' + this.escanoblanco.height,
                duration: this.staytime,
                paused: true,
                onComplete: () => {
                    this.tweenDown.play();
                }
            });
            
            this.tweenUp = this.tweens.add({
                targets: this.randomPositionImage,
                y: '-=' + this.randomPositionImage.height,
                duration: this.timeup/2,
                paused: true,
                onComplete: () => {
                    this.tweenStay.play();
                }
            });
            this.tweenUp.play();
        } else {
            console.log('No image to display');
        }
    }

    timeup=100
    staytime=700
    score = 0;
    positionImages = [];
    imagesToDisplay = ['abascalvox', 'aitorpnv', 'albasumar', 'amaiavox', 'belarrapodemos',
                      'diazsumar', 'enekopsoe', 'escanoblanco', 'feijoopp', 'imanolpnv',
                      'javierpp', 'mertxebildu', 'mirenpodemos', 'sanchezpsoe'];
    countdown = 0;
    scoreText ="";
    soundOpened = null;
    soundCatched = null;
    soundMonedas = null;
    soundFail = null;
    soundReady = null;
    soundGo = null;
    soundWin = null;

  preload() {
    this.load.image('abascalvox', 'media/img/diputados/abascalvox.webp');
    this.load.image('aitorpnv', 'media/img/diputados/aitorpnv.webp');
    this.load.image('albasumar', 'media/img/diputados/albasumar.webp');
    this.load.image('amaiavox', 'media/img/diputados/amaiavox.webp');
    this.load.image('belarrapodemos', 'media/img/diputados/belarrapodemos.webp');
    this.load.image('diazsumar', 'media/img/diputados/diazsumar.webp');
    this.load.image('enekopsoe', 'media/img/diputados/enekopsoe.webp');
    this.load.image('escanoblanco', 'media/img/diputados/escanoblanco.webp');
    this.load.image('feijoopp', 'media/img/diputados/feijoopp.webp');
    this.load.image('imanolpnv', 'media/img/diputados/imanolpnv.webp');
    this.load.image('javierpp', 'media/img/diputados/javierpp.webp');
    this.load.image('mertxebildu', 'media/img/diputados/mertxebildu.webp');
    this.load.image('mirenpodemos', 'media/img/diputados/mirenpodemos.webp');
    this.load.image('sanchezpsoe', 'media/img/diputados/sanchezpsoe.webp');

    this.load.image('congreso', 'media/img/congreso//congreso_EU.png');
    this.load.image('fila0', 'media/img/congreso/fila0_EU.png');
    this.load.image('fila1', 'media/img/congreso/fila1_EU.png');
    this.load.image('fila2', 'media/img/congreso/fila2_EU.png');
    this.load.image('fila3', 'media/img/congreso/fila3_EU.png');

    for(let i = 1; i <= 12; i++) {
        this.load.image(`coin${i}`, `media/img/monedas/${i.toString().padStart(3, '0')}.png`);
    }
    
    this.load.audio('music', 'media/audio/music.mp3');
    this.load.audio('wosh', 'media/audio/wosh.mp3');
    this.load.audio('opened', 'media/audio/Open.wav');
    this.load.audio('catched', 'media/audio/Catch.mp3');
    this.load.audio('failed', 'media/audio/Replay.wav');
    this.load.audio('ready', 'media/audio/Ready.mp3');
    this.load.audio('go', 'media/audio/Go.mp3');
    this.load.audio('win', 'media/audio/Win.mp3');
    this.load.audio('monedas', 'media/audio/monedas01.mp3');
  }
  create() {
    console.log('Create PlayGameScene');
    this.countdown = 20;
    this.score = 0;
    this.timeup = 300;
    this.staytime = 700;

    this.escanoblanco = this.add.image(0, 0, 'escanoblanco').setOrigin(0);
    
    this.fila4 = this.add.container(0, 0);
    this.fila3 = this.add.container(0, 0);
    this.fila2 = this.add.container(0, 0);
    this.fila1 = this.add.container(0, 0);
    this.fila0 = this.add.container(0, 0);
    this.fila4.add(this.add.image(0, 0, 'congreso').setOrigin(0));
    this.fila3.add(this.add.image(0, 0, 'fila3').setOrigin(0));
    this.fila2.add(this.add.image(0, 0, 'fila2').setOrigin(0));
    this.fila1.add(this.add.image(0, 0, 'fila1').setOrigin(0));
    this.fila0.add(this.add.image(0, 0, 'fila0').setOrigin(0));

    const optimalFontSize_TextScore = getOptimalFontSize(this, Puntuacion + ': ' + this.score, 250, 120, 'MyFont', 4);
    this.TextScore = addTextWithAdjustedPosition(this, 300, 100, optimalFontSize_TextScore, '#000000', Puntuacion + ': ' + this.score,'myFont');

    const optimalFontSize_TextReady = getOptimalFontSize(this, Atencion, 380, 150, 'MyFont', 4);
    this.TextReady = addCenteredText(this, Atencion, optimalFontSize_TextReady, 'MyFont', '#FFFF00');

    const optimalFontSize_TextCountdown = getOptimalFontSize(this, Tiempo +': ' + this.countdown, 250, 120, 'MyFont', 4);
    this.TextCountdown = addTextWithAdjustedPosition(this, 300, 150, optimalFontSize_TextCountdown, '#000000', Tiempo +': ' + this.countdown,'myFont');

// Paso 2: Crear la animación en la función create
    let frames = [];
    for(let i = 1; i <= 12; i++) {
        frames.push({ key: `coin${i}` });
    }
    //console.log('3');

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

    //console.log('4');
    this.loadSounds();

    this.style = {
      fontSize: '32px',
      fontFamily: 'MyFont',
      fill: '#FFFF00',
      backgroundColor: '#000000',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
      }
    };
    
    this.playSound('ready');
    
    this.music = this.sound.add('music');
    this.music.play();
                

    //console.log('6')
    this.startGame();
  }
  loadSounds() {
    this.soundMusic = this.sound.add('music');
    this.soundMusic = this.sound.add('wosh');
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
      { x: 236, y: 526 },
      { x: 417, y: 526 },
      { x: 601, y: 526 },
      { x: 782, y: 526 },
      { x: 124, y: 696 },
      { x: 319, y: 696 },
      { x: 506, y: 696 },
      { x: 697, y: 696 },
      { x: 894, y: 696 },
      { x: 200, y: 866 },
      { x: 398, y: 866 },
      { x: 598, y: 866 },
      { x: 798, y: 866 },
      { x: 316, y: 1053 },
      { x: 524, y: 1053 },
      { x: 734, y: 1053 }
      // ... (agrega las demás posiciones aquí)
    ];

  for (var i = 0; i < this.positions.length; i++) {
    let currentPosition = this.positions[i];
    this.positionImage = this.add.image(currentPosition.x, currentPosition.y -10, '').setOrigin(0.5);
    if (currentPosition.y === 526) this.fila4.add(this.positionImage);
    if (currentPosition.y === 696) this.fila3.add(this.positionImage);
    if (currentPosition.y === 866) this.fila2.add(this.positionImage);
    if (currentPosition.y === 1053) this.fila1.add(this.positionImage);

    this.positionImage.setDisplaySize(30, 30);
    this.positionImage.setInteractive();
    //console.log('ADDED IMAGE');
    this.positionImage.on('pointerdown', () => this.increaseScore(currentPosition.x, currentPosition.y));
    this.images.push(this.positionImage);
  }

    return this.images;
  }
  decreaseCountdown() {
    this.countdown--;

    this.TextCountdown.setText(Tiempo+': ' + this.countdown);

    if (this.countdown == 15) {
        this.music.setRate(1.04);
    }
      
    if (this.countdown == 13) {
        this.music.setRate(1.06);
    }
      
    if (this.countdown == 11) {
        this.music.setRate(1.10);
    }
      
    if (this.countdown == 10){
        this.wosh = this.sound.add('wosh');
        this.wosh.setVolume(2);
        this.wosh.play();
        const optimalFontSize_TextDeprisa = getOptimalFontSize(this, Deprisa, 380, 150, 'MyFont', 4);
        this.TextDeprisa = addCenteredText(this, Deprisa, optimalFontSize_TextDeprisa, 'MyFont', '#FFFF00');
        this.music.setRate(1.12);
        this.timeup=200
        this.staytime=50;
    }
      
    if (this.countdown == 9) {
        this.TextDeprisa.destroy();
    }
      
    if (this.countdown == 5) {
        this.music.setRate(1.15);
    }

    if (this.countdown === 0) {
        this.music.stop();
        this.registry.set('score', this.score);
        this.scene.start('GameOverScene', { puntuacion: this.score });

        if (this.score >0 ) this.playSound('win'); else this.playSound('failed');
    }

  }
  playSound(sound) {
    //console.log('playSound called '+sound);

    switch (sound) {
      case 'music':
        if (this.soundMusic) this.soundMusic.play(); else console.log('Sound not found');
        break;
      case 'wosh':
        if (this.soundWosh) this.soundWosh.play(); else console.log('Sound not found');
        break;
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
    //console.log('startReady called');
    this.TextReady.destroy();

    this.playSound('go');

    this.positionImages = this.createPositionImages();


    this.ReloadGreenCircleTimer();

    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: this.decreaseCountdown,
      callbackScope: this,
      loop: true
    });

    //this.startGame();

  }
  ReloadGreenCircleTimer () {
    this.showNextImage();
    this.greenCircleTimer = this.time.addEvent({
      delay: this.timeup+this.staytime,
      callback: this.ReloadGreenCircleTimer,
      callbackScope: this,
      loop: false
    });
  }
}

class GameOverScene extends Phaser.Scene {

  contador = 0;
  textContent = ""
  textTitle = ""
  mensajes = 0;
  moreButton = "";

  style = {
    fontSize: '50px',
    fontFamily: 'MyFont',
    fill: '#FFFFFF',
    wordWrap: { width: 850, useAdvancedWrap: true }
  }

  styleTitle = {
    fontSize: '75px',
    fontFamily: 'MyFont',
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
    this.load.image('background', 'media/img/Background_EU.png');
    //this.load.css('myfont', 'myfont.css');

  }
  startGame() {
    // Cargo escena del juego
    console.log('PlayGameScene Scene Called');
    if (this.sound.context.state === 'suspended') {
      this.sound.context.resume();
    }
    this.scene.start('PlayGameScene');
  }

  nextText() {
    console.log('nextText called');

    //incremento el contador de mensajes
    this.mensajes= (this.mensajes+1)%6;
    this.updateText();
  }

  previousText() {
    console.log('previousText called');

    this.mensajes -= 1;
    if (this.mensajes < 0) this.mensajes = 6;
    this.updateText();
  }

  //Reinicia el timer countdownTimer
  restartTimer() {
    if(this.countdownTimer) this.countdownTimer.remove();
    this.countdownTimer = this.time.addEvent({
      delay: 9000,
      callback: this.nextText,
      callbackScope: this,
      loop: true
    });
  }

  create() {

    this.mensajes = 0;
    this.add.image(0, 0, 'background').setOrigin(0);
    this.cameras.main.setBackgroundColor('#FFFFFF');

    // Verificar la puntuación en el registro
    let score = this.registry.get('score');
    console.log('Puntuación:', score); // Verificar que la puntuación se obtiene correctamente

// Función para obtener el token y luego las puntuaciones
// Función para obtener el token y luego las puntuaciones
// Función para obtener el token y luego las puntuaciones
// Función para obtener el token y luego las puntuaciones
function obtenerTokenYpuntuaciones() {
    return fetch('./php/inicio_juego.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                console.log('Token obtenido:', data.token);
                let sessionToken = data.token;
                return fetch('./php/obtener_puntuaciones.php?token=' + sessionToken)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    });
            } else {
                throw new Error('No se pudo obtener el token');
            }
        })
        .then(data => {
            console.log('Puntuaciones obtenidas:', data);
            mostrarPopUp(data.top3_day, data.top3_world);
        })
        .catch(error => {
            console.error('Error en la llamada AJAX:', error);
        });
}

// Función para obtener el token y luego las puntuaciones
function obtenerTokenYpuntuaciones() {
    return fetch('./php/inicio_juego.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                console.log('Token obtenido:', data.token);
                let sessionToken = data.token;
                return fetch('./php/obtener_puntuaciones.php?token=' + sessionToken)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    });
            } else {
                throw new Error('No se pudo obtener el token');
            }
        })
        .then(data => {
            console.log('Puntuaciones obtenidas:', data);
            mostrarPopUp(data.top3_day, data.top3_world);
        })
        .catch(error => {
            console.error('Error en la llamada AJAX:', error);
        });
}

// Función para mostrar el popup
function mostrarPopUp(top3_day, top3_world) {
    return new Promise((resolve, reject) => {
        let modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.padding = '20px';
        modal.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        modal.style.zIndex = '1000';
        modal.style.borderRadius = '15px';
        modal.style.textAlign = 'center';
        modal.style.width = '300px';
        modal.style.border = '2px solid #FFA500';

        let mensajeElemento = document.createElement('h1');
        let descripcionElemento = document.createElement('p');
        let input;
        let botonEnviar;
        let showInput = false;


        if (score == 0 || score <= top3_day ) {
            mensajeElemento.textContent = title_NoTop;
            descripcionElemento.textContent = text_NoTop;
            mensajeElemento.style.color = '#FF4500';
        } else if (score > top3_day && score <= top3_world) {
            mensajeElemento.textContent = title_TopDay;
            descripcionElemento.textContent = text_TopDay;
            showInput = true;
            mensajeElemento.style.color = '#FF8C00';
        } else {
            mensajeElemento.textContent = title_TopWorld;
            descripcionElemento.textContent = text_TopWorld;
            showInput = true;
            mensajeElemento.style.color = '#32CD32';
        }

        mensajeElemento.style.marginBottom = '10px';
        modal.appendChild(mensajeElemento);

        descripcionElemento.style.color = '#333';
        modal.appendChild(descripcionElemento);

        if (showInput) {
            input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 3;
            input.style.marginTop = '10px';
            input.style.padding = '5px';
            input.style.borderRadius = '5px';
            input.style.border = '1px solid #ccc';
            modal.appendChild(input);

            botonEnviar = document.createElement('button');
            botonEnviar.textContent = 'Enviar';
            botonEnviar.style.marginTop = '15px';
            botonEnviar.style.padding = '10px 20px';
            botonEnviar.style.border = 'none';
            botonEnviar.style.backgroundColor = '#FFA500';
            botonEnviar.style.backgroundImage = 'linear-gradient(45deg, #FFA500, #FF4500)';
            botonEnviar.style.color = '#fff';
            botonEnviar.style.borderRadius = '5px';
            botonEnviar.style.cursor = 'pointer';

            botonEnviar.onclick = function() {
                let iniciales = input.value;
                if (iniciales && iniciales.length === 3 && /^[A-Za-z]{3}$/.test(iniciales)) {
                    document.body.removeChild(modal);
                    resolve(iniciales);
                } else {
                    alert('Iniciales inválidas. Asegúrate de ingresar 3 letras.');
                }
            };

            modal.appendChild(botonEnviar);
        } else {
            setTimeout(() => {
                document.body.removeChild(modal);
                reject('No score achieved');
            }, 2000);
        }

        document.body.appendChild(modal);
    }).then(iniciales => {
        enviarPuntuacion(iniciales);
    }).catch(error => {
        console.error('Error al obtener las iniciales:', error);
    });
}

// Función para enviar las iniciales y la puntuación al servidor
function enviarPuntuacion(iniciales) {
    fetch('./php/inicio_juego.php')
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Crear un objeto FormData y agregar los datos
                let formData = new FormData();
                formData.append('iniciales', iniciales.toUpperCase());
                formData.append('puntuacion', score);
                formData.append('token', data.token);

                // Enviar el formulario con el token incluido
                fetch('./php/guardar_puntuacion.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(result => {
                    alert(result); // Mostrar el resultado en un alert para mayor visibilidad
                    // Lógica adicional después de guardar la puntuación (si es necesario)
                })
                .catch(error => {
                    console.error('Error al guardar la puntuación:', error);
                    alert('Error al guardar la puntuación: ' + error.message); // Mostrar el error en un alert
                });
            } else {
                console.error('No se pudo obtener el token');
                alert('No se pudo obtener el token'); // Mostrar el error en un alert
            }
        })
        .catch(error => {
            console.error('Error en la llamada AJAX:', error);
            alert('Error en la llamada AJAX: ' + error.message); // Mostrar el error en un alert
        });
}

// Llamar a la función para obtener el token y las puntuaciones, y mostrar el popup
//obtenerTokenYpuntuaciones();


    //this.add.text(120, 10, '¡Enhorabuena!', { fontSize: '32px', fontFamily: 'Arial', fill: '#000000' });
    //this.add.text(20, 50, '¡Has eliminado a '+this.contador+ ' diputados!', { fontSize: '32px', fontFamily: 'Arial' , fill: '#000000' });
    this.textTitle = this.add.text(115, 320, '', this.styleTitle)
    this.textContent = this.add.text(115, 406, '', this.style );

    this.messagesindicator = this.add.text(385, 770, '🟠 ⚪ ⚪ ⚪ ⚪ ⚪', { fontSize: '16px', fill: '#FFFFFF80' });

    this.nextButton = this.add.text(955, 546, '▶', { fontSize: '52px', fill: '#FFFFFF' });
    this.nextButton.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.nextButton.on('pointerup', () => {
      //Reinicia el timer countdownTimer
      this.restartTimer()
      this.nextText();
    });
    this.previousButton = this.add.text(35, 546, '◀', { fontSize: '52px', fill: '#FFFFFF' });
    this.previousButton.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.previousButton.on('pointerup', () => {
      this.restartTimer()
      this.previousText();
    });

    //Arranco el timer y pinto el texto con valor 0
    this.restartTimer();
    this.updateText();

    // Boton de jugar de nuevo
    this.startButton = this.add.text(549, 842, Jugar, {
      fontSize: '42px',
      fontFamily: 'MyFont',
      fill: '#FFFFFF'
    }).setOrigin(0);
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on('pointerdown', this.startGame);

    // Enlace a la web de Escaños en Blanco
    this.moreButton = this.add.rectangle(250, 870, 360, 150, 0xFFFFFF, 0); // Añade un rectángulo semi-transparente
    this.moreButton.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.moreButton.on('pointerup', () => {
      window.open('https://escanos.org', '_blank'); // Abre el enlace en una nueva pestaña
    });


    //Botón de compartir
    this.link = this.add.text(880, 845, 'X', { fontSize: '42px', fontFamily: 'MyFont', fill: '#FFFFFF10'});
    this.link.setInteractive({ useHandCursor: true });  // Hace que el cursor cambie a una mano al pasar por encima
    this.link.on('pointerup', () => {

        if (navigator.share) {
         try{ navigator.share({
           title: 'Dales donde más les duele: Dales en los escaños)',
             text: 'Ayúdame a eliminar unos cuantos escaños en los parlamentos. ¡Dales donde más les duele! ¡Dales en los escaños! #dalesenlosescaños http://escanos.org/dalesenlosescanos/index.html',
         });
          console.log('compartir ok');
            } catch(error) {
           console.error('compartir error: ',error);
         }
        }
      else
        {

        if(this.contador <= 1) {
          window.open('https://twitter.com/intent/tweet?text=Ayúdame a eliminar unos cuantos escaños en el Parlamento %0A%0A http://escanos.org/dalesenlosescanos/index.html %0A%0A Sigue a @escanosenblanco y ¡Dales donde más les duele!&hashtags=dalesenlosescaños' , '_blank'); // Abre el enlace en una nueva pestaña
      }
      else
      {
        window.open('https://twitter.com/intent/tweet?text=¡He eliminado '+this.contador+ ' diputados!%0A%0AAyúdame a eliminar unos cuantos escaños http://escanos.org/dalesenlosescanos/index.html %0A%0A Sigue a @escanosenblanco y ¡dales donde más les duele!&hashtags=dalesenlosescaños' , '_blank'); // Abre el enlace en una nueva pestaña
      }
        }
    });

    /*
    this.countdownTimer = this.time.addEvent({
      delay: 9000,
      callback: this.nextText,
      callbackScope: this,
      loop: true
    });
    */

  }

  updateText() {
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
        //cambio el messageindicator
        this.messagesindicator.setText('🟠 ⚪ ⚪ ⚪ ⚪ ⚪');

        break;
      case 1:
        this.textTitle.setText(Quienessomos);
        this.textContent.setText(Somosungrupo);
        //cambio el messageindicator
        this.messagesindicator.setText('⚪ 🟠 ⚪ ⚪ ⚪ ⚪');

        break;
      case 2:
        this.textTitle.setText(Quequeremos);
        this.textContent.setText( Visibilizar );
        //cambio el messageindicator
        this.messagesindicator.setText('⚪ ⚪ 🟠 ⚪ ⚪ ⚪');
        break;
      case 3:
        this.textTitle.setText(Comolo);
        this.textContent.setText( Nospresentamos );
        //cambio el messageindicator
        this.messagesindicator.setText('⚪ ⚪ ⚪ 🟠 ⚪ ⚪');
        break;
      case 4:
        this.textTitle.setText(Estoes);
        this.textContent.setText(Siyahay14);
        //cambio el messageindicator
        this.messagesindicator.setText('⚪ ⚪ ⚪ ⚪ 🟠 ⚪');
        break;
      case 5:
        this.textTitle.setText(Comopuedo);
        this.textContent.setText( Comenta );
        //cambio el messageindicator
        this.messagesindicator.setText('⚪ ⚪ ⚪ ⚪ ⚪ 🟠');
        break;
      }


  }


  update() {
    // Actualiza el estado de esta escena en cada frame
  }
}

class AboutEB extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutEB' });
    }

    preload() {
    }

    create() {
        console.log('AboutEB started');
    }

    update() {
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.fonts.load('10pt "MyFont"').then(function() {
        config = {
            type: Phaser.AUTO,
            width: 1024,
            height: 1024,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [
                BaseScene,
                InitialScene, 
                InstructionsGame, 
                PlayGameScene, 
                GameOverScene, 
                AboutEB
            ]
        };

        var game = new Phaser.Game(config);
    });
});

const addTextWithAdjustedPosition = (scene, x, y, fontSize, color, text, font) => {
    
    let tempText = scene.add.text(0, 0, text, { 
        fontSize: fontSize, 
        fill: color,
        fontFamily: font
    });
    
    let textWidth = tempText.width;
    let textHeight = tempText.height;
    
    tempText.destroy();
    
    let posX = x - textWidth - 4;
    let posY = y - textHeight - 4;
    
    let textObject = scene.add.text(posX, posY, text, { 
        fontSize: fontSize, 
        fill: color,
        fontFamily: font
    });
    
    return textObject;
};


function addCenteredText(scene, text, fontSize, fontFamily, color, classCSS) {
    // Crear el texto con el tamaño de fuente especificado
    let textObject = scene.add.text(0, 0, text, {
        fontSize: fontSize + 'px',
        fontFamily: fontFamily,
        color: color,
        align: 'center'
    });

    // Centrar el texto en la pantalla
    textObject.setOrigin(0.5, 0.5);
    textObject.x = scene.cameras.main.width / 2;
    textObject.y = scene.cameras.main.height / 2;

    return textObject;
}

const getOptimalFontSize = (scene, text, maxWidth, maxHeight, fontFamily, padding) => {
    let minFontSize = 1;
    let maxFontSize = 200;
    let bestFitFontSize = minFontSize;

    const adjustedMaxWidth = maxWidth - 2 * padding;
    const adjustedMaxHeight = maxHeight - 2 * padding;

    while (minFontSize <= maxFontSize) {
        let fontSize = Math.floor((minFontSize + maxFontSize) / 2);
        let dimensions = measureText(scene, text, fontSize, fontFamily);

        if (dimensions.width <= adjustedMaxWidth && dimensions.height <= adjustedMaxHeight) {
            bestFitFontSize = fontSize; // Actualiza el mejor ajuste si se cumplen las condiciones
            minFontSize = fontSize + 1;
        } else {
            maxFontSize = fontSize - 1;
        }
    }
    return bestFitFontSize;
};

function measureText(scene, text, fontSize, fontFamily) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = `${fontSize}px ${fontFamily}`;
    let lines = text.split('\n');
    let maxWidth = 0;
    let totalHeight = 0;

    lines.forEach(line => {
        let metrics = ctx.measureText(line);
        maxWidth = Math.max(maxWidth, metrics.width);
        totalHeight += Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);
    });

    return {
        width: maxWidth,
        height: totalHeight
    };
}