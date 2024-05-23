// Variables globales
let TituloFinal1, Quepaso, vuelveajugar, Hasdejado, escanosovacios, unescanovacio, Quienessomos, Somosungrupo, Quequeremos, Visibilizar, Comolo, Nospresentamos, Estoes, Siyahay14, Comopuedo, Comenta, Puntuacion, Tiempo, Atencion, Deprisa, Jugar, bandera;

const languages = {
    esp: {
        bandera: "media/img/idiomas/boton_castellano.png",
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
        bandera: "media/img/idiomas/boton_euskera.png",
        TituloFinal1: "Zorionak!",
        Quepaso: "Zer gertatu da?",
        vuelveajugar: "Jokatu berriro, eta ez sakatu Aulki Zurian, politikariei bakarrik.\n\nEman euren eserlekuan!",
        Hasdejado: " ",
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
        bandera: "media/img/idiomas/boton_catalan.png"
        // Agrega más traducciones aquí
    },
    gal: {
        bandera: "media/img/idiomas/boton_gallego.png"
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
        do {
            this.currentIndex = (this.currentIndex + 1) % this.languageKeys.length;
        } while (!this.isLanguageAvailable(this.languageKeys[this.currentIndex]));

        return this.currentLanguage || false;
    }

    isLanguageAvailable(langCode) {
        const spanishWordsCount = Object.keys(this.languages['esp']).length;
        const langWordsCount = Object.keys(this.languages[langCode]).length;
        return langWordsCount >= spanishWordsCount;
    }
}

const languageManager = new LanguageManager(languages);

const changeLanguage = () => {
        const currentLanguage = languageManager.changeLanguage();
    if (currentLanguage) {
        TituloFinal1 = currentLanguage.TituloFinal1;
        Quepaso = currentLanguage.Quepaso;
        vuelveajugar = currentLanguage.vuelveajugar;
        Hasdejado = currentLanguage.Hasdejado;
        escanosovacios = currentLanguage.escanosovacios;
        unescanovacio = currentLanguage.unescanovacio;
        Quienessomos = currentLanguage.Quienessomos;
        Somosungrupo = currentLanguage.Somosungrupo;
        Quequeremos = currentLanguage.Quequeremos;
        Visibilizar = currentLanguage.Visibilizar;
        Comolo = currentLanguage.Comolo;
        Nospresentamos = currentLanguage.Nospresentamos;
        Estoes = currentLanguage.Estores;
        Siyahay14 = currentLanguage.Siyahay14;
        Comopuedo = currentLanguage.Comopuedo;
        Comenta = currentLanguage.Comenta;
        Puntuacion = currentLanguage.Puntuacion;
        Tiempo = currentLanguage.Tiempo;
        Atencion = currentLanguage.Atencion;
        Deprisa = currentLanguage.Deprisa;
        Jugar = currentLanguage.Jugar;
        bandera = currentLanguage.bandera;
    
    } else {
        console.log('No more languages available or language not supported');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage();
});