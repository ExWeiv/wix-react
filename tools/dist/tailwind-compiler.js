import { execa } from 'execa';
import chalk from 'chalk';
import { cwd } from 'process';

async function compileTailwindCSS() {
    try {
        const args = ['tailwindcss', '-i', 'tailwind.css', '-o', './css/tailwind.css', '--minify'];
        await execa('npx', args, { cwd: cwd().endsWith('react') ? cwd() : './react' });
    } catch (err) {
        if (err.stderr) {
            console.log(chalk.red(`Tailwind Error: ${err}`));
        }
    }
}

export default compileTailwindCSS;