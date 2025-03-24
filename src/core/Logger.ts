import fs from 'fs';
import path from 'path';
import Common from './Common';

export default class Logger {
    private static logDir = path.join(__dirname, '../../logs');
    private static logLevels = ['info', 'error', 'warn'];
    private static env = Common.env('APP_ENV', 'development');

    public static init() {
        if (!fs.existsSync(Logger.logDir))
            fs.mkdirSync(Logger.logDir, { recursive: true });

        Logger.logLevels.forEach((level) => {
            const levelDir = path.join(Logger.logDir, level);
            if (!fs.existsSync(levelDir))
                fs.mkdirSync(levelDir, { recursive: true });
        });

        Logger.cleanEmptyLogs();
    }

    private static getLogFile(level: string): string {
        const today = new Date().toISOString().split('T')[0];
        return path.join(Logger.logDir, level, `${today}.log`);
    }

    public static log(level: 'info' | 'error' | 'warn', ...args: any[]) {
        const date = new Date().toISOString().split('T');
        const time = date[1].split('.')[0];

        const message = args
            .map((arg) => {
                if (arg instanceof Error) {
                    return `Error: ${arg.message}\nStack: ${arg.stack}`;
                } else if (typeof arg === 'object') {
                    return JSON.stringify(arg, null, 2);
                } else {
                    return String(arg);
                }
            })
            .join(' | ');

        const logMessage = `[Oryx][${date[0]} ${time}] [${level.toUpperCase()}] ${message}\n`;
        const logFile = Logger.getLogFile(level);

        fs.appendFileSync(logFile, logMessage, 'utf8');

        if (Logger.env === 'development') {
            process[level === 'error' ? 'stderr' : 'stdout'].write(logMessage);
        }
    }

    public static info(...args: any[]) {
        Logger.log('info', ...args);
    }

    public static error(...args: any[]) {
        Logger.log('error', ...args);
    }

    public static warn(...args: any[]) {
        Logger.log('warn', ...args);
    }

    private static cleanEmptyLogs() {
        Logger.logLevels.forEach((level) => {
            const levelDir = path.join(Logger.logDir, level);
            fs.readdirSync(levelDir).forEach((file) => {
                const filePath = path.join(levelDir, file);
                if (fs.statSync(filePath).size === 0) fs.unlinkSync(filePath);
            });
        });
    }
}
