import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';

async function compileReactComponents() {
    try {
        const args = ['tsc'];
        await execa('npx', args, { cwd: cwd().endsWith('react') ? cwd() : './react' });
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`TypeScript Error: ${err}`));
        }
    }
}

export default compileReactComponents;