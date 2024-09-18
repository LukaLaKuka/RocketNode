export function getTSConfigJsonTemplate() {
    return `{
  "exclude": ["node_modules/**/*", "dist/**/*", "dist", "tests", "tests/**/*", "jest.config.ts"],
  "include": ["src/**/*"],
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
`;
}