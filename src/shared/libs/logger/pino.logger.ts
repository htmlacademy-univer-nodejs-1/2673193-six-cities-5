import { resolve } from 'node:path';
import { getCurrentModuleDirPath } from '../../helpers/index.js';
import { Logger } from './logger.interface.js';
import { pino, Logger as PinoInstance, transport } from 'pino';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        }
      ]
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created..');
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(null, message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(null, message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(null, message, ...args);
  }
}
