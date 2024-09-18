export function getPackageJsonTemplate(projectName: string) {
    return `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/index.js",
  "scripts": {
    "dev": "tsnd --clear --respawn src/index.ts",
    "build": "rimraf dist && tsc",
    "start": "npm run build && node dist/index.js"
  }
}
`
}