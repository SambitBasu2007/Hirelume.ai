declare module 'pdf2json' {
    import { EventEmitter } from 'events';

    interface PDFParserData {
        Pages: Array<{
            Texts: Array<{
                R: Array<{ T: string }>;
            }>;
        }>;
    }

    class PDFParser extends EventEmitter {
        constructor();
        parseBuffer(buffer: Buffer): void;
        getRawTextContent(): string;
        on(event: 'pdfParser_dataReady', listener: () => void): this;
        on(event: 'pdfParser_dataError', listener: (err: unknown) => void): this;
    }

    export = PDFParser;
}