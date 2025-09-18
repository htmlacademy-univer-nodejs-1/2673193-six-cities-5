type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArgs: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let curCommand = '';

    for (const arg of cliArgs) {
      if (arg.startsWith('--')) {
        curCommand = arg;
        parsedCommand[curCommand] = [];
      } else if (curCommand && arg) {
        parsedCommand[curCommand].push(arg);
      }
    }

    return parsedCommand;
  }
}
