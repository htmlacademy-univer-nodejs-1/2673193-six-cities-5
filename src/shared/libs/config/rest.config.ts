import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { config, DotenvParseOutput } from 'dotenv';
import { configRestSchema, RestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(private readonly logger: Logger) {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Cannot read .env file. The file may not exist.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });
    this.config = configRestSchema.getProperties();
    this.logger.info('.env file parsed successfully!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
