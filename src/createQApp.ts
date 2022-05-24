import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { Command, CommanderError } from 'commander';
import fs from 'fs-extra';
import packageJson from '../package.json';

enum Template {
  VITE = 'vite',
}

const templates = Object.values(Template);

type CommandOptions = {
  template: Template;
};

export const init = (): void => {
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
    .action((name: string, options: CommandOptions) =>
      createApp(name, options.template),
    );

  try {
    program.parse(process.argv);
  } catch (error) {
    if (error instanceof CommanderError) {
      program.error(error.message, error);
    }

    program.error('An unknown error occurred.');
  }
};

const createApp = (name: string, template: Template) => {
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
  ) as unknown as Record<string, unknown>;

  // copy over template package.json and change the project name
  fs.writeFileSync('package.json', JSON.stringify({ ...templatePkg, name }));
};
