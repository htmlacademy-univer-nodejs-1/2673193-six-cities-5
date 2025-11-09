#!/usr/bin/env node
import 'reflect-metadata';
import { CliApp, HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CliApp();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApp.processComand(process.argv);
}

bootstrap();
