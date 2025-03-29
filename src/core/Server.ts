import http from 'http';
import OryxExpress from '@core/Express';
import Common from '@core/Common';
import Logger from '@core/Logger';

export default class OryxServer {
    public static server: http.Server = http.createServer(OryxExpress.express);
    private static serverPort: number = Number(Common.env('APP_PORT', 3000));
    private static serverUrl: string = Common.env(
        'APP_URL',
        'http://localhost',
    );

    public static init() {
        this.server.listen(this.serverPort, () => {
            Logger.info(
                `Server is running on port ${this.serverUrl}:${this.serverPort}`,
            );
        });
    }
}
