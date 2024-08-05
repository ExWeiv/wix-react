#!/usr/src/env node

import fs from 'fs';
import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { prefixText, color } from './dist/ora-config.js';

import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { targetFolder } = await fsExtra.readJson(path.join(__dirname, '../wix-react.config.json'));

const spinner = ora({ text: `${prefixText} Setting up ExWeiv Wix-React compilers and folders with pre-built examples...`, color }).start();

const folders = [
    `../${targetFolder}/public/react`,
    `../${targetFolder}/public/css`,
    `../${targetFolder}/public/css/files`,
    `../${targetFolder}/public/custom-elements`
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
