import { execa } from 'execa';
import chalk from 'chalk';

// Folder Names
const componentsPath = 'components';
const wixReactComponentsFolderName = 'components';

// Path
const outputDir = `../src/public/${wixReactComponentsFolderName}`;

async function compileReactComponents() {
    const args = ['npx', 'babel', `${componentsPath}`, '--out-dir', `${outputDir}`, '--extensions', '.jsx'];

    await execa('npx', args);

    try {
        console.log(chalk.cyan(`All React components compiled and saved into src/public/${wixReactComponentsFolderName}`));
    } catch (err) {
        console.log(chalk.red(`Babel Error: ${err}`));
    }
}

export default compileReactComponents;