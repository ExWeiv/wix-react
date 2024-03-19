import cssCompiler from './css-compiler.js';
import reactCompiler from './react-compiler.js';
import scssCompiler from './scss-compiler.js';
import { prefixText, color } from './ora-config.js';
import ora from 'ora';
import chalk from 'chalk';

async function scss() {
    // Compile SCSS into CSS
    const scssCompilerSpinner = ora({ text: `${prefixText} SCSS Compiler Running...\n`, color }).start();
    await scssCompiler();
    scssCompilerSpinner.succeed('SCSS Files Compiled!');
    return true;
}

async function css() {
    // Compile CSS into JS
    const csscompilerSpinner = ora({ text: `${prefixText} CSS Compiler Running...\n`, color }).start();
    await cssCompiler();
    csscompilerSpinner.succeed('CSS Files Compiled!');
    return true;
}

async function react() {
    // Compile JSX and TSX into JS
    const reactcompilerText = ora({ text: `${prefixText} React Compiler (TS) Running...\n`, color }).start();
    await reactCompiler();
    reactcompilerText.succeed('React Components Compiled!');
    return true;
}

try {
    let scssEnabled = process.argv[2];
    if (scssEnabled === "true") {
        await scss();
    }

    await css();
    await react();
} catch (err) {
    console.error(chalk.red(`Compiler Error: ${err}`));
}