import * as XLSX from 'xlsx';

class AdministradorExcel {
    wb!: XLSX.WorkBook;
    sheet!: XLSX.Sheet;

    constructor(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target!.result as ArrayBuffer);
            this.wb = XLSX.read(data, { type: 'array' });
            this.sheet = this.wb.Sheets[this.wb.SheetNames[0]];
        };
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };
        reader.readAsArrayBuffer(file);
    }

    getMatriz(): string[][] {
        let dataTable: string[][] = [];
        if (!this.sheet) {
            console.error('Sheet not loaded yet.');
            return dataTable;
        }

        const range = this.sheet['!ref'] ? XLSX.utils.decode_range(this.sheet['!ref']) : null;
        const numRows = range ? range.e.r + 1 : 0;
        const numCols = range ? range.e.c + 1 : 0;

        for (let i = 0; i < numRows; i++) {
            dataTable[i] = [];
            for (let j = 0; j < numCols; j++) {
                const cellAddress = { c: j, r: i };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                const cell = this.sheet[cellRef];
                dataTable[i][j] = cell ? cell.v.toString() : '';
            }
        }
        return dataTable;
    }

    returnExcelString(): string {
        let result = '';
        if (!this.sheet) {
            console.error('Sheet not loaded yet.');
            return result;
        }

        const range = this.sheet['!ref'] ? XLSX.utils.decode_range(this.sheet['!ref']) : null;
        if (range) {
            for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
                for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                    const cell = this.sheet[cellAddress];
                    if (cell) {
                        switch (cell.t) {
                            case 's':
                                result += cell.v + ' | ';
                                break;
                            case 'n':
                                result += cell.v + ' | ';
                                break;
                            default:
                                throw new Error('Unexpected cell type');
                        }
                    }
                }
                result += '\n';
            }
        }
        return result;
    }
}

export default AdministradorExcel;