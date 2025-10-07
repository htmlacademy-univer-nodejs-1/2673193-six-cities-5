import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';
import { theme } from '../cli-theme.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onEndImport(count: number) {
    console.log(theme.success('File was read successfully.'));
    console.info(`${count} rows imported.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onEndImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(theme.error(`Can't import data from file: ${filename}`));
      console.error(theme.error(`Details: ${getErrorMessage(error)}`));
    }
  }
}
