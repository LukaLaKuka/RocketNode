#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import { copyTemplate, getTemplates } from "./modules/myFS";
import path from "node:path";
import chalk from "chalk";
import { version } from "./config/version";
import Inquirer from "./modules/inquirer";

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

        const CHOICES = getTemplates();

        const { list: template } = await Inquirer.list('Choose a template', CHOICES);
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
    });

program.parse(process.argv);