import path from "path";
import fs from "node:fs";
import { paths } from "../config/paths";
import chalk from "chalk";
import { JsonHandler } from "@tomhuel/jsonhandler";
// eslint-disable-next-line
const fse = require("fs-extra");

export function getTemplates() {
    return fs.readdirSync(path.join(paths.root, 'templates'));
}

export function copyTemplate(projectDir: string, template: string) {
    const templateDir = path.join(paths.root, 'templates', template);
    fse.copySync(templateDir, projectDir, { overwrite: true });

    console.log(chalk.hex('#F6AD55')(`Creating project in ${projectDir}`));
}

export function getDependencies(projectDir: string): { devDependencies: Array<string>, dependencies: Array<string> } {
    const dependenciesFile = new JsonHandler(path.resolve(projectDir, 'dependencies.json'));

    const dependencies =  {
        devDependencies: dependenciesFile.getProperty('devDependencies'),
        dependencies: dependenciesFile.getProperty('dependencies'),
    };

    JsonHandler.deleteJson(dependenciesFile);
    return dependencies;
}