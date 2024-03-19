import { execa } from 'execa';
import chalk from 'chalk';

async function compileReactComponents() {
    try {
        const args = ['tsc'];
        await execa('npx', args);
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`TypeScript Error: ${err}`));
        }
    }
}

export default compileReactComponents;