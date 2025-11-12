import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/component.enum.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { DefaultExceptionFilter, ExceptionFilter } from '../shared/libs/rest/index.js';

export function createRestApplicaionContainer() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();

  return container;
}
