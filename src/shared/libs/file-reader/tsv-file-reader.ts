import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, { encoding: 'utf8', highWaterMark: CHUNK_SIZE});
    let remainigData = '';
    let nextLinePos = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainigData += chunk.toString();

      while ((nextLinePos = remainigData.indexOf('\n')) >= 0) {
        const row = remainigData.slice(0, nextLinePos + 1);
        remainigData = remainigData.slice(++nextLinePos);
        importedRowCount++;
        await new Promise((resolve) => {
          this.emit('line', row, resolve);
        });
      }
    }
    this.emit('end', importedRowCount);
  }
}

