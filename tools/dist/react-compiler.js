import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';
import { reactFolder } from '../../wix-react.config.json';

async function compileReactComponents() {
    try {
        await execa('tsc', [], { cwd: cwd().endsWith(reactFolder) ? cwd() : `./${reactFolder}` });
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`TypeScript Error: ${err}`));
        }
    }
}

export default compileReactComponents;