import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { reactFolder } = await fsExtra.readJson(path.join(__dirname, '../../wix-react.config.json'));

async function compileReactComponents() {
    try {
        await execa('tsc', [], { cwd: cwd().endsWith(reactFolder) ? cwd() : `./${reactFolder}` });
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`TypeScript Error: ${err}`));
        }
    }
}

export default compileReactComponents;