import { Command } from './command.interface.js';
import axios from 'axios';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { appendFile } from 'node:fs/promises';
import { ERROR, SUCCESS } from '../cli-theme.js';

export class GenerateCommand implements Command {
  private initData!: MockServerData;

  private async load(url: string) {
    try {
      this.initData = (await axios.get(url)).data;
    } catch {
      throw new Error(`Cannot load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const dataGenerator = new TSVOfferGenerator(this.initData);
    for (let i = 0; i < offerCount; i++) {
      await appendFile(
        filepath, `${dataGenerator.generate()}\n`,
        {encoding: 'utf8'}
      );
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(SUCCESS(`File ${filepath} was created.`));
    } catch (error: unknown) {
      console.error(ERROR('Cannot generate data'));
      if (error instanceof Error) {
        console.error(ERROR(error.message));
      }
    }
  }
}
