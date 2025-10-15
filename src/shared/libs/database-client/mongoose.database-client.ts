import * as Mongoose from 'mongoose';
import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/index.js';
import { Component } from '../../types/index.js';
import { inject, injectable } from 'inversify';
import { ConnectionManager, Connection } from '../connection-manager/index.js';
import { RestConfig } from '../config/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;
  private connectionManager: ConnectionManager<string>;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly restConfig?: RestConfig
  ) {
    this.isConnected = false;

    const selfConnection: Connection<string> = {
      connect: async (uri: string) => this.rawConnect(uri),
      disconnect: async () => this.rawDisconnect(),
      isConnected: () => this.isConnected
    };

    const retryCount = this.restConfig?.get('MONGO_RETRY_COUNT');
    const retryTimeout = this.restConfig?.get('MONGO_RETRY_TIMEOUT');
    const serviceName = 'MongoDB';

    this.connectionManager = new ConnectionManager(
      this.logger,
      () => selfConnection,
      { retryCount, retryTimeout, serviceName }
    );
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    await this.connectionManager.connect(uri);
  }

  public async disconnect(): Promise<void> {
    await this.connectionManager.disconnect();
  }

  private async rawConnect(uri: string): Promise<void> {
    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;
  }

  private async rawDisconnect(): Promise<void> {
    await this.mongoose.disconnect?.();
    this.isConnected = false;
  }
}
