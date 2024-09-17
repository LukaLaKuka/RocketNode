#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import inquirer from "inquirer";
import { version } from "./config/version";

const program = new Command();

program.name("rocketnode").description("NodeJS Project Template Generator").version(version());

program
    .command('create')
    .description('Creates a new project')
    .action(async () => {
        const actualDirName = process.cwd().split(path.sep).pop();

        const CHOICES = fs.readdirSync(path.join(__dirname, '..', 'templates'));
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Choose a template',
                choices: CHOICES
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name',
                default: actualDirName,
            }
        ]);

        const { template, projectName } = answers;

        const projectDir = projectName === '.' || projectName === actualDirName ? process.cwd() : path.join(process.cwd(), projectName);

        console.log(chalk.hex('#F6AD55')(`Creating project in ${projectDir}`));
    });

program.parse(process.argv);