import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora('React Compiler with Babel Running...\n').start();

// Folder Names
const componentsPath = 'components';
const wixReactComponentsFolderName = 'component';

// Path
const outputDir = `../src/public/${wixReactComponentsFolderName}`;

// NPX command
const command = `npx babel ${componentsPath} --out-dir ${outputDir} --extensions .jsx`

async function compileReactComponents() {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log(chalk.red(`Babel Error: ${err}`));
            process.exit(1);
        }

        if (stderr) {
            console.log(chalk.red(`Babel Error: ${stderr}`));
            process.exit(1);
        }

        spinner.stop();
        console.log(chalk.cyan(`All React components compiled and saved into src/public/${wixReactComponentsFolderName}`));
        process.exit(0);
    })
}

export default compileReactComponents;