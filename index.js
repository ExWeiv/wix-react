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
];

async function createFolderIfNotExists(folder) {
    try {
        await fs.promises.stat(folder);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await execa('mkdir', [folder]);
        } else {
            console.error(chalk.red(`Error: ${err}`));
        }
    }
}

(async () => {
    const clearFolders = [];

    for (const folder of folders) {
        try {
            await createFolderIfNotExists(folder);
            clearFolders.push(folder);
        } catch (err) {
            console.error(chalk.red(`Error while setting up ExWeiv Wix-React: ${err}`));
        }
    }

    if (clearFolders.length === folders.length) {
        spinner.stop();
        console.log(chalk.hex('#fcba03')('All folders already exist, so nothing was created!'));
    } else {
        spinner.succeed('ExWeiv Wix-React is ready!');
    }
})();
