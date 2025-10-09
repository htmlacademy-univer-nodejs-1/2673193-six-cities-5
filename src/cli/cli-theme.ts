import chalk from 'chalk';

export const theme = {
  error: chalk.bold.hex('#EF2D56'),
  warning: chalk.hex('#ED7D3A'),
  success: chalk.bold.hex('#8CD867'),
  info: chalk.hex('#73D2DE'),
  command: chalk.bold.hex('#CBCBD4'),
  title: chalk.underline.hex('#218380').bold
} as const;
