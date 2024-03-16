import cssCompiler from './css-converter.js';
import reactCompiler from './react-compiler.js';
import ora from 'ora';

const spinner = ora('ExWeiv Wix-React Compilers Running...\n').start();

await reactCompiler();
await cssCompiler();

spinner.stop();
process.exit(0);