export const commonDependencies = {
    devDependencies: [
        'typescript',
        'ts-node',
        'ts-node-dev',
        '@types/node',
        'jest',
        'rimraf',
        'supertest',
        'ts-jest',
        "@eslint/js",
        'typescript-eslint',
        'globals',
        'eslint'
    ],
    prodDependencies: [

    ]
}

export const webDependencies = {
    devDependencies: [
        ...commonDependencies.devDependencies,
        '@types/express',
    ],
    prodDependencies: [
        ...commonDependencies.prodDependencies,
        'express',
    ]
}

export const cliDependencies = {
    devDependencies: [
        ...commonDependencies.devDependencies,
    ],
    prodDependencies: [
        ...commonDependencies.prodDependencies,
        'inquirer',
        'commander',
        'chalk@4'
    ]
}