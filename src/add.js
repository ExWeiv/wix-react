#!/usr/src/env node

import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import { prefixText, color } from './ora-config.js';

async function installPackageNPM(packageName) {
    try {
        const args = ['i', packageName];
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
        const spinner = ora({ text: `${prefixText} Installing package/s...`, color }).start();

        // Package names starts from second
        const packagesToInstall = process.argv;

        for (const [index, packageName] of packagesToInstall.entries()) {
            if (index < 2) {
                continue;
            } else {
                ora(spinner.text = `${prefixText} Installing: ${chalk.hex('#cb0202')(packageName)} for ${chalk.hex('#cb0202')('NPM')}`);
                await installPackageNPM(packageName);
                ora(spinner.text = `${prefixText} Installing: ${chalk.hex('#084EBD')(packageName)} for ${chalk.hex('#084EBD')('Wix')}`);
                await installPackageWix(packageName);
                console.log(chalk.greenBright(`\n✔ ${packageName} installed for both.`));
            }
        }

        spinner.succeed('All Package/s Installed!');
    } catch (err) {
        console.log(chalk.red(`Package Installer Error: ${err}`));
    }
}

installNPMPackage();