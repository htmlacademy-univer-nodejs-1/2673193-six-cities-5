import { Command } from './command.interface.js';
import { theme } from '../cli-theme.js';

function welcome() {
  console.log(theme.success('Welcome to Six Cities CLI'));
  console.log(theme.success(`
#    ███████╗██╗██╗  ██╗     ██████╗██╗████████╗██╗███████╗███████╗
#    ██╔════╝██║╚██╗██╔╝    ██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝
#    ███████╗██║ ╚███╔╝     ██║     ██║   ██║   ██║█████╗  ███████╗
#    ╚════██║██║ ██╔██╗     ██║     ██║   ██║   ██║██╔══╝  ╚════██║
#    ███████║██║██╔╝ ██╗    ╚██████╗██║   ██║   ██║███████╗███████║
#    ╚══════╝╚═╝╚═╝  ╚═╝     ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝
#
`));
}

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    welcome();
    console.info(theme.title(
      'Программа для подготовки данных для REST API сервера.\n'
    ));
    console.info(theme.info(
      `Пример: ${theme.command('cli.js --<command> [--arguments]')}\n`
    ));
    console.info(theme.title('Команды:'));
    console.info(theme.command('--version') + theme.info(': #выводит номер версии'));
    console.info(theme.command('--help') + theme.info(': #печатает эту справку'));
    console.info(theme.command('--generate <n> <filepath> <url>') + theme.info(': #генерирует заданное количество тестовых предложений, взятых с сервера по данному адресу'));
    console.info(theme.command('--import <filepath> <db_username> <db_password> <dbhost> <dbname> <salt>') + theme.info(': #импортирует в базу данных информацию из tsv-файла (укажите путь)'));
  }
}
