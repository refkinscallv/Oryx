import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Logger from '../../core/Logger';

dotenv.config();

const databaseType = process.env.DB_DIALECT || 'mysql';

const baseConfig = {
    entities:
        process.env.APP_ENV === 'development'
            ? [process.env.DB_ENTITY_DEV + '*.ts']
            : [process.env.DB_ENTITY_PROD + '*.js'],
    synchronize: process.env.DB_SEED === 'true',
    logging: process.env.DB_LOGGING === 'true',
    charset: process.env.DB_CHARSET || 'utf8mb4_general_ci',
};

const dbConfigs: Record<string, any> = {
    postgres: {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || '',
        ssl:
            process.env.DB_SSL === 'true'
                ? {
                      rejectUnauthorized:
                          process.env.DB_REJECT_UNAUTHORIZED === 'true',
                  }
                : false,
    },
    mysql: {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || '',
        charset: process.env.DB_CHARSET || 'utf8mb4_general_ci',
    },
    sqlite: {
        type: 'sqlite',
        database: process.env.DB_PATH || 'database.sqlite',
    },
    mongodb: {
        type: 'mongodb',
        url: process.env.DB_URL || 'mongodb://localhost:27017/',
        useUnifiedTopology: true,
    },
};

const selectedConfig = dbConfigs[databaseType];

if (!selectedConfig) {
    Logger.error('Unsupported DB_DIALECT: ${databaseType}');
}

export const AppDataSource = new DataSource({
    ...selectedConfig,
    ...baseConfig,
});

AppDataSource.initialize()
    .then(() => Logger.info(`Connected to ${databaseType} database!`))
    .catch((error) => Logger.error(`Database connection error: ${error}`));
