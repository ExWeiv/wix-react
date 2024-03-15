// CSS to STRING converter

const fs = require('fs-extra');
const path = require('path');

async function generateCSSJS(cssContent, cssFileName) {
    try {
        // Write the CSS content to a separate JavaScript file
        await fs.writeFile(`../src/public/css/files/${cssFileName.toLowerCase()}css.js`, `const ${cssFileName} = ${JSON.stringify('<style>' + cssContent + '</style>')};\nexport default ${cssFileName};\n`, 'utf-8');
        console.log(`CSS file '${cssFileName}' converted and saved to ${cssFileName}.js`);
    } catch (err) {
        console.error('Error:', err);
    }
}

async function main() {
    // Get the file path from command line arguments
    let cssFilePath = process.argv[2];

    // If no specific file path is provided, process all CSS files in the folder
    if (!cssFilePath) {
        const cssFolder = './css'; // Adjust the folder path as needed
        try {
            const files = await fs.readdir(cssFolder);
            for (const file of files) {
                if (file.endsWith('.css')) {
                    cssFilePath = path.join(cssFolder, file);
                    const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
                    const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
                    await generateCSSJS(cssContent, cssFileName);
                }
            }
            console.log('All CSS files saved into src/public/css/files and globalcss.js also saved into src/public/css!');
        } catch (err) {
            console.error('Error:', err);
        }
    } else {
        // Process the specified CSS file
        const cssContent = await fs.readFileSync(cssFilePath, 'utf-8');
        const cssFileName = path.basename(cssFilePath, path.extname(cssFilePath));
        await generateCSSJS(cssContent, cssFileName);
    }
}

main();
