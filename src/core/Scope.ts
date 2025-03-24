import Logger from './Logger';

Logger.init();

const nativeConsoleError = console.error;
const nativeConsoleWarn = console.warn;

console.error = (...args: any[]) => {
    nativeConsoleError(...args);
    Logger.error(...args);
};

console.warn = (...args: any[]) => {
    nativeConsoleWarn(...args);
    Logger.warn(...args);
};

process.on('unhandledRejection', (reason, promise) => {
    nativeConsoleError('Unhandled Rejection:', reason);
    Logger.error({
        type: 'Unhandled Rejection',
        reason,
        promise,
        stack: reason instanceof Error ? reason.stack : undefined,
    });
});

process.on('uncaughtException', (error: Error) => {
    nativeConsoleError('Uncaught Exception:', error);
    Logger.error({
        type: 'Uncaught Exception',
        message: error.message,
        stack: error.stack,
    });

    setTimeout(() => process.exit(1), 1000);
});
