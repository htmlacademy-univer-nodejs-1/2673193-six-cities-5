#!/usr/bin/env node
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Component } from './shared/types/index.js';
import 'reflect-metadata';
import { DatabaseClient } from './shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from './shared/libs/database-client/mongoose.database-client.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
