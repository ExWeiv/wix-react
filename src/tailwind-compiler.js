import { execa } from 'execa';
import chalk from 'chalk';

async function compileTailwindCSS() {
    try {
        const args = ['tailwindcss', '-o', './css/tailwind.css', '--minify'];
        await execa('npx', args);
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`Tailwind Error: ${err}`));
        }
    }
}

export default compileTailwindCSS;