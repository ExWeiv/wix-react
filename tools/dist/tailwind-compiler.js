import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';
import { reactFolder } from '../../wix-react.config.json';

async function compileTailwindCSS() {
    try {
        const args = ['tailwindcss', '-i', 'tailwind.css', '-o', './css/tailwind.css', '--minify'];
        await execa('npx', args, { cwd: cwd().endsWith(reactFolder) ? cwd() : `./${reactFolder}` });
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`Tailwind Error: ${err}`));
        }
    }
}

export default compileTailwindCSS;