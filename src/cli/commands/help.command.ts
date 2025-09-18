import { Command } from './command.interface.js';
import { INFO, COMMAND, TITLE, SUCCESS } from '../cli-theme.js';

function welcome() {
  console.log(SUCCESS('Welcome to Six Cities CLI'));
  console.log(SUCCESS(`
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
    console.info(TITLE(
      'Программа для подготовки данных для REST API сервера.\n'
    ));
    console.info(INFO(
      `Пример: ${COMMAND('cli.js --<command> [--arguments]')}\n`
    ));
    console.info(TITLE('Команды:'));
    console.info(COMMAND('--version') + INFO(': #выводит номер версии'));
    console.info(COMMAND('--help') + INFO(': #печатает эту справку'));
    console.info(COMMAND('--generate <n> <filepath> <url>') + INFO(': #генерирует заданное количество тестовых предложений, взятых с сервера по данному адресу'));
    console.info(COMMAND('--import <filepath>') + INFO(': #импортирует в базу данных информацию из tsv-файла (укажите путь)'));
  }
}
