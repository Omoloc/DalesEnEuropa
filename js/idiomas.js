// Variables globales
let bandera,
    TituloFinal1,
    Quepaso, 
    vuelveajugar,
    unescanovacio,
    dalesescano,
    Hasdejado,
    escanosovacios,
    habriasahorrado,
    Quienessomos,
    Somosungrupo,
    Quequeremos,
    Visibilizar,
    Comolo,
    Nospresentamos,
    Estoes,
    Siyahay14,
    Comopuedo,
    Comenta,
    Puntuacion,
    Tiempo,
    Atencion,
    Deprisa,
    Jugar,
    title_TopDay,
    text_TopDay,
    title_TopWorld,
    text_TopWorld,
    escribeaqui,
    mejorespuntuaciones,
    diarias,
    totales,
    servererror;

const languages = {
    esp: {
        bandera: 'bandera_esp',
        TituloFinal1: "¡Enhorabuena!",
        Quepaso: "¿Qué ha pasado?",
        vuelveajugar: "Vuelve a jugar y\n no pulses en el Escaño en Blanco\n sólo a los políticos.",
        dalesescano: "¡Dales en el escaño!",
        Hasdejado: "¡Has dejado",
        escanosovacios: " escaños vacíos!",
        habriasahorrado: "Habrías ahorrado\nmás de ",
        unescanovacio: " ¡Has dejado un escaño vacío!\n\n Si esto fuera el Parlamento Europeo, habrías ahorrado más de ",
        Quienessomos: "¿Quiénes somos?",
        Somosungrupo: "Somos un grupo de ciudadanos cansados de la clase política que no encontramos utilidad ni en el voto nulo, blanco ni la abstención",
        Quequeremos: "¿Qué queremos?",
        Visibilizar: "Visibilizar la falta de representación, llamar la atención de los medios y abrir un debate sobre las carencias de nuestro sistema.",
        Comolo: "¿Cómo lo hacemos?",
        Nospresentamos: "Nos presentamos a las elecciones para dejar escaños vacíos. De esta forma nadie cobrará por ese escaño. Nosotros tampoco.",
        Estoes: "¿Esto es posible?",
        Siyahay14: "Sí. Ya hemos dejado vacías 14 concejalías y un Ayuntamiento. ¡Ayúdanos a dejar un escaño vacío en el Parlamento Europeo!",
        Comopuedo: "¿Cómo ayudar?",
        Comenta: "Comenta nuestra propuesta con tus amigos, familiares y conocidos. Síguenos en redes sociales y comparte nuestras publicaciones.",
        Puntuacion: "Puntuación",
        Tiempo: "Tiempo",
        Atencion: "¡Atención!",
        Deprisa: "¡Deprisa!",
        Jugar: "Jugar",
        title_TopDay : '¡Bien!',
        text_TopDay : `Has conseguido ahorrar para entrar\n en el TOP 3 diario.\n Introduce tus 3 iniciales:`,
        title_TopWorld : '¡Enhorabuena!',
        text_TopWorld : `Has conseguido ahorrar para entrar\n en el TOP 3 diario y global.\n Introduce tus 3 iniciales:`,
        escribeaqui : 'Escribe aquí...',
        mejorespuntuaciones : 'Mejores Puntuaciones',
        diarias : 'Diarias',
        totales : 'Totales',
        servererror: 'No se han podido\n cargar las puntuaciones'
    },
    eus: {
        bandera: 'bandera_eus',
        TituloFinal1: "Zorionak!",
        Quepaso: "Zer gertatu da?",
        vuelveajugar: "Jokatu berriro,\n eta ez sakatu Aulki Zurian,\n politikariei bakarrik.",
        dalesescano: "Eman euren eserlekuan!",
        unescanovacio: "Aulki bat hutsik utzi duzu!\n\nHau Eusko Legebiltzarra balitz, kopuru hau baino gehiago aurreztuko zenuen: ",
        Hasdejado: "Utzi zara",
        escanosovacios: " eserleku hutsik \nutzi dituzu!",
        habriasahorrado: "Baino gehiago\naurreztuko zenuke ",
        Quienessomos: "Nor gara?",
        Somosungrupo: "Klase politikoarekin nekatuta gauden herritar talde bat gara, eta ez diogu baliorik aurkitzen boto nuloari, zuriari edo abstentzioari",
        Quequeremos: "Zer nahi dugu?",
        Visibilizar: "Errepresentazio-falta ikusaraztea, komunikabideen arreta erakartzea eta gure sistemaren gabeziei buruzko eztabaida sortzea.",
        Comolo: "Nola egiten dugu?",
        Nospresentamos: "Hauteskundeetara aurkezten gara eserleku hutsak uzteko. Horrela, inork ez du kobratuko eserleku horrengatik. Guk ere ez.",
        Estoes: "Hau posible da?",
        Siyahay14: "Bai. Hutsik utzi ditugu 14 zinegotzigo eta udal bat. Lagun iezaguzu Eusko Legebiltzarrean aulki huts bat uzten!",
        Comopuedo: "Nola lagundu?",
        Comenta: "Aipatu gure proposamena zure lagun, senide eta ezagunei. Jarraitu sare sozialetan, eta partekatu gure argitalpenak.",
        Puntuacion: "Puntuazioa",
        Tiempo: "Denbora",
        Atencion: "Hadi!",
        Deprisa: "Azkar ibili!",
        Jugar: "Jolastu",
        title_TopDay : '¡Bien!',
        text_TopDay : `Has conseguido ahorrar para entrar\n en el TOP 3 diario.\n Introduce tus 3 iniciales:`,
        title_TopWorld : '¡Enhorabuena!',
        text_TopWorld : `Has conseguido ahorrar para entrar\n en el TOP 3 diario y global.\n Introduce tus 3 iniciales:`,
        escribeaqui : 'Escribe aquí...',
        mejorespuntuaciones : 'Mejores Puntuaciones',
        diarias : 'Diarias',
        totales : 'Totales',
        servererror: 'Ezin izan dira\n kargatu puntuazioak'    },
    cat: {
        bandera: 'bandera_cat',
        TituloFinal1 : "Enhorabona!",
        Quepaso : "Què ha passat?",
        vuelveajugar : "Torna a jugar i no pitgis l'Escó en Blanc, només als polítics.\n\n Dóna'ls a l'escó!",
        Hasdejado : "Has deixat ",
        escanosovacios : " escons buits!\n\nSi això fos el Parlament Europeu, hauries estalviat més de ",
        unescanovacio : " Has deixat un escó buit!\n\n Si això fos el Parlament Europeu, hauries estalviat més de ",
        Quienessomos : "Qui som?",
        Somosungrupo : "Som un grup de ciutadans cansats de la classe política que no trobem utilitat en el vot nul, ni en el blanc ni en l'abstenció",
        Quequeremos : "Què volem?",
        Visibilizar : "Visibilitzar la manca de representació, cridar l'atenció dels mitjans i obrir un debat sobre les mancances del nostre sistema.",
        Comolo : "Com ho fem?",
        Nospresentamos : "Ens presentem a les eleccions per deixar escons buits. D'aquesta manera ningú cobrarà per l'escó. Nosaltres tampoc.",
        Estoes : "Això és possible?",
        Siyahay14 : "Sí. Ja hem deixat buides 14 regidories i un Ajuntament. Ajuda'ns a deixar un escó buit al Parlament Europeu!",
        Comopuedo : "Com ajudar",
        Comenta : "Comenta la nostra proposta amb els teus amics, familiars i coneguts. Segueix-nos a les xarxes socials i comparteix les nostres publicacions.",
        Puntuacion : "Puntuació",
        Tiempo : "Temps",
        Atencion : "Atenció!",
        Deprisa : "De pressa!!",
        Jugar : "Jugar",
        title_TopDay: 'Bé!',
        text_TopDay: `Has aconseguit estalviar per entrar\n en el TOP 3 diari.\n Introdueix les teves 3 inicials:`,
        title_TopWorld: 'Enhorabona!',
        text_TopWorld: `Has aconseguit estalviar per entrar\n en el TOP 3 diari i global.\n Introdueix les teves 3 inicials:`,
        escribeaqui: 'Escriu aquí...',
        mejorespuntuaciones: 'Millors Puntuacions',
        diarias: 'Diàries',
        totales: 'Totals',
        servererror: 'No shan pogut\n carregar les puntuacions'
    },
    gal: {
        bandera: 'bandera_gal',
        TituloFinal1: "Parabéns!",
        Quepaso: "Que pasou?",
        vuelveajugar: "Volve xogar e\n non pulses no Escaño en Branco\n só aos políticos.",
        dalesescano: "Dalles no escano!",
        Hasdejado: "Deixaches",
        escanosovacios: " escanos baleiros!",
        habriasahorrado: "Aforrarías\nmáis de ",
        unescanovacio: " Deixaches un escano baleiro!\n\n Se isto fora o Parlamento Europeo, aforrarías máis de ",
        Quienessomos: "Quen somos?",
        Somosungrupo: "Somos un grupo de cidadáns cansos da clase política que non atopamos utilidade nin no voto nulo, branco nin na abstención",
        Quequeremos: "Que queremos?",
        Visibilizar: "Visibilizar a falta de representación, chamar a atención dos medios e abrir un debate sobre as carencias do noso sistema.",
        Comolo: "Como o facemos?",
        Nospresentamos: "Presentámonos ás eleccións para deixar escanos baleiros. Deste xeito ninguén cobrará por ese escano. Nós tampouco.",
        Estoes: "Isto é posible?",
        Siyahay14: "Si. Xa deixamos baleiras 14 concellarías e un Concello. Axúdanos a deixar un escano baleiro no Parlamento Europeo!",
        Comopuedo: "Como axudar?",
        Comenta: "Comenta a nosa proposta cos teus amigos, familiares e coñecidos. Síguenos nas redes sociais e comparte as nosas publicacións.",
        Puntuacion: "Puntuación",
        Tiempo: "Tempo",
        Atencion: "Atención!",
        Deprisa: "A présa!",
        Jugar: "Xogar",
        title_TopDay: "Ben!",
        text_TopDay: `Conseguiches aforrar para entrar\n no TOP 3 diario.\n Introduce as túas 3 iniciais:`,
        title_TopWorld: "Parabéns!",
        text_TopWorld: `Conseguiches aforrar para entrar\n no TOP 3 diario e global.\n Introduce as túas 3 iniciais:`,
        escribeaqui: "Escribe aquí...",
        mejorespuntuaciones: "Mellores Puntuacións",
        diarias: "Diarias",
        totales: "Totais",
        servererror: 'Non se puideron\n cargar as puntuacións'
    }
};

class LanguageManager {
    constructor(languages) {
        this.languages = languages;
        this.languageKeys = Object.keys(languages);
        this.currentIndex = -1;
    }

    get currentLanguage() {
        return this.languages[this.languageKeys[this.currentIndex]];
    }

    changeLanguage() {
        let initialIndex = this.currentIndex;
        do {
            this.currentIndex = (this.currentIndex + 1) % this.languageKeys.length;
            if (this.currentIndex === initialIndex) {
                this.currentIndex = -1;  // Regresar al inicio si no hay más traducciones disponibles
                break;
            }
        } while (!this.isLanguageAvailable(this.languageKeys[this.currentIndex]));

        return this.currentLanguage || false;
    }

    isLanguageAvailable(langCode) {
        const spanishWordsCount = Object.keys(this.languages['esp']).length;
        const langWordsCount = Object.keys(this.languages[langCode]).length;
        return langWordsCount >= spanishWordsCount;
    }

    getNextAvailableLanguageFlag() {
        let tempIndex = this.currentIndex;
        let initialIndex = tempIndex;
        do {
            tempIndex = (tempIndex + 1) % this.languageKeys.length;
            if (tempIndex === initialIndex) {
                return this.languages['esp'].bandera;  // Regresar a 'esp' si no hay más traducciones disponibles
            }
        } while (!this.isLanguageAvailable(this.languageKeys[tempIndex]));

        return this.languages[this.languageKeys[tempIndex]].bandera;
    }
}

const languageManager = new LanguageManager(languages);

const changeLanguage = () => {
    const newLanguageData = languageManager.changeLanguage();
    const nextFlag = languageManager.getNextAvailableLanguageFlag();

    if (newLanguageData) {
        // Actualizar las variables globales al nuevo idioma
        bandera = nextFlag;
        TituloFinal1 = newLanguageData.TituloFinal1;
        dalesescano = newLanguageData.dalesescano;
        habriasahorrado = newLanguageData.habriasahorrado;
        unescanovacio = newLanguageData.unescanovacio;
        Quepaso = newLanguageData.Quepaso;
        vuelveajugar = newLanguageData.vuelveajugar;
        Hasdejado = newLanguageData.Hasdejado;
        escanosovacios = newLanguageData.escanosovacios;
        Quienessomos = newLanguageData.Quienessomos;
        Somosungrupo = newLanguageData.Somosungrupo;
        Quequeremos = newLanguageData.Quequeremos;
        Visibilizar = newLanguageData.Visibilizar;
        Comolo = newLanguageData.Comolo;
        Nospresentamos = newLanguageData.Nospresentamos;
        Estoes = newLanguageData.Estoes;
        Siyahay14 = newLanguageData.Siyahay14;
        Comopuedo = newLanguageData.Comopuedo;
        Comenta = newLanguageData.Comenta;
        Puntuacion = newLanguageData.Puntuacion;
        Tiempo = newLanguageData.Tiempo;
        Atencion = newLanguageData.Atencion;
        Deprisa = newLanguageData.Deprisa;
        Jugar = newLanguageData.Jugar;
    } else {
        console.log('No more languages available or language not supported');
    }
}
