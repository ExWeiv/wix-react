import cssCompiler from './css-compiler.js';
import reactCompiler from './react-compiler.js';
import scssCompiler from './scss-compiler.js';
import { prefixText, color } from './ora-config.js';
import ora from 'ora';
import chalk from 'chalk';

const builSpinner = ora({ text: `${prefixText} Compilers Running...\n`, color }).start();
const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));

async function scss() {
    try {
        // Compile SCSS into CSS
        await scssCompiler();
        console.log(chalk.greenBright('\n✔ SCSS Files Compiled to CSS!'));
        return true;
    } catch (err) {
        console.log(chalk.red('SCSS Compiler Error: ', err));
    }
}

async function css() {
    try {
        // Compile CSS into JS
        await cssCompiler();
        console.log(chalk.greenBright('✔ CSS Files Compiled to JS!'));
        return true;
    } catch (err) {
        console.log(chalk.red('CSS Compiler Error: ', err));
    }
}

async function react() {
    try {
        // Compile JSX and TSX into JS
        await reactCompiler();
        console.log(chalk.greenBright('\n✔ React Components Compiled to JS!'));
        return true;
    } catch (err) {
        console.log(chalk.red('React Compiler Error: ', err));
    }
}

try {
    let scssEnabled = process.argv[2];
    if (scssEnabled === "true") {
        ora(builSpinner.text = `${prefixText} SCSS Compiler Running...`);
        await scss();
    }

    ora(builSpinner.text = `${prefixText} CSS Compiler Running...`);
    await css();
    await sleep();

    ora(builSpinner.text = `${prefixText} React Compiler Running...`);
    await react();
    builSpinner.succeed('All Components and Files Compiled!');
} catch (err) {
    console.error(chalk.red(`Compiler Error: ${err}`));
}