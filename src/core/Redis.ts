import Redis from 'ioredis';
import Common from '@core/Common';
import Logger from '@core/Logger';

export default class OryxRedis {
    private static client: Redis;

    private constructor() {}

    public static init(): void {
        if (!this.client) {
            const useTLS = Common.env<string>('REDIS_TLS', 'off') === 'on';
            const retryDelay = Number(Common.env('REDIS_RETRY_DELAY', '2000'));

            this.client = new Redis({
                host: Common.env('REDIS_HOST', '127.0.0.1'),
                port: Number(Common.env('REDIS_PORT', '6379')),
                password: Common.env('REDIS_PASSWORD', undefined),
                db: Number(Common.env('REDIS_DB', '0')),
                retryStrategy: (times) => Math.min(times * 50, retryDelay),
                keyPrefix: Common.env('REDIS_PREFIX', ''), // Prefix untuk key Redis
                ...(useTLS ? { tls: {} } : {}), // Menambahkan TLS jika diaktifkan
            });

            this.client.on('connect', () => {
                Logger.info('Connected to Redis successfully.');
            });

            this.client.on('error', (err) => {
                Logger.error('Redis Error:', err);
            });
        }
    }

    public static async set(
        key: string,
        value: any,
        ttl?: number,
    ): Promise<void> {
        try {
            const data = JSON.stringify(value);
            if (ttl) {
                await this.client.setex(key, ttl, data);
            } else {
                await this.client.set(key, data);
            }
        } catch (error) {
            Logger.error(`Redis SET Error for key ${key}:`, error);
        }
    }

    public static async get<T>(key: string): Promise<T | null> {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            Logger.error(`Redis GET Error for key ${key}:`, error);
            return null;
        }
    }

    public static async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            Logger.error(`Redis DELETE Error for key ${key}:`, error);
        }
    }

    public static async publish(channel: string, message: any): Promise<void> {
        try {
            await this.client.publish(channel, JSON.stringify(message));
        } catch (error) {
            Logger.error(`Redis PUBLISH Error for channel ${channel}:`, error);
        }
    }

    public static async subscribe(
        channel: string,
        callback: (message: any) => void,
    ): Promise<void> {
        try {
            const useTLS = Common.env<string>('REDIS_TLS', 'off') === 'on';
            const subscriber = new Redis({
                host: Common.env('REDIS_HOST', '127.0.0.1'),
                port: Number(Common.env('REDIS_PORT', '6379')),
                password: Common.env('REDIS_PASSWORD', undefined),
                db: Number(Common.env('REDIS_DB', '0')),
                ...(useTLS ? { tls: {} } : {}), // TLS untuk subscriber juga
            });

            subscriber.subscribe(channel);
            subscriber.on('message', (chan, msg) => {
                if (chan === channel) {
                    callback(JSON.parse(msg));
                }
            });
        } catch (error) {
            Logger.error(
                `Redis SUBSCRIBE Error for channel ${channel}:`,
                error,
            );
        }
    }

    public static async close(): Promise<void> {
        try {
            await this.client.quit();
        } catch (error) {
            Logger.error('Redis CLOSE Error:', error);
        }
    }
}
