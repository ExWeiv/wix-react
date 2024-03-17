#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

const spinner = ora({ text: 'Setting up ExWeiv Wix-React compilers and folders with pre-built examples...', color: 'magenta' }).start();

const folders = [
    '../src/public/components',
    '../src/public/css',
    '../src/public/css/files'
]

try {
    for (const folder of folders) {
        fs.access(folder, fs.constants.F_OK, async (err) => {
            if (err) {
                const printT = folder.slice(3);
                console.log(chalk.hex('#fcba03')(`${printT} folder already exists so skipping this`))
            }

            await execa('mkdir', [folder])
        })
    }

    spinner.succeed('ExWeiv Wix-React is ready!');
} catch (err) {
    console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
}