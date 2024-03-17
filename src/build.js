import cssCompiler from './css-converter.js';
import reactCompiler from './react-compiler.js';
import ora from 'ora';
import chalk from 'chalk';

try {
    const csscompilerSpinner = ora('ExWeiv Wix-React - CSS Compiler Running...\n').start();
    await cssCompiler();
    csscompilerSpinner.succeed('CSS Files Compiled!');
    const reactcompilerText = ora(`ExWeiv Wix-React - React Compiler (Babel) Running...\n`).start();
    await reactCompiler();
    reactcompilerText.succeed('React Components Compiled!');
} catch (err) {
    console.error(chalk.red(`Compiler Error: ${err}`));
}