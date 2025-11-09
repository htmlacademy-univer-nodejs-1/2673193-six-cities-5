import { Logger } from '../logger/index.js';
import { Component } from '../../types/index.js';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { Connection, ConnectionConfig } from './connection.interface.js';

const DEFAULT_RETRY_COUNT = 5;
const DEFAULT_RETRY_TIMEOUT = 1000;
const DEFAULT_SERVICE_NAME = 'Service';

@injectable()
export class ConnectionManager<TConfig = unknown, TConnection extends Connection<TConfig> = Connection<TConfig>> {
  private connection: TConnection | null = null;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    private readonly connectionFct: () => TConnection,
    private readonly config: ConnectionConfig = {}
  ) {}

  public isConnected(): boolean {
    return this.connection?.isConnected() ?? false;
  }

  public async connect(config: TConfig): Promise<void> {
    if (this.isConnected()) {
      throw new Error(`${this.config.serviceName || DEFAULT_SERVICE_NAME} client already connected.`);
    }

    const retryCount = this.config.retryCount || DEFAULT_RETRY_COUNT;
    const retryTimeout = this.config.retryTimeout || DEFAULT_RETRY_TIMEOUT;
    const serviceName = this.config.serviceName || DEFAULT_SERVICE_NAME;

    this.logger.info(`Trying to connect to ${serviceName}..`);

    let attempt = 0;
    while (attempt < retryCount) {
      try {
        if (!this.connection) {
          this.connection = this.connectionFct();
        }

        await this.connection.connect(config);
        this.logger.info(`${serviceName} connected.`);

        return;
      } catch (error) {
        this.logger.error(`Failed to connect to ${serviceName}. Attempt ${++attempt}`, error as Error);
        this.connection = null;
        if (attempt < retryCount) {
          await setTimeout(retryTimeout);
        }
      }
    }

    throw new Error(`Unable to establish ${serviceName} connection after ${retryCount}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected() || !this.connection) {
      throw new Error(`Not connected to ${this.config.serviceName || DEFAULT_SERVICE_NAME}.`);
    }

    const serviceName = this.config.serviceName || DEFAULT_SERVICE_NAME;
    this.logger.info(`Disconnecting from ${serviceName}..`);

    await this.connection.disconnect();
    this.connection = null;

    this.logger.info(`${serviceName} disconnected.`);
  }
}
