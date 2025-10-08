import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const app = new RestApplication(logger);
  await app.init();
}

bootstrap();
