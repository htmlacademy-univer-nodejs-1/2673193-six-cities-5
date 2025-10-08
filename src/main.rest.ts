import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);
  const app = new RestApplication(logger, config);
  await app.init();
}

bootstrap();
