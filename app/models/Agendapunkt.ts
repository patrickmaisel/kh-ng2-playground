export class Agendapunkt {
    constructor(titel: string, beschreibung: string, ergebnis: string) {
        this.Titel = titel;
        this.Beschreibung = beschreibung;
        this.Ergebnis = ergebnis;
    };

    public Titel: string;
    public Beschreibung: string;
    public Ergebnis: string;
}