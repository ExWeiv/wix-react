#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

async function installPackageNPM(packageName) {
    try {
        const args = ['install', packageName];
        await execa('npm', args);
        return true;
    } catch (err) {
        console.log(chalk.red(`NPM Package Install Error: ${err}`));
    }
}

async function installPackageWix(packageName) {
    try {
        const args = ['install', packageName];
        await execa('wix', args, { cwd: '../' });
        return true;
    } catch (err) {
        console.log(chalk.red(`Wix Package Install Error: ${err}`));
    }
}

async function installNPMPackage() {
    try {
        const spinner = ora('Installing package/s...').start();

        // Package names starts from second
        const packagesToInstall = process.argv;

        for (const [packageName, index] of packagesToInstall) {
            if (index === 0 || index === 1) {
                return null;
            } else {
                spinner.text(`Installing: ${packageName} for NPM (React)`);
                await installPackageNPM(packageName);
                spinner.text(`Installing: ${packageName} for Wix`);
                await installPackageWix(packageName);
            }
        }

        spinner.succeed('Package/s Installed!');
    } catch (err) {
        console.log(chalk.red(`Package Installer Error: ${err}`));
    }
}

installNPMPackage();