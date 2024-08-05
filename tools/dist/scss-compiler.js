import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { reactFolder } = await fsExtra.readJson(path.join(__dirname, '../../wix-react.config.json'));

// 0, 1, 2
const exportedStyleType = ['expanded', 'compressed', 'nested'];

async function compileSCSSFiles() {
    try {
        const args = ['sass', '--style', exportedStyleType[1], '--no-source-map', 'SASS:CSS'];

        await execa('npx', args, { cwd: cwd().endsWith(reactFolder) ? cwd() : `./${reactFolder}` });
    } catch (err) {
        console.log(chalk.red(`SCSS Error: ${err}`));
    }
}

export default compileSCSSFiles;