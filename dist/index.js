#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { Command, CommanderError } from 'commander';
import fs from 'fs-extra';

var name = 'create-q-app';
var version = '0.1.0';
var description = 'Create projects based on templates';
var author = 'Robin Luley <robin.luley@qbeyond.de>';
var license = 'ISC';
var type = 'module';
var main = 'dist/index.js';
var packageManager = 'yarn@3.2.1';
var devDependencies = {
  '@commitlint/cli': '^17.0.0',
  '@commitlint/config-conventional': '^17.0.0',
  '@incloud/prettier-config': '^1.0.0',
  '@rollup/plugin-json': '^4.1.0',
  '@rollup/plugin-typescript': '^8.3.2',
  '@types/fs-extra': '^9.0.13',
  '@types/node': '16.11.36',
  '@typescript-eslint/eslint-plugin': '^5.26.0',
  '@typescript-eslint/parser': '^5.26.0',
  eslint: '^8.16.0',
  'eslint-config-incloud': '^2.0.3',
  'eslint-config-prettier': '^8.5.0',
  'eslint-plugin-import': '^2.26.0',
  'eslint-plugin-prettier': '^4.0.0',
  husky: '^8.0.1',
  pinst: '^3.0.0',
  prettier: '^2.6.2',
  rollup: '^2.74.1',
  'rollup-plugin-preserve-shebang': '^1.0.1',
  'rollup-plugin-prettier': '^2.2.2',
  tslib: '^2.4.0',
  typescript: '^4.6.4',
};
var dependencies = {
  chalk: '5.0.1',
  commander: '9.2.0',
  'fs-extra': '^10.1.0',
};
var scripts = {
  build: 'rollup -c',
  watch: 'rollup -cw',
  lint: 'eslint src',
  postinstall: 'husky install',
  prepack: 'pinst --disable',
  postpack: 'pinst --enable',
};
var bin = {
  cqa: 'dist/index.js',
  q: 'dist/index.js',
};
var packageJson = {
  name: name,
  version: version,
  description: description,
  author: author,
  license: license,
  private: true,
  type: type,
  main: main,
  packageManager: packageManager,
  devDependencies: devDependencies,
  dependencies: dependencies,
  scripts: scripts,
  bin: bin,
};

var Template;
(function (Template) {
  Template['VITE'] = 'vite';
})(Template || (Template = {}));
const templates = Object.values(Template);
const init = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .usage(`${chalk.green('<name>')} [options]`)
    .argument('<name>', 'The name of the project that should be created')
    .option(
      '-t, --template <template-name>',
      `The template to use: ${templates.join(', ')}`,
      Template.VITE,
    )
    .configureOutput({
      outputError: (str, write) => write(chalk.red(str)),
    })
    .action((name, options) => createApp(name, options.template));
  try {
    program.parse(process.argv);
  } catch (error) {
    if (error instanceof CommanderError) {
      program.error(error.message, error);
    }
    program.error('An unknown error occurred.');
  }
};
const createApp = (name, template) => {
  // locate template directory
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    `template-${template}`,
  );
  // check if the specified template exists
  if (!fs.existsSync(templateDir)) {
    throw new CommanderError(
      1,
      'Template unvailable',
      `The template you selected does not exist. Options available: ${templates
        .map((t) => chalk.blue(t))
        .join(', ')}`,
    );
  }
  // define project directory
  const projectDir = path.resolve(name);
  // do nothing if the directory already exists to prevent overrides
  if (fs.existsSync(projectDir)) {
    throw new CommanderError(
      1,
      'Project already exists',
      'The project already exists. Delete it first before continuing.',
    );
  }
  // create the project directory
  fs.ensureDirSync(projectDir);
  // create new package.json
  console.log(`Creating ${chalk.blue(template)} project ${chalk.blue(name)}\n`);
  // change to new directory
  process.chdir(projectDir);
  // get template files without package.json and node_modules
  const templateFiles = fs
    .readdirSync(templateDir)
    .filter((fileName) => !['package.json', 'node_modules'].includes(fileName));
  // copy over template files
  templateFiles.forEach((fileName) => {
    const sourcePath = path.join(templateDir, fileName);
    const targetPath = path.join(projectDir, fileName);
    void fs.copy(sourcePath, targetPath);
  });
  // read the template's package.json
  const templatePkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'),
  );
  // copy over template package.json and change the project name
  fs.writeFileSync('package.json', JSON.stringify({ ...templatePkg, name }));
};

init();
