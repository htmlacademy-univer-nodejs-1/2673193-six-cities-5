import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

export class CliApp {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered.`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`Default command ${this.defaultCommand} is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processComand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
