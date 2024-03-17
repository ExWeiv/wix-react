#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora({ text: 'Setting up ExWeiv Wix-React compilers and folders with pre-built examples...', color: 'magenta' }).start();

try {
    await execa('mkdir', ['React']);
    await execa('git', ['clone', 'git@github.com:ExWeiv/wix-react.git', './React']);
    await execa('npm', ['install'], { cwd: './React' })
    await execa('mkdir', ['src/public/components'])
    await execa('mkdir', ['src/public/css'])
    await execa('mkdir', ['src/public/css/files'])
    spinner.succeed('ExWeiv Wix-React is ready!');
} catch (err) {
    console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
}