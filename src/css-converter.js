import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

// CSS folder path in React folder.
const cssFolderPath = './css';

// Wix CSS folder name (only name path is ready)
const wixCssFolderName = 'css';

// CSS Compiler
async function generateCSSJS(cssContent, cssFileName, spinner) {
    try {
        spinner.text(`Compiling: ${cssFileName}.css`);
        await fs.writeFile(`../src/public/${wixCssFolderName}/files/${cssFileName.toLowerCase()}css.js`, `const ${cssFileName} = ${JSON.stringify('<style>' + cssContent + '</style>')};\nexport default ${cssFileName};\n`, 'utf-8');
    } catch (err) {
        console.log(chalk.red(`Error (CSS Compiler): ${err}`));
        process.exit(1);
    }
}
async function compileCssFiles() {
    const spinner = ora(`CSS Compiler Running...\n`).start();
    let cssFilePath = process.argv[2];
    if (!cssFilePath) {
        try {
            const files = await fs.readdir(cssFolderPath);
            for (const file of files) {
                if (file.endsWith('.css')) {
                    cssFilePath = path.join(cssFolderPath, file);
                    const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
                    const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
                    await generateCSSJS(cssContent, cssFileName, spinner);
                }
            }
            spinner.stop();
            console.log(chalk.blueBright(`All CSS compiled and saved into src/public/${wixCssFolderName}/files`));
            process.exit(0);
        } catch (err) {
            spinner.stop();
            console.log(chalk.red(`Error (CSS Compiler): ${err}`));
            process.exit(1);
        }
    } else {
        const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
        const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
        await generateCSSJS(cssContent, cssFileName, spinner);
        spinner.stop();
        console.log(chalk.blueBright(`'${cssFileName}' compiled and saved to src/public/${wixCssFolderName}/files/${cssFileName}.js`));
        process.exit(0);
    }
}

export default compileCssFiles;