# RocketNode

## Index

- [About](#about)
- [Install](#install)
- [Commands](#commands)
    - [Create](#create)
    - [Version](#version)
- [Create custom templates](#create-custom-templates)
- [Future Features](#future-features)

## About

RocketNode it's a CLI for personal use.

This CLI supports multiple templates.

If you see this CLI usefull, you can fork it to create your own templates :)

## Install

To install `RocketNode` execute the next command:

```bash
npm install -g rocketnode
```

## Commands


### Create

Creates a new TypeScript project:

```bash
rocketnode create
```


### Version

Display RocketNode's version:

```bash
rocketnode -V
# output: "1.0.0"

rocketnode --version
# output: "1.0.0"
```

## Create custom templates:

To create custom templates, just need create a new directory at `templates` directory.

RocketNode will identify that new directory as a new template and will display automatically at the moment you create a template.

For dependencies, create at the root of the template a file `dependencies.json` with the next structure:

```json
{
    "devDependencies": [
        "typescript",
        "ts-node",
        "ts-node-dev",
        "@types/node",
        "jest"
    ],
    "dependencies": [
        "express",
        "body-parser",
        "commander"
    ]
}
```

`devDependencies` for development dependencies.

`dependencies` for production dependencies.

## Future features:

- Enable to setup a `scripts.json` file at each template for generate `package.json` scripts.
- Ask for which package manager use (`npm`, `pnpm`, `yarn`)
