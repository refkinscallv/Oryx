import fs from 'fs';
import path from 'path';

const argv = process.argv.slice(2);

if (argv.length < 2) {
    console.log(
        'Error: Please provide the type (entity/repository/service/controller/middleware/validator) and the name.',
    );
    process.exit(1);
}

const [type, rawName] = argv;
const validTypes = [
    'entity',
    'repository',
    'service',
    'controller',
    'middleware',
    'validator',
];

if (!validTypes.includes(type)) {
    console.log(
        `Error: Invalid type '${type}'. Choose one of: ${validTypes.join(', ')}`,
    );
    process.exit(1);
}

const basePaths: Record<string, string> = {
    entity: 'src/app/database/entities/',
    repository: 'src/app/database/repositories/',
    service: 'src/app/services/',
    controller: 'src/app/http/controllers/',
    middleware: 'src/app/http/middlewares/',
    validator: 'src/app/http/validators/',
};

const toSnakeCase = (str: string) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
};

const splitPath = rawName.split('/');
const fileName = splitPath.pop() as string;
const subDir = splitPath.join('/');

const baseDir = path.resolve(basePaths[type], subDir);
const filePath = path.join(baseDir, `${fileName}.${type}.ts`);

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const templatePath = path.resolve(
    'src/core/Generator/templates',
    `${type}.txt`,
);

if (!fs.existsSync(templatePath)) {
    console.log(
        `Error: Template '${type}.txt' not found in 'src/core/Generator/templates/' directory.`,
    );
    process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf-8');

const tableName = toSnakeCase(fileName);
const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

template = template.replace(/\{\{name\}\}/g, tableName);
template = template.replace(/\{\{Name\}\}/g, className);

if (fs.existsSync(filePath)) {
    console.log(`Warning: File '${filePath}' already exists.`);
    process.exit(1);
}

fs.writeFileSync(filePath, template);
console.log(`Success: ${type} '${fileName}' created at '${filePath}'`);
