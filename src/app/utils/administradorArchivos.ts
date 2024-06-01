import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ArchivoXML from './modelo/archivoXML';

export async function downloadFilesAsZip(dataList: ArchivoXML[], fileType: string) {
    const zip = new JSZip();

    // Crea un archivo para cada string en dataList y lo agrega al ZIP
    dataList.forEach((data, index) => {
        const fileName = `${data.fileName}${fileType}`;
        zip.file(fileName, data.retornarArchivoString());
    });

    // Genera el archivo ZIP y descárgalo
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'files.zip');
}
