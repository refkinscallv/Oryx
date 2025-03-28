import OryxExpress from '@core/Express';
import OryxServer from '@core/Server';
import OryxRedis from '@core/Redis';
import Common from '@core/Common';
import { initializeDatabase } from '@app/config/Database';
import runSeeders from '@app/database/seeders/Regist';

export default class OryxBoot {
    public static start() {
        (async () => {
            /** Initialize the database connection before starting the application */
            await initializeDatabase();

            /** Initialize Redis if the REDIS_STATUS environment variable is set to "on" */
            if (Common.env('REDIS_STATUS') === 'on') {
                OryxRedis.init();
            }

            /** Execute database seeders if DB_SEED is enabled in the environment */
            if (Common.env<string>('DB_SEED', 'off') === 'on') {
                await runSeeders();
            }

            setTimeout(() => {
                /** Configure and initialize Express, including middlewares and routes */
                OryxExpress.init();

                /** Start the HTTP server to handle incoming requests */
                OryxServer.init();
            }, 100);
        })();
    }
}
