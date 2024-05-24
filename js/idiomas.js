// Variables globales
let bandera, TituloFinal1, info1, Quepaso, vuelveajugar, Hasdejado, escanosovacios, unescanovacio, Quienessomos, Somosungrupo, Quequeremos, Visibilizar, Comolo, Nospresentamos, Estoes, Siyahay14, Comopuedo, Comenta, Puntuacion, Tiempo, Atencion, Deprisa, Jugar;

const languages = {
    esp: {
        bandera: 'bandera_esp',
        info1: "¿Cómo se juega?\n\nDeberas evitar que los diputados\n\n se sienten en TU escaño\n\n del Parlamento Europeo\n\nVacía tantos escaños como puedas\n\n y ahórranos dinero a todos",
        TituloFinal1: "¡Enhorabuena!",
        Quepaso: "¿Qué ha pasado?",
        vuelveajugar: "Vuelve a jugar y no pulses en el Escaño en Blanco sólo a los políticos.\n\n ¡Dales en el escaño!",
        Hasdejado: "¡Has dejado ",
        escanosovacios: " escaños vacíos!\n\nSi esto fuera el Parlamento Europeo, habrías ahorrado más de ",
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
        Jugar: "Jugar"
    },
    eus: {
        bandera: 'bandera_eus',
        TituloFinal1: "Zorionak!",
        info1: "Nola jokatu?\n\nLegebiltzarkideei ZURE eserlekuan\n\n esertzea saihestu beharko zenuke\n\n Europako Parlamentuan\n\nHustu ahal duzun adina eserleku\n\n eta aurreztu iezaguzu diru guztia. ",
        Quepaso: "Zer gertatu da?",
        vuelveajugar: "Jokatu berriro, eta ez sakatu Aulki Zurian, politikariei bakarrik.\n\nEman euren eserlekuan!",
        Hasdejado: "Utzi zara",
        escanosovacios: " eserleku hutsik utzi dituzu!\n\nHau Eusko Legebiltzarra balitz, kopuru hau baino gehiago aurreztuko zenuen: ",
        unescanovacio: "Aulki bat hutsik utzi duzu!\n\nHau Eusko Legebiltzarra balitz, kopuru hau baino gehiago aurreztuko zenuen: ",
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
        Jugar: "Jolastu"
    },
    cat: {
        bandera: 'bandera_cat',
        // Agrega más traducciones aquí
    },
    gal: {
        bandera: 'bandera_gal',
        // Agrega más traducciones aquí
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
        info1 = newLanguageData.info1;
        Quepaso = newLanguageData.Quepaso;
        vuelveajugar = newLanguageData.vuelveajugar;
        Hasdejado = newLanguageData.Hasdejado;
        escanosovacios = newLanguageData.escanosovacios;
        unescanovacio = newLanguageData.unescanovacio;
        Quienessomos = newLanguageData.Quienessomos;
        Somosungrupo = newLanguageData.Somosungrupo;
        Quequeremos = newLanguageData.Quequeremos;
        Visibilizar = newLanguageData.Visibilizar;
        Comolo = newLanguageData.Comolo;
        Nospresentamos = newLanguageData.Nospresentamos;
        Estoes = newLanguageData.Estores;
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
