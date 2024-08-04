#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { prefixText, color } from './dist/ora-config.js';
import fs from 'fs';

const spinner = ora({ text: `${prefixText} Setting up ExWeiv Wix-React compilers and folders with pre-built examples...`, color }).start();

const folders = [
    '../src/public/react',
    '../src/public/css',
    '../src/public/css/files',
    '../src/public/custom-elements'
];

async function createFolderIfNotExists(folder) {
    try {
        const res = await fs.promises.stat(folder);
        if (res.isDirectory()) {
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

    spinner.succeed(`${prefixText} Folders Successfully Created`);
})();
