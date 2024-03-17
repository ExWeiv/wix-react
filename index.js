#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora({ text: 'Setting up ExWeiv Wix-React compilers and folders with pre-built examples...', color: 'magenta' }).start();

try {
    await execa('mkdir', ['React']);
    await execa('cd', ['React']);
    await execa('git', ['clone', 'git@github.com:ExWeiv/wix-react.git', '.']);
    await execa('npm', ['install'])
    await execa('cd', ['..']);
    await execa('cd', ['src/public']);
    await execa('mkdir', ['components'])
    await execa('mkdir', ['css'])
    await execa('cd', ['css'])
    await execa('mkdir', ['files'])
} catch (err) {
    console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
}

spinner.succeed('ExWeiv Wix-React is ready!');