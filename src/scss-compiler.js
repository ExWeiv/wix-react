import { execa } from 'execa';
import chalk from 'chalk';

// 0, 1, 2
const exportedStyleType = ['expanded', 'compressed', 'nested'];

async function compileSCSSFiles() {
    try {
        const args = ['sass', '--style', exportedStyleType[1], '--no-source-map', 'SCSS:CSS'];

        await execa('npx', args);

        console.log(chalk.cyan(`All SCSS files compiled and saved into CSS folder`));
    } catch (err) {
        console.log(chalk.red(`SCSS Error: ${err}`));
    }
}

export default compileSCSSFiles;