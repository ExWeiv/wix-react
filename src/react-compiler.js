import { spawn } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora('React Compiler with Babel Running...\n').start();

// Folder Names
const componentsPath = 'components';
const wixReactComponentsFolderName = 'component';

// Path
const outputDir = `../src/public/${wixReactComponentsFolderName}`;

// Files Extension
const extensions = '.jsx';

async function compileReactComponents() {
    const babelProcess = spawn('npx', [
        'babel',
        componentsPath,
        '--out-dir',
        outputDir,
        '--extensions',
        extensions,
    ])

    babelProcess.stderr.on('data', (data) => {
        console.log(chalk.red(`Babel Error: ${data.toString()}`));
        process.exit(1);
    });

    babelProcess.on('close', (code) => {
        spinner.stop();
        console.log(chalk.cyan(`All React components compiled and saved into src/public/${wixReactComponentsFolderName}`));
        process.exit(0);
    });
}

export default compileReactComponents;