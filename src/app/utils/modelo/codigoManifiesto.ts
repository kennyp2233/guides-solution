export default class CodigoManifiesto {
    aerolinea: string;
    aduana: string;
    year: number;
    numero: number;
    secuencialMadre: number;
    dae: string;

    constructor(
        aerolinea: string,
        aduana: string,
        year: number,
        numero: number,
        secuencialMadre: number,
        dae?: string
    ) {
        this.aerolinea = aerolinea;
        this.aduana = aduana;
        this.year = year;
        this.numero = numero;
        this.secuencialMadre = secuencialMadre;
        this.dae = dae || "";
    }


    TraderAssignedReferenceID(): string {
        return "CEC" + this.year + this.aerolinea + this.numero;
    }

    DAE(): string {
        return this.dae.split("-").join("");
    }
}