import { execa } from 'execa';
import chalk from 'chalk';
import ts from '../tsconfig.json' with { type: "json" };

async function compileReactComponents() {
    try {
        const args = ['tsc'];
        await execa('npx', args);
        console.log(chalk.cyan(`All React components compiled and saved into ${ts.compilerOptions.outDir}`));
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`TypeScript Error: ${err}`));
        }
    }
}

export default compileReactComponents;