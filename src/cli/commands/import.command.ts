import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';
import { ERROR, SUCCESS } from '../cli-theme.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(SUCCESS('File was read successfully.'));
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(ERROR(`Can't import data from file: ${filename}`));
      console.error(ERROR(`Details: ${error.message}`));
    }
  }
}
