#!/usr/bin/env node
import { CliApp, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CliApp();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApp.processComand(process.argv);
}

bootstrap();
