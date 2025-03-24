import OryxExpress from './Express';
import OryxServer from './Server';
import OryxRedis from './Redis';
import '../app/config/Database';

export default class OryxBoot {
    public static start() {
        (async () => {
            OryxRedis.init();
            OryxExpress.init();
            OryxServer.init();
        })();
    }
}
