import cssCompiler from './css-compiler.js';
import reactCompiler from './react-compiler.js';
import scssCompiler from './scss-compiler.js';
import ora from 'ora';
import chalk from 'chalk';

try {
    let scssEnabled = process.argv[2];

    if (scssEnabled === "true") {
        // Compile SCSS into CSS
        const scssCompilerSpinner = ora('ExWeiv Wix-React - SCSS Compiler Running...\n').start();
        await scssCompiler();
        scssCompilerSpinner.succeed('SCSS Files Compiled!');
    }

    // Compile CSS into JS
    const csscompilerSpinner = ora('ExWeiv Wix-React - CSS Compiler Running...\n').start();
    await cssCompiler();
    csscompilerSpinner.succeed('CSS Files Compiled!');

    // Compile JSX and TSX into JS
    const reactcompilerText = ora(`ExWeiv Wix-React - React Compiler (Babel) Running...\n`).start();
    await reactCompiler();
    reactcompilerText.succeed('React Components Compiled!');
} catch (err) {
    console.error(chalk.red(`Compiler Error: ${err}`));
}