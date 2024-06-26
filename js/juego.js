

class BaseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BaseScene' });
    }

    preload() {
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

        const optimalFontSize = getOptimalFontSize(this, 'v3.03', 75, 50, 'Arial', 4);
        const optimalPositionBottomRight = getOptimalSquarePosition(this, 'v3.03', optimalFontSize, 'Arial', 4, 'bottom-right');
        this.TextVersionBottomRight = addTextWithAdjustedPosition(this, optimalPositionBottomRight.x, optimalPositionBottomRight.y, optimalPositionBottomRight.fontSize, '#FFFFFF', 'v3.01', 'Arial');
    }

    update() {

    }

    addTextPlay() {

        if (this.TextPlay) {
            this.TextPlay.destroy();
        }

        const optimalFontSize_TextPlay = getOptimalFontSize(this, Jugar, 260, 75, 'MyFont', 4);
        this.TextPlay = addCenteredText(this, Jugar, optimalFontSize_TextPlay, 'MyFont', '#FFFFFF');

        this.TextPlay.y = 865;
        this.TextPlay.setInteractive({ useHandCursor: true });
        this.TextPlay.on('pointerup', () => {
            this.scene.start('PlayGameScene');
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
        this.loopReload=0;
        this.historialImages = [];
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

            const imagesPosibles = this.gameImagesToDisplay.filter(image => !this.historialImages.includes(image));
            this.randomImage = Phaser.Math.RND.pick(imagesPosibles);
            this.historialImages.push(this.randomImage);

            if (this.historialImages.length > 4) {
              this.historialImages.shift();
            }

        this.randomPositionImage = Phaser.Math.RND.pick(this.positionImages);
        this.originalY = this.randomPositionImage.y;

        if (this.randomImage) {
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
    imagesToDisplay = ['escanoblanco', 'pp','psoe', 'sumar', 'vox', 'podemos',
                      'junts','ceus', 'ahora_rep'];
    gameImagesToDisplay = [...this.imagesToDisplay];
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

    this.load.image('escanoblanco', 'media/img/diputados/escanoblanco.webp');
    this.load.image('pp', 'media/img/diputados/pp.webp');
    this.load.image('psoe', 'media/img/diputados/psoe.webp');
    this.load.image('sumar', 'media/img/diputados/sumar.webp');
    this.load.image('vox', 'media/img/diputados/vox.webp');
    this.load.image('podemos', 'media/img/diputados/podemos.webp');
    this.load.image('junts', 'media/img/diputados/junts.webp');
    this.load.image('ceus', 'media/img/diputados/ceus.webp');
    this.load.image('ahora_rep', 'media/img/diputados/ahora_rep.webp');

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

    this.countdown = 20;
    this.score = 0;

    this.optimalFontSize_TextScore = getOptimalFontSize(this, Puntuacion + ': 100', 330, 100, 'MyFont', 4);
    this.optimalPosition_TextScore = getOptimalSquarePosition(this, Puntuacion + ': 100', this.optimalFontSize_TextScore, 'MyFont', 4,'top-left');

    this.optimalFontSize_TextCountdown = getOptimalFontSize(this, Tiempo +': ' + this.countdown, 330, 100, 'MyFont', 4);
    this.optimalPosition_TextCountdown = getOptimalSquarePosition(this, Tiempo +': ' + this.countdown, this.optimalFontSize_TextCountdown, 'MyFont', 4,'top-left');

    this.optimalFontSize_TextReady = getOptimalFontSize(this, Atencion, 380, 150, 'MyFont', 4);

    }
    create() {
    console.log('Create PlayGameScene');
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


    this.TextReady = addCenteredText(this, Atencion, this.optimalFontSize_TextReady, 'MyFont', '#FFFF00');

    this.TextScore = addTextWithAdjustedPosition(this, this.optimalPosition_TextScore.x+12, this.optimalPosition_TextScore.y+8 , this.optimalFontSize_TextScore, '#000000', Puntuacion + ': ' + this.score,'myFont');

    this.TextCountdown = addTextWithAdjustedPosition(this, this.optimalPosition_TextCountdown.x+12, this.optimalPosition_TextCountdown.y+80, this.optimalFontSize_TextCountdown, '#000000', Tiempo +': ' + this.countdown,'myFont','top-left');

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
	//juego no dura nada
	//this.countdown=0;
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

        this.scene.start('GameOverScene', { puntuacion: this.score, originGame: true });

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

    constructor() {
        super({ key: 'GameOverScene' });
        console.log('Constructor GameOverScene');

        this.startGame = this.startGame.bind(this);
    }

    init(data) {
        console.log('init GameOverScene ' + data.puntuacion);
        this.contador = data.puntuacion;
        this.originGame = data.originGame;
        console.log('Vienes del juego: ', data.originGame)
    }

    preload() {
        this.load.image('background', 'media/img/Background_EU.png');
    }

    startGame() {
        console.log('PlayGameScene Scene Called');
        if (this.sound.context.state === 'suspended') {
          this.sound.context.resume();
        }
        this.scene.start('PlayGameScene');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0);

        let score = this.contador;

        var textTitleInput;
        var textInput;
        var createInput;
        var top3_day;
        var top3_world;

        this.ejecutarPuntuaciones(null,score);

        this.addTextPlay();

        var textTitlePuntuacion;
        var textHasDejado;
        var textPuntuacion;
        var textDineroPuntuacion;
        //https://www.newtral.es/eurodiputado-salario-dietas-asistentes-sueldo/20231219/
        //Sueldo bruto	9.975,42 euros mensuales
        //Sueldo neto	7.776,06 euros mensuales
        //Dietas	4.778 euros menusales
        //Viajes	Hasta 4.716 euros anuales
        //Asistentes	28.412 euros mensuales
        const costeanual = 616014;

        if (score == 0 ) {
            this.textTitlePuntuacion = Quepaso;
            this.textHasDejado =  vuelveajugar;
            this.textPuntuacion =  '';
            this.textDineroPuntuacion = dalesescano;
        } else {
            this.textTitlePuntuacion = TituloFinal1;
            this.textHasDejado =  Hasdejado;
            this.textPuntuacion =  score + escanosovacios;
            this.textDineroPuntuacion = habriasahorrado + (score * costeanual).toLocaleString('es-ES') + '€';
        }

        this.addTextTitlePuntuacion();
        this.addTextPuntuacion();
        this.addTextDineroPuntuacion();

        this.moreButton = this.add.rectangle(263, 926, 340, 134, 0xFFFFFF, 0);
        this.moreButton.setInteractive({ useHandCursor: true });
        this.moreButton.on('pointerup', () => {
            this.scene.start('AboutEB', { puntuacion: score });
        });

        this.link = this.add.circle(890, 925, 55, 0xFFFFFF, 0);
        this.link.setInteractive({ useHandCursor: true });
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
            } else {
                if(this.contador <= 1) {
                    window.open('https://twitter.com/intent/tweet?text=Ayúdame a eliminar unos cuantos escaños en el Parlamento %0A%0A http://escanos.org/dalesenlosescanos/index.html %0A%0A Sigue a @escanosenblanco y ¡Dales donde más les duele!&hashtags=dalesenlosescaños' , '_blank');
                } else {
                    window.open('https://twitter.com/intent/tweet?text=¡He eliminado '+score+ ' diputados!%0A%0AAyúdame a eliminar unos cuantos escaños http://escanos.org/dalesenlosescanos/index.html %0A%0A Sigue a @escanosenblanco y ¡dales donde más les duele!&hashtags=dalesenlosescaños' , '_blank');
                    }
                }
            });
    }

    update() {

    }

    async ejecutarPuntuaciones(iniciales = null,score) {
        const token = await this.iniciarJuego();
        const puntuacion = score;

        if (token) {
            if (iniciales) {
                const resultadoGuardado = await this.guardarPuntuacion(token, iniciales, puntuacion);
                console.log(resultadoGuardado.status);
                if (resultadoGuardado.status !== 'success') {
                    console.error('Error al guardar la puntuación: ' + resultadoGuardado.message);
                    return;
                }
            }

            const puntuaciones = await this.obtenerPuntuaciones();
            console.log(puntuaciones.status);
            if (puntuaciones.status == 'success') {
                const { top3_day = [], top3_world = [] } = puntuaciones;
                let top3_list_day = top3_day;
                let top3_list_world = top3_world;

                let top3_day_score = top3_list_day.length >= 3 ? top3_list_day[2].puntuacion : 0;
                let top3_world_score = top3_list_world.length >= 3 ? top3_list_world[2].puntuacion : 0;

                if (this.originGame) {
                    this.refreshText(score, top3_day_score, top3_world_score);
                }
                if (iniciales) {
                    this.createInput = false;
                }

                if (this.createInput) {
                    if (isTactilScreen()){
                    this.createInput = false;
                        var userInput = prompt(`${this.textTitleInput}\n${this.textInput}`);
                        while (userInput.toLowerCase().length !== 3){
                            alert("Introduce 3 caracteres. Intenta de nuevo.");
                            userInput = prompt(`${this.textTitleInput}\n${this.textInput}`);
                        }
                        this.ejecutarPuntuaciones(userInput.toUpperCase(),score);
                    } else {
                        this.addTextTitleInput();
                        this.addMessageInput();
                        this.createBoxInput(score,top3_list_day, top3_list_world);
                    }
                    this.createInput = false;
                } else {
                    this.showScores(top3_list_day, top3_list_world);
                }
            } else {
                console.error('No se pudieron obtener las puntuaciones.');
                this.addTextError();
            }
        } else {
            console.error('No se pudo obtener el token del juego.');
        }
    };

    async guardarPuntuacion(token, iniciales, puntuacion) {
        try {
            const response = await fetch('./php/guardar_puntuacion.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, iniciales, puntuacion })
            });

            const data = await response.json();

            if (data.status === 'success') {
                console.log('Puntuación guardada correctamente');
            } else {
                console.log('Error al guardar la puntuación: ', data.message);
            }
            return data;
        } catch (error) {
            console.error('Error en la solicitud de guardado: ', error);
            return null;
        }
    }
    async obtenerPuntuaciones() {
        try {
            const response = await fetch('./php/obtener_puntuaciones.php');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener las puntuaciones: ', error);
            return null;  // Asegúrate de manejar esto adecuadamente en caso de error
        }
    }
    async iniciarJuego() {
        try {
            const response = await fetch('./php/inicio_juego.php');
            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Error al iniciar el juego: ', error);
            return null;
        }
    }
    
    addTextError() {
        if (this.TextError) {
            this.TextError.destroy();
        }

        const optimalFontSize_textError = getOptimalFontSize(this, servererror, 700, 550, 'MyFont', 4);

        this.TextError = addCenteredText(this, servererror, optimalFontSize_textError, 'MyFont', '#FFFFFF')

        this.TextError.y = 650;
    }


    addTextPlay() {
        if (this.TextPlay) {
            this.TextPlay.destroy();
        }

        const optimalFontSize_TextPlay = getOptimalFontSize(this, Jugar, 315, 70, 'MyFont', 4);
        this.TextPlay = addTextWithCustomX(this, Jugar, optimalFontSize_TextPlay, 'MyFont', '#FFFFFF', 640)

        this.TextPlay.y = 925;
        this.TextPlay.setInteractive({ useHandCursor: true });
        this.TextPlay.on('pointerup', () => {
            this.scene.start('PlayGameScene');
        });
    }

    refreshText(score, top3_day, top3_world) {
        console.log(score + ' ' + top3_day + ' ' + top3_world)
        if (score == 0 || score <= top3_day ) {
            this.createInput = false;
        } else if (score > top3_day && score <= top3_world) {
            this.textTitleInput = title_TopDay;
            this.textInput =  text_TopDay;
            this.createInput = true;
        } else {
            this.textTitleInput = title_TopWorld;
            this.textInput =  text_TopWorld;
            this.createInput = true;

        }
    }

    addTextTitlePuntuacion() {
        if (this.TextTitlePuntuacion) {
            this.TextTitlePuntuacion.destroy();
        }

        const optimalFontSize_TextTitlePuntuacion = getOptimalFontSize(this, this.textTitlePuntuacion, 475, 80, 'MyFont', 4);
        this.TextTitlePuntuacion = addTextWithCustomX(this, this.textTitlePuntuacion, optimalFontSize_TextTitlePuntuacion, 'MyFont', '#FFFF00', 735)

        this.TextTitlePuntuacion.y = 100;
    }
    addTextPuntuacion() {
    if (this.TextPuntuacion) {
            this.TextPuntuacion.destroy();
        }

        const optimalFontSize_TextPuntuacion = getOptimalFontSize(this, this.textHasDejado + '\n' + this.textPuntuacion, 475, 160, 'MyFont', 4);
        this.TextPuntuacion = addTextWithCustomX(this, this.textHasDejado + '\n' + this.textPuntuacion, optimalFontSize_TextPuntuacion, 'MyFont', '#FFFFFF', 735)

        this.TextPuntuacion.y = 215;
    }
    addTextDineroPuntuacion() {
        if (this.TextDineroPuntuacion) {
            this.TextDineroPuntuacion.destroy();
        }

        const optimalFontSize_TextDineroPuntuacion = getOptimalFontSize(this, this.textDineroPuntuacion, 475, 130, 'MyFont', 4);
        this.TextDineroPuntuacion = addTextWithCustomX (this, this.textDineroPuntuacion, optimalFontSize_TextDineroPuntuacion, 'MyFont', '#ffff00', 735)

        this.TextDineroPuntuacion.y = 335;
    }

    addTextTitleInput() {
        if (this.TextTitleInput) {
            this.TextTitleInput.destroy();
        }

        const optimalFontSize_textTitleInput = getOptimalFontSize(this, this.textTitleInput, 315, 70, 'MyFont', 4);

        this.TextTitleInput = addCenteredText(this, this.textTitleInput, optimalFontSize_textTitleInput, 'MyFont', '#FFFFFF')

        this.TextTitleInput.y = 500;
    }
    addMessageInput() {
        if (this.messageInput) {
            this.messageInput.destroy();
        }
        const optimalFontSize_messageInput = getOptimalFontSize(this, this.textInput, 900, 130, 'MyFont', 4);

        this.messageInput = addCenteredText(this, this.textInput, optimalFontSize_messageInput, 'MyFont', '#FFFFFF')

        this.messageInput.y = 630;
    }
    createBoxInput(score,top3_list_day,top3_list_world) {

    this.inputBox = this.add.graphics();
    this.inputBox.fillStyle(0xffffff, 1);
    this.inputBox.fillRect(355, 725, 350, 50);

    this.inputText = this.add.text(134, 750, 'Escribe aquí...', {
        fontSize: '28px',
        fill: '#000000',
        align: 'center'
    });

    this.inputText.setOrigin(0.5);
    this.inputText.x = this.cameras.main.width / 2;

    this.inputText.setInteractive();
    this.inputText.on('pointerdown', () => {
        this.inputText.setText('');
        this.inputActive = true;
    });

    this.input.keyboard.on('keydown', (event) => {
        if (this.inputActive) {
            if (event.key === 'Backspace') {
                this.inputText.text = this.inputText.text.slice(0, -1);
            } else if (event.key.length === 1) {
                if (this.inputText.text.length < 3) {
                    this.inputText.text += event.key;
                }
            }
        }
    });

    this.input.on('pointerdown', (pointer) => {
        if (pointer.x < 100 || pointer.x > 900 || pointer.y < 700 || pointer.y > 750) {
            this.inputActive = false;
            if (this.inputText.text === '') {
                this.inputText.setText(escribeaqui);
            }
        }
    });

    this.sendButton = this.add.text(648, 730, '▶', { fontSize: '32px', fill: '#000000' });
        this.sendButton.setInteractive({ useHandCursor: true });
        this.sendButton.on('pointerup', () => {
            this.messageInput.destroy();
            this.TextTitleInput.destroy();
            this.inputBox.destroy();
            this.sendButton.destroy();
            this.ejecutarPuntuaciones(this.inputText.text.toUpperCase(),score);
            this.inputText.destroy();
    });
}

    showScores(top3_list_day,top3_list_world){
        if (this.scoreTitle) {
            this.scoreTitle.destroy();
        }

        const optimalFontSize_scoreTitle = getOptimalFontSize(this, mejorespuntuaciones, 500, 700, 'MyFont', 4);

        this.scoreTitle = addCenteredText(this, mejorespuntuaciones, optimalFontSize_scoreTitle, 'MyFont', '#f9fe11')

        this.scoreTitle.y = 500;

        const optimalFontSize_scoreTops = getOptimalFontSize(this, totales, 200, 350, 'MyFont', 4);

        if (this.scoreTitleDay) {
            this.scoreTitleDay.destroy();
        }

        this.scoreTitle = addTextWithCustomX (this, diarias, optimalFontSize_scoreTops, 'MyFont', '#5bf9fd', 256)

        this.scoreTitle.y = 550;

       if (this.scoreTitleTotal) {
            this.scoreTitleTotal.destroy();
        }

        this.scoreTitleTotal = addTextWithCustomX (this, totales, optimalFontSize_scoreTops, 'MyFont', '#6dbffe', 768)

        this.scoreTitleTotal.y = 550;

        //Puntuaciones

        const optimalFontSize_Scores = getOptimalFontSize(this, "XXX", 150, 70, 'MyFont', 4);

        for (let i = 0; i < top3_list_day.length; i++) {
            const dayIndex = i + 1;
            const yOffset = 625 + i * 75;

            if (this[`initialsDay_${dayIndex}`]) {
                this[`initialsDay_${dayIndex}`].destroy();
            }

            if (this[`scoreDay_${dayIndex}`]) {
                this[`scoreDay_${dayIndex}`].destroy();
            }

            this[`initialsDay_${dayIndex}`] = addTextWithCustomX(this, top3_list_day[i].iniciales, optimalFontSize_Scores, 'MyFont', '#FFFFFF', 150);
            this[`scoreDay_${dayIndex}`] = addTextWithCustomX(this, top3_list_day[i].puntuacion, optimalFontSize_Scores, 'MyFont', '#FFFFFF', 350);

            this[`initialsDay_${dayIndex}`].y = yOffset;
            this[`scoreDay_${dayIndex}`].y = yOffset;
        }

        for (let i = 0; i < top3_list_world.length; i++) {
            const dayIndex = i + 1;
            const yOffset = 625 + i * 75;

            if (this[`initialsWorld_${dayIndex}`]) {
                this[`initialsWorld_${dayIndex}`].destroy();
            }

            if (this[`scoreWorld_${dayIndex}`]) {
                this[`scoreWorld_${dayIndex}`].destroy();
            }

            this[`initialsWorld_${dayIndex}`] = addTextWithCustomX(this, top3_list_world[i].iniciales, optimalFontSize_Scores, 'MyFont', '#FFFFFF', 650);
            this[`scoreWorld_${dayIndex}`] = addTextWithCustomX(this, top3_list_world[i].puntuacion, optimalFontSize_Scores, 'MyFont', '#FFFFFF', 850);

            this[`initialsWorld_${dayIndex}`].y = yOffset;
            this[`scoreWorld_${dayIndex}`].y = yOffset;
        }
    }
}

class AboutEB extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutEB' });
        this.updateText = this.updateText.bind(this);
    }

    contador = 0;
    textContent = ""
    textTitle = ""
    mensajes = 0;
    moreButton = "";

    style = {
        fontSize: '45px',
        fontFamily: 'MyFont',
        fill: '#092a54',
        wordWrap: { width: 620, useAdvancedWrap: true }

    }
    styleTitle = {
        fontSize: '65px',
        fontFamily: 'MyFont',
        fontWeight: 'bold',
        fill: '#e6b300',
        wordWrap: { width: 880, useAdvancedWrap: true }

    }
    preload() {
        this.load.image('info', 'media/img/info.png');
        this.load.image('bandera_esp', 'media/img/idiomas/boton_castellano.png');
        this.load.image('bandera_eus', 'media/img/idiomas/boton_euskera.png');
        this.load.image('bandera_cat', 'media/img/idiomas/boton_catalan.png');
        this.load.image('bandera_gal', 'media/img/idiomas/boton_gallego.png');
        this.load.image('boton', 'media/img/Boton.png');
    }
    nextText() {
        this.mensajes= (this.mensajes+1)%6;
        this.updateText();
    }
    previousText() {
        console.log('previousText called');

        this.mensajes -= 1;
        if (this.mensajes < 0) this.mensajes = 4;
        this.updateText();
    }
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
        console.log('AboutEB started');
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'info').setOrigin(0.5, 0.5);

        this.addImageFlag(bandera);

        this.mensajes = 0;

        this.textTitle = this.add.text(150, 300, '', this.styleTitle)
        this.textContent = this.add.text(250, 416, '', this.style );

        this.messagesindicator = this.add.text(420, 834, '🟠 ⚪ ⚪ ⚪ ⚪ ', { fontSize: '16px', fill: '#FFFFFF80' });

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


        this.link = this.add.circle(890, 925, 55, 0xFFFFFF, 0);
        this.link.setInteractive({ useHandCursor: true });
        this.link.on('pointerup', () => {
            this.scene.start('GameOverScene', { puntuacion: this.contador, originGame: false });
        });

        this.moreButton = this.add.rectangle(560, 940, 430, 150, 0xFFFFFF, 0);
        this.moreButton.setInteractive({ useHandCursor: true });
        this.moreButton.on('pointerup', () => {
            window.open('https://escanos.org', '_blank');
        });

        const optimalFontSize = getOptimalFontSize(this, 'v3.02', 75, 50, 'Arial', 4);
        const optimalPositionBottomRight = getOptimalSquarePosition(this, 'v3.02', optimalFontSize, 'Arial', 4, 'bottom-right');
        this.TextVersionBottomRight = addTextWithAdjustedPosition(this, optimalPositionBottomRight.x, optimalPositionBottomRight.y, optimalPositionBottomRight.fontSize, '#FFFFFF', 'v3.01', 'Arial');

        this.events.on('shutdown', this.shutdown, this);
    }
    updateText() {
        switch (this.mensajes) {
          case 0:
            this.textTitle.setText(Quienessomos);
            this.textContent.setText(Somosungrupo);
            //cambio el messageindicator
            this.messagesindicator.setText('🟠 ⚪ ⚪ ⚪ ⚪ ');

            break;
          case 1:
            this.textTitle.setText(Quequeremos);
            this.textContent.setText( Visibilizar );
            //cambio el messageindicator
            this.messagesindicator.setText('⚪ 🟠 ⚪ ⚪ ⚪ ');
            break;
          case 2:
            this.textTitle.setText(Comolo);
            this.textContent.setText( Nospresentamos );
            //cambio el messageindicator
            this.messagesindicator.setText('⚪ ⚪ 🟠 ⚪ ⚪ ');
            break;
          case 3:
            this.textTitle.setText(Estoes);
            this.textContent.setText(Siyahay14);
            //cambio el messageindicator
            this.messagesindicator.setText('⚪ ⚪ ⚪ 🟠 ⚪ ');
            break;
          case 4:
                console.log(Comopuedo)
            this.textTitle.setText(Comopuedo);
            this.textContent.setText( Comenta );
            //cambio el messageindicator
            this.messagesindicator.setText('⚪ ⚪ ⚪ ⚪ 🟠');
            break;
          }


      }
    init(data) {
        console.log('init AboutEB ' + data.puntuacion);
        this.contador = data.puntuacion;
    }
    update() {

    }
    shutdown() {
        if (this.ImageFlag) {
            this.ImageFlag.destroy();
            this.ImageFlag = null;
        }
    }
    addImageFlag(bandera_actual) {
        if (!this.ImageFlag) {
            this.ImageFlag = this.add.image(890, 140, bandera).setOrigin(0.5);
            this.ImageFlag.setInteractive({ useHandCursor: true });
            this.ImageFlag.on('pointerup', () => {
                changeLanguage();
                this.addImageFlag(bandera)
                this.updateText()
            });
        } else {
            this.ImageFlag.setTexture(bandera_actual);
        }
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
                PlayGameScene,
                GameOverScene,
                AboutEB
            ]
        };

        var game = new Phaser.Game(config);
        fetch('./php/inicio_juego.php')
            .then(response => response.json())
            .then(data => {
            const token = data.token;
            sessionStorage.setItem('game_token', token);
        });
    });
});

const addTextWithAdjustedPosition = (scene, x, y, fontSize, color, text, font) => {
    // Añadir texto temporalmente para medir su tamaño
    let tempText = scene.add.text(0, 0, text, {
        fontSize: fontSize + 'px',
        fill: color,
        fontFamily: font
    });

    let textWidth = tempText.width;
    let textHeight = tempText.height;

    tempText.destroy();

    let posX = x + 4;
    let posY = y + 4;

    let textObject = scene.add.text(posX, posY, text, {
        fontSize: fontSize + 'px',
        fill: color,
        fontFamily: font
    });

    return textObject;
};
const addTextWithCustomX = (scene, text, fontSize, fontFamily, color, posX) => {
    // Crear el texto con el tamaño de fuente especificado
    let textObject = scene.add.text(0, 0, text, {
        fontSize: fontSize + 'px',
        fontFamily: fontFamily,
        color: color,
        align: 'center'
    });

    // Centrar el texto en la pantalla en el eje Y y usar posX para el eje X
    textObject.setOrigin(0.5, 0.5);
    textObject.x = posX;
    textObject.y = scene.cameras.main.height / 2;

    return textObject;
}
const addCenteredText = (scene, text, fontSize, fontFamily, color) =>  {
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
const measureText = (scene, text, fontSize, fontFamily) => {
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
const getOptimalSquarePosition = (scene, text, fontSize, fontFamily, padding, position) => {
    let dimensions = measureText(scene, text, fontSize, fontFamily);

    let posX, posY;

    if (position === 'top-left') {
        posX = padding;
        posY = 0;
    } else if (position === 'top-right') {
        posX = scene.scale.width - dimensions.width - padding;
        posY = 0;
    } else if (position === 'bottom-right') {
        posX = scene.scale.width - dimensions.width - padding;
        posY = scene.scale.height - dimensions.height - padding - fontSize * 0.2;
    } else if (position === 'bottom-left') {
        posX = padding;
        posY = scene.scale.height - dimensions.height - padding - fontSize * 0.2;
    }
    return { x: posX, y: posY, fontSize: fontSize };
};

const isTactilScreen = () => {
    return (
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0
    );
};
