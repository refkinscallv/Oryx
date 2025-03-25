import { DataSource } from 'typeorm';
import Logger from '../../core/Logger';
import Common from '../../core/Common';

const databaseType = Common.env<string>('DB_DIALECT', 'mysql');

const baseConfig = {
    entities: [
        Common.env<string>('APP_ENV', 'development') === 'development'
            ? `${Common.env('DB_ENTITY_DEV', 'src/app/database/entities/')}*.ts`
            : `${Common.env('DB_ENTITY_PROD', 'dist/app/database/entities/')}*.js`,
    ],
    synchronize: Common.env<string>('DB_SYNC', 'off') === 'on',
    logging: Common.env<string>('DB_LOGGING', 'off') === 'on',
    charset: Common.env<string>('DB_CHARSET', 'utf8mb4_general_ci'),
};

const dbConfigs: Record<string, any> = {
    postgres: {
        type: 'postgres',
        host: Common.env<string>('DB_HOST', 'localhost'),
        port: Common.env<number>('DB_PORT', 5432),
        username: Common.env<string>('DB_USER', 'postgres'),
        password: Common.env<string>('DB_PASS', 'postgres'),
        database: Common.env<string>('DB_NAME', ''),
        ssl: Common.env<boolean>('DB_SSL', false)
            ? { rejectUnauthorized: false }
            : false,
    },
    mysql: {
        type: 'mysql',
        host: Common.env<string>('DB_HOST', 'localhost'),
        port: Common.env<number>('DB_PORT', 3306),
        username: Common.env<string>('DB_USER', 'root'),
        password: Common.env<string>('DB_PASS', ''),
        database: Common.env<string>('DB_NAME', ''),
        charset: Common.env<string>('DB_CHARSET', 'utf8mb4_general_ci'),
    },
    sqlite: {
        type: 'sqlite',
        database: Common.env<string>('DB_PATH', 'database.sqlite'),
    },
    mongodb: {
        type: 'mongodb',
        url: Common.env<string>('DB_URL', 'mongodb://localhost:27017/'),
        useUnifiedTopology: true,
    },
};

const selectedConfig = dbConfigs[databaseType];

if (!selectedConfig) {
    Logger.error(`Unsupported DB_DIALECT: ${databaseType}`);
    throw new Error(`Unsupported DB_DIALECT: ${databaseType}`);
}

export const AppDataSource = new DataSource({
    ...selectedConfig,
    ...baseConfig,
});

export async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        Logger.info('Connected to database!');
    } catch (error) {
        Logger.error('Database connection failed:', error);
    }
}
