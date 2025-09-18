import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';
import { ERROR, INFO, SUCCESS } from '../cli-theme.js';


export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const content: unknown = JSON.parse(jsonContent);
    if (!isPackageJsonConfig(content)) {
      throw new Error('Failed to parse json content.');
    }

    return content.version;
  }


  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(SUCCESS('Version: ') + INFO(`${version}`));
    } catch (error: unknown) {
      console.error(ERROR(`Failed to read version from ${this.filePath}`));
      if (error instanceof Error) {
        console.error(ERROR(error.message));
      }
    }
  }
}

type PackageJsonConfig = {
  version: string;
}

function isPackageJsonConfig(value: unknown): value is PackageJsonConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}
