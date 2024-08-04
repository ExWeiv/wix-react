#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { prefixText, color } from './ora-config.js';
import fs from 'fs';

const spinner = ora({ text: `${prefixText} Setting up ExWeiv Wix-React compilers and folders with pre-built examples...`, color }).start();

const folders = [
    '../src/public/components',
    '../src/public/css',
    '../src/public/css/files',
    '../src/public/custom-elements'
];

async function createFolderIfNotExists(folder) {
    try {
        const res = await fs.promises.stat(folder);
        if (res.isDirectory()) {
            console.log(chalk.hex('#fcba03')(`\n${folder.slice(3)} folder already exists so skipping this`));
            return true;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            await execa('mkdir', [folder]);
        } else {
            console.error(chalk.red(`Error: ${err}`));
        }
    }
}

(async () => {
    const clearFolders = [...folders];

    for (const folder of folders) {
        try {
            const exist = await createFolderIfNotExists(folder);
            exist ? clearFolders.pop() : () => { };
        } catch (err) {
            console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
        }
    }

    if (clearFolders.length === 0) {
        spinner.stop();
        console.log(chalk.hex('#fcba03')('\nAll folders already exist, so nothing was created!'));
    } else {
        spinner.succeed('ExWeiv Wix-React is ready!');
    }
})();
