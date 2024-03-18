#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

const spinner = ora({ text: 'Setting up ExWeiv Wix-React compilers and folders with pre-built examples...', color: 'magenta' }).start();

const folders = [
    '../src/public/components',
    '../src/public/css',
    '../src/public/css/files',
    '../src/public/custom-elements'
]

const clearFolders = [...folders];

try {
    for (const folder of folders) {
        fs.stat(folder, async (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    await execa('mkdir', [folder])
                } else {
                    console.error(chalk.red(`Error: ${err}`));
                }
            } else {
                if (stats.isDirectory()) {
                    clearFolders.pop();
                    const printT = folder.slice(3);
                    console.log(chalk.hex('#fcba03')(`${printT} folder already exists so skipping this`))
                }
            }
        })
    }

    console.log("totalSkip", clearFolders)

    if (clearFolders.length === 0) {
        spinner.clear();
        console.log(chalk.hex('#fcba03')('All folders are already exist so nothing was created!'));
    } else {
        spinner.succeed('ExWeiv Wix-React is ready!');
    }
} catch (err) {
    console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
}