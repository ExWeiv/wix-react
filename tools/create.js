#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import { prefixText, color } from './dist/ora-config.js';
import { fileURLToPath } from 'url';
import ora from 'ora';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

program
    .version('1.0.0')
    .description('React Integration for Wix Sites Powered by ExWeiv')
    .action(async () => {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'includeSCSS',
                    message: 'Include SCSS with React?',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'includeShadcnUI',
                    message: 'Include shadcn/ui and Tailwind CSS with required minimum configuration?',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'includeTailwind',
                    message: 'Include Tailwind CSS alone?',
                    default: false,
                    when: (answers) => !answers.includeShadcnUI,
                },
                {
                    type: 'confirm',
                    name: 'installDependencies',
                    message: 'Install all required dependencies both on Wix and here?',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'addScripts',
                    message: 'Do you want to add required npm scripts directly into main package.json file to run build commands from the root dir?',
                    default: false,
                },
                {
                    type: 'input',
                    name: 'reactFName',
                    message: 'Would you like to customize the React root folder name? (if not skip)',
                    default: "react"
                },
                {
                    type: 'input',
                    name: 'targetFName',
                    message: 'If your project target root folder name is not **src** you can set it now.',
                    default: "src"
                },
            ]);

            const buildSpinner = ora({ text: `${prefixText} Setting up React Integration...\n`, color }).start();
            const { includeSCSS, includeShadcnUI, includeTailwind, installDependencies, addScripts, reactFName, targetFName } = answers;
            const projectPath = path.join(process.cwd(), reactFName);

            const config = {
                targetFolder: targetFName,
                reactFolder: reactFName
            }

            async function getDirectories(target, inTemplates = false) {
                return [
                    path.join(inTemplates ? path.join(rootDir + '/templates') : rootDir, target),
                    path.join(projectPath, target)
                ]
            }

            if (!await fs.pathExists(projectPath)) {
                await fs.ensureDir(projectPath);
            }

            // Copy base files and folders
            buildSpinner.text = `${prefixText} Installing React and TypeScript...`
            await fs.copy(...await getDirectories('components'));
            await fs.copy(...await getDirectories('css'));
            await fs.copy(...await getDirectories('tools'));
            await fs.copyFile(...await getDirectories('package.json'));
            await fs.copyFile(...await getDirectories('tsconfig.json'));
            await fs.writeJson(path.join(projectPath, 'wix-react.config.json'), config, { spaces: 2 });
            await addScriptsToPackageJson(path.join(process.cwd() + '/tsconfig.json'), `../${targetFName}/public/${reactFName}`);

            // Install base dependencies
            await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
            console.log(chalk.greenBright('\n✔ React and TypeScript Installed'));

            // Conditionally copy additional templates and install their dependencies
            if (includeSCSS) {
                buildSpinner.text = `${prefixText} Installing SCSS...`

                await fs.copy(...await getDirectories('sass', true));
                await execa('npm', ['install', '-D', 'sass'], { cwd: projectPath, stdio: 'inherit' });

                console.log(chalk.greenBright('\n✔ SCSS Installed'));
            }

            if (includeShadcnUI) {
                buildSpinner.text = `${prefixText} Installing shadcn/ui and Tailwind CSS...`

                await fs.copy(...await getDirectories('shadcn', true));
                copyAllFiles(path.join(rootDir + '/templates/tailwindcss-shadcn'), projectPath);
                await execa('npm', ['install', '-D', 'tailwindcss-animate', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react', '@radix-ui/react-icons', 'tailwindcss'], { cwd: projectPath, stdio: 'inherit' });

                console.log(chalk.greenBright('\n✔ shadcn/ui and Tailwind CSS Installed'));
            } else if (includeTailwind) {
                buildSpinner.text = `${prefixText} Installing Tailwind CSS...`

                copyAllFiles(path.join(rootDir + '/templates/tailwindcss'), projectPath);
                await execa('npm', ['install', '-D', 'tailwindcss'], { cwd: projectPath, stdio: 'inherit' });

                console.log(chalk.greenBright('\n✔ Tailwind CSS Installed'));
            }

            buildSpinner.text = `${prefixText} Setting up Folders in Wix...`
            await execa('npm', ['run', 'setup'], { cwd: projectPath, stdio: 'inherit' });

            if (addScripts) {
                buildSpinner.text = `${prefixText} Adding Scripts to Main package.json...`;
                await addScriptsToPackageJson(path.join(process.cwd() + '/package.json'), {
                    "build": `node ./${reactFName}/tools/build.js`,
                    "pinstall": `node ./${reactFName}/tools/pinstall.js`
                });
            }

            buildSpinner.succeed(`${prefixText} React Integration Setup Completed`);
            ora().clear();

            if (installDependencies) {
                await execa('npm', ['remove', 'react', 'react-dom'], { cwd: process.cwd(), stdio: 'inherit' });
                await execa('npm', ['run', 'pinstall', 'react', 'react-dom', '@exweiv/wix-ce-helpers', 'class-variance-authority', 'clsx', 'lucide-react', 'tailwind-merge', 'tailwindcss-animate'], { cwd: projectPath, stdio: 'inherit' });
            }

            process.exit(0);
        } catch (error) {
            console.error(chalk.red('An error occurred:', error));
            process.exit(1);
        }
    })

async function copyAllFiles(srcDir, destDir) {
    try {
        await fs.ensureDir(destDir);
        const items = await fs.readdir(srcDir);

        for (const item of items) {
            const srcPath = path.join(srcDir, item);
            const destPath = path.join(destDir, item);
            const stats = await fs.stat(srcPath);
            if (stats.isFile()) {
                await fs.copyFile(srcPath, destPath);
            }
        }

        return null;
    } catch (err) {
        console.error(chalk.red('Error copying files:', err));
    }
}

async function addScriptsToPackageJson(packageJsonPath, newScripts) {
    try {
        const packageJson = await fs.readJson(packageJsonPath);

        packageJson.scripts = {
            ...packageJson.scripts,
            ...newScripts
        };

        return await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    } catch (error) {
        console.error(chalk.red('An error occurred while updating package.json:', error));
    }
}

async function modifyTSConfig(tsConfigPath, newOutDir) {
    try {
        const currentConfig = await fs.readJson(tsConfigPath);

        currentConfig.compilerOptions = {
            ...currentConfig.compilerOptions,
            outDir: newOutDir
        };

        return await fs.writeJson(tsConfigPath, currentConfig, { spaces: 2 });
    } catch (error) {
        console.error(chalk.red('An error occurred while updating tsconfig.json:', error));
    }
}

program.parse(process.argv);