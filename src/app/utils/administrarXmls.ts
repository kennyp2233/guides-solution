import * as fs from 'fs';
import { BigInteger } from 'big-integer'; // Necesitas una librería de BigInteger para TypeScript
import CodigoManifiesto from './modelo/codigoManifiesto';
import ArchivoXML from './modelo/archivoXML';
import { downloadFilesAsZip } from './administradorArchivos';

class AdministrateXMLS {
    private xmls: string[][];
    private secuencial: BigInteger;
    private datos: Map<string, string>;
    private fechaEmbarque: string;
    private pais: string;
    private listaArchivos: ArchivoXML[] = [];

    constructor(xmls: string[][], secuencial: BigInteger, fechaEmbarque: string, pais: string) {
        this.xmls = xmls;
        this.secuencial = secuencial;
        this.fechaEmbarque = fechaEmbarque;
        this.pais = pais;
        this.datos = new Map<string, string>();
    }

    public async crearArchivos(): Promise<string> {
        let filename: BigInteger = this.secuencial;

        for (const xml of this.xmls) {
            this.setData(xml);

            const cm: CodigoManifiesto = new CodigoManifiesto(
                this.datos.get("Aerolinea")!,
                this.datos.get("Aduana")!,
                parseInt(this.datos.get("Year")!),
                parseInt(this.datos.get("Numero")!),
                parseInt(this.datos.get("MSN")!)
            );

            const formattedXml = [
                cm.TraderAssignedReferenceID(),
                this.secFormat(this.datos.get("MSN")!),
                this.secFormat(this.datos.get("HSN")!),
                "23902040",
                String(Math.floor(parseFloat(this.datos.get("PCS")!))),
                String(Math.floor(parseFloat(this.datos.get("KGS")!))),
                this.datos.get("FechaEmbarque")!,
                this.datos.get("HAWB")!,
                this.datos.get("DestinoAWB")!,
                "0" + this.hwbFormat(this.datos.get("AWB")!),
                this.datos.get("NombreC")!,
                this.datos.get("DireccionC")!,
                this.datos.get("NombreN")!,
                this.datos.get("DireccionN")!,
                this.datos.get("NombreE")!,
                this.datos.get("NumDocum")!,
                this.datos.get("DireccionE")!,
                this.datos.get("Pais")!,
                this.hwbFormat(this.datos.get("DAE")!),
                this.secFormat(this.datos.get("HSN")!)
            ];

            const generatedXML = new ArchivoXML(formattedXml, filename.toString() + "S");
            this.listaArchivos.push(generatedXML);
            /*
            const filePath = `${path}\\${filename}S.xml`;
            await fs.promises.writeFile(filePath, generatedXML.retornarArchivoString());
            */
            filename = filename.add(1);
        }

        this.listaArchivos.map((archivo, index) => {

        });
        downloadFilesAsZip(this.listaArchivos, '.xml');
        return filename.toString();
    }

    private secFormat(sec: string): string {
        let r = sec;
        while (r.length < 4) {
            r = "0" + r;
        }
        return r;
    }

    private hwbFormat(hwb: string): string {
        let r = hwb;
        r = r.replace(/\s+/g, '');
        r = r.replace(/-/g, '');
        return r;
    }

    private setData(xml: string[]): void {
        this.datos.set("Aduana", xml[0]);
        this.datos.set("Year", xml[1]);
        this.datos.set("Aerolinea", xml[2]);
        this.datos.set("Numero", xml[3]);
        this.datos.set("AWB", xml[5]);
        this.datos.set("DestinoAWB", xml[9]);
        this.datos.set("HAWB", xml[18]);
        this.datos.set("PCS", xml[19]);
        this.datos.set("KGS", xml[20]);
        this.datos.set("NombreC", xml[21]);
        this.datos.set("DireccionC", xml[22]);
        this.datos.set("NombreN", xml[26]);
        this.datos.set("DireccionN", xml[27]);
        this.datos.set("DAE", xml[31]);
        this.datos.set("NombreE", xml[32]);
        this.datos.set("DireccionE", xml[33]);
        this.datos.set("NumDocum", xml[35]);
        this.datos.set("MSN", xml[36]);
        this.datos.set("HSN", xml[37]);

        this.datos.set("FechaEmbarque", this.fechaEmbarque);
        this.datos.set("Pais", this.pais);
    }
}

export { AdministrateXMLS };