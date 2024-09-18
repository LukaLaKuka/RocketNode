import inquirer from "inquirer";

export default class Inquirer {
    static async confirm(message: string, byDefault: boolean = false) {
        return await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message,
                default: byDefault
            }
        ]);
    }

    static async list(message: string, choices: Array<string>): Promise<{ list: string }> {
        return await inquirer.prompt([
            {
                type: 'list',
                name: 'list',
                message,
                choices
            }
        ]);
    }

    static async input(message: string, byDefault: string = '') {
        return await inquirer.prompt([
            {
                type: 'input',
                name: 'input',
                message,
                default: byDefault,
            } 
        ]);
    }
}