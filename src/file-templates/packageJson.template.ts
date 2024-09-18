export function getPackageJsonTemplate(projectName: string) {
  return `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/index.js",
  "scripts": {
    "dev": "tsnd --respawn --clear src/index.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/index.js",
    "docker:test": "docker compose -f docker-compose.test.yml --env-file .env.test up -d",
    "test": "npm run docker:test && jest",
    "test:watch": "npm run docker:test && jest --watch",
    "test:coverage": "npm run docker:test && jest --coverage"
  }
}
`;
}