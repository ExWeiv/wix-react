#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import ncp from 'ncp';
import { execa } from 'execa';
import { prefixText, color } from './dist/ora-config.js';
import ora from 'ora';
import chalk from 'chalk';

const buildSpinner = ora({ text: `${prefixText} Setting up React integration...\n`, color }).start();

program
    .version('1.0.0')
    .description('React Integration for Wix Sites Powered by ExWeiv')
    .action(async () => {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'includeSCSS',
                    message: 'Do you want to use SCSS? (you can also add it later)',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'includeShadcnUI',
                    message: 'Include shadcn/ui and Tailwind CSS with required minimum configuration? (you can also add it later)',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'includeTailwind',
                    message: 'Would you like to include Tailwind CSS alone? (you can also add it later)',
                    default: false,
                    when: (answers) => !answers.includeShadcnUI,
                },
            ]);

            ora(builSpinner.text = `${prefixText} Installing React and TypeScript...`);

            const { includeSCSS, includeShadcnUI, includeTailwind } = answers;
            const projectPath = path.join(process.cwd(), 'react');

            if (!await fs.pathExists(projectPath)) {
                await fs.ensureDir(projectPath);
            }

            const copyFiles = async (source, destination) => {
                return new Promise((resolve, reject) => {
                    ncp(source, destination, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });
            };

            // Copy base files and folders
            await copyFiles(path.join(process.cwd(), 'components'), projectPath);
            await copyFiles(path.join(process.cwd(), 'css'), projectPath);
            await copyFiles(path.join(process.cwd(), 'tools'), projectPath);
            await fs.copy(path.join(process.cwd(), 'package.json'), path.join(projectPath, 'package.json'));
            await fs.copy(path.join(process.cwd(), 'tsconfig.json'), path.join(projectPath, 'tsconfig.json'));

            // Install base dependencies
            await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
            console.log(chalk.greenBright('\n✔ React and TypeScript Installed'));

            // Conditionally copy additional templates and install their dependencies
            if (includeSCSS) {
                ora(builSpinner.text = `${prefixText} Installing SCSS...`);
                await copyFiles(path.join(process.cwd(), 'templates/sass'), projectPath);
                await execa('npm', ['install', '-D', 'sass'], { cwd: projectPath, stdio: 'inherit' });
                console.log(chalk.greenBright('\n✔ SCSS Installed'));
            }

            if (includeShadcnUI) {
                ora(builSpinner.text = `${prefixText} Installing shadcn/ui and Tailwind CSS...`);
                await copyFiles(path.join(process.cwd(), 'templates/shadcn'), projectPath);
                await copyFiles(path.join(process.cwd(), 'templates/tailwindcss-shadcn'), projectPath);
                await execa('npm', ['install', '-D', 'tailwindcss-animate', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react', '@radix-ui/react-icons', 'tailwindcss'], { cwd: projectPath, stdio: 'inherit' });
                console.log(chalk.greenBright('\n✔ shadcn/ui and Tailwind CSS Installed'));
            } else if (includeTailwind) {
                ora(builSpinner.text = `${prefixText} Installing Tailwind CSS...`);
                await copyFiles(path.join(process.cwd(), 'templates/tailwindcss'), projectPath);
                await execa('npm', ['install', '-D', 'tailwindcss'], { cwd: projectPath, stdio: 'inherit' });
                console.log(chalk.greenBright('\n✔ Tailwind CSS Installed'));
            }

            ora(builSpinner.text = `${prefixText} Setting up Folders and Packages in Wix...`);
            execa('npm', ['run', 'setup'], { cwd: projectPath, stdio: 'inherit' });
            execa('npm', ['remove', 'react', 'react-dom'], { cwd: process.cwd(), stdio: 'inherit' });
            execa('npm', ['run', 'pinstall', 'react', 'react-dom', '@exweiv/wix-ce-helpers', 'class-variance-authority', 'clsx', 'lucide-react', 'tailwind-merge', 'tailwindcss-animate'], { cwd: process.cwd(), stdio: 'inherit' });

            buildSpinner.succeed(`${prefixText} React Integration Setup Completed`);
        } catch (error) {
            buildSpinner.fail(`${prefixText} An error occurred: ${error}`);
            console.error(chalk.red('An error occurred:', error));
        }
    });

program.parse(process.argv);
