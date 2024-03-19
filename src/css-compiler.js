import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// CSS folder path in React folder.
const cssFolderPath = './css';

// Wix CSS folder name (only name path is ready)
const wixCssFolderName = 'css';

let globalCSSContent = '';

// CSS Compiler
async function generateCSSJS(cssContent, cssFileName) {
    try {
        globalCSSContent = globalCSSContent + cssContent + '\n';
        await fs.writeFile(`../src/public/${wixCssFolderName}/files/${cssFileName.toLowerCase()}css.js`, `const ${cssFileName} = ${JSON.stringify('<style>' + cssContent + '</style>')};\nexport default ${cssFileName};\n`, 'utf-8');
    } catch (err) {
        console.log(chalk.red(`Error (CSS Compiler): ${err}`));
    }
}
async function compileCssFiles() {
    let cssFilePath = process.argv[2];
    if (!cssFilePath) {
        try {
            const files = await fs.readdir(cssFolderPath);
            for (const file of files) {
                if (file.endsWith('.css')) {
                    cssFilePath = path.join(cssFolderPath, file);
                    const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
                    const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
                    await generateCSSJS(cssContent, cssFileName);
                }
            }
            await fs.writeFile(`../src/public/${wixCssFolderName}/globalcss.js`, `const globalcss = ${JSON.stringify('<style>' + globalCSSContent + '</style>')};\nexport default globalcss;\n`, 'utf-8');
        } catch (err) {
            console.log(chalk.red(`Error (CSS Compiler): ${err}`));
        }
    } else {
        const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
        const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
        await generateCSSJS(cssContent, cssFileName);
    }
}

export default compileCssFiles;