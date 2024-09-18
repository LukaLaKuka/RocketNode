#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import { copyTemplate, getDependencies, getTemplates } from "./modules/myFS";
import path from "node:path";
import chalk from "chalk";
import { version } from "./config/version";
import Inquirer from "./modules/inquirer";
import { getPackageJsonTemplate } from "./file-templates/packageJson.template";
import { getTSConfigJsonTemplate } from "./file-templates/tsconfigJson.template";
import { getJestConfigTemplate } from "./file-templates/jestConfig.template";
import { getESLintConfig } from "./file-templates/eslint.template";

const program = new Command();

program
    .name("rocketnode")
    .description("NodeJS Project Template Generator")
    .version(version());

program
    .command('create')
    .description('Creates a new project')
    .action(async () => {
        const actualDirName = process.cwd().split(path.sep).pop();

        const { list: template } = await Inquirer.list('Choose a template', getTemplates());
        const { input: projectName } = await Inquirer.input('Project name', actualDirName);

        const projectDir = projectName === '.' || projectName === actualDirName ? process.cwd() : path.join(process.cwd(), projectName);

        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        } else {
            console.log(chalk.hex('#F6AD55')(`Project ${projectName} already exists`));
            const confirm = await Inquirer.confirm('Do you want to continue?', false);

            if (confirm.confirm === false) {
                console.log(chalk.gray('Exiting...'));
                process.exit(0);
            }
        }

        copyTemplate(projectDir, template);
        fs.writeFileSync(path.join(projectDir, 'package.json'), getPackageJsonTemplate(projectName));
        fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), getTSConfigJsonTemplate());
        fs.writeFileSync(path.join(projectDir, 'jest.config.ts'), getJestConfigTemplate());
        fs.writeFileSync(path.join(projectDir, 'eslint.config.mjs'), getESLintConfig());

        const { confirm: confirmInstall } = await Inquirer.confirm('Do you want to install dependencies?', true);
        if (confirmInstall) {
            try {
                console.log(chalk.hex('#F6AD55')('Getting dependencies...'));
                const { dependencies, devDependencies } = getDependencies(projectDir);

                if (!devDependencies || !dependencies) {
                    console.error(chalk.red('Failed to install dependencies: dependencies.json not defined in the template'));
                    process.exit(1);
                }

                console.log(chalk.hex('#F6AD55')('Installing dependencies...'));
                process.chdir(projectDir);

                if (devDependencies.length > 0) {
                    const devDependenciesString = `npm install --save-dev ${devDependencies.join(' ')}`;
                    console.log(chalk.gray(devDependenciesString));
                    await import('child_process').then(({ exec }) => exec(devDependenciesString));
                }
                if (dependencies.length > 0) {
                    const dependenciesString = `npm install ${dependencies.join(' ')}`;
                    console.log(chalk.gray(dependenciesString));
                    await import('child_process').then(({ exec }) => exec(dependenciesString));
                }
            } catch (error: unknown) {
                console.error(chalk.red('Failed to install dependencies. Exiting... Error: ' + error));
                process.exit(1);
            }
        }
    });

program.parse(process.argv);