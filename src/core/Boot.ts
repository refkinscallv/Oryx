import OryxExpress from './Express';
import OryxServer from './Server';
import OryxRedis from './Redis';
import Common from './Common';
import '../app/config/Database';

export default class OryxBoot {
    public static start() {
        (async () => {
            if (Common.env('REDIS_STATUS') === "on") {
                OryxRedis.init();
            }
            OryxExpress.init();
            OryxServer.init();
        })();
    }
}
