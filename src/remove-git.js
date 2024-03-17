import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora({ text: 'Removing Git tracking features for React folder...', color: 'magenta' }).start();

try {
    await execa('rm', ['-r', '.git']);
    spinner.succeed('Git Tracking Removed');
} catch (err) {
    console.error(chalk.red(`Error while removing Git tracking features: ${err}`));
}