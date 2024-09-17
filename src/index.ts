#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import inquirer from "inquirer";

const program = new Command();

export const version = '1.0.0';

program.name("rocketnode").description("Repository to create faster project templates").version(version);

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

        console.log(chalk.magenta(`Creating project in ${projectDir}`));
    });

program.parse(process.argv);