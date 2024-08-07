import fs from 'fs-extra';
import chalk from 'chalk';
import { cwd } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { reactFolder, targetFolder } = await fs.readJson(path.join(__dirname, '../../wix-react.config.json'));


const cssFolderPath = cwd().endsWith(reactFolder) ? './css' : `./${reactFolder}/css`;
const wixCssFolderName = cwd().endsWith(reactFolder) ? `../${targetFolder}/public/css` : `./${targetFolder}/public/css`;

let globalCSSContent = '';

// Function to escape special characters in CSS
function escapeCSS(cssContent) {
    return cssContent.replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/`/g, '\\`') // Escape backticks
        .replace(/\$/g, '\\$'); // Escape dollar signs
}

// CSS Compiler
async function generateCSSJS(cssContent, cssFileName) {
    try {
        const escapedContent = escapeCSS(cssContent);
        globalCSSContent = globalCSSContent + escapedContent + '\n';
        const jsContent = `const ${cssFileName} = \`<style>${escapedContent}</style>\`;\nexport default ${cssFileName};\n`;
        await fs.writeFile(`${wixCssFolderName}/files/${cssFileName.toLowerCase()}css.js`, jsContent, 'utf-8');
    } catch (err) {
        console.log(chalk.red(`Error (CSS Compiler): ${err}`));
    }
}

async function compileCssFiles() {
    try {
        const files = await fs.readdir(cssFolderPath);
        for (const file of files) {
            if (file.endsWith('.css')) {
                const cssFilePath = path.join(cssFolderPath, file);
                const cssContent = await fs.readFile(cssFilePath, 'utf-8');
                const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
                await generateCSSJS(cssContent, cssFileName);
            }
        }
        const globalJsContent = `const globalcss = \`<style>${globalCSSContent}</style>\`;\nexport default globalcss;\n`;
        await fs.writeFile(`${wixCssFolderName}/globalcss.js`, globalJsContent, 'utf-8');
    } catch (err) {
        console.log(chalk.red(`Error (CSS Compiler): ${err}`));
    }
}

export default compileCssFiles;
