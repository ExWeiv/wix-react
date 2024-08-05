import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';
import { reactFolder } from '../../wix-react.config.json';

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