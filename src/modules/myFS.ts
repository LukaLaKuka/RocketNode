import path from "path";
import fs from "node:fs";
import { paths } from "../config/paths";
import chalk from "chalk";
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