import OryxServer from './Server';
import { Server, Socket } from 'socket.io';
import { socketWhitelist } from '../app/config/Cors';
import Logger from '../core/Logger';
import Common from './Common';

export default class OryxSocket {
    public static io: Server = new Server(OryxServer.server, {
        cors: {
            origin: (origin, callback) => {
                const originHost = origin
                    ? Common.extractUrl(origin, 'host')
                    : '';
                const allowed = socketWhitelist.some(
                    (whitelist: string) =>
                        Common.extractUrl(whitelist, 'host') === originHost,
                );

                if (!origin || allowed) {
                    callback(null, true);
                } else {
                    Logger.warn(`CORS blocked: ${origin}`);
                    callback(new Error(`CORS blocked: ${origin}`), false);
                }
            },
            methods: ['GET', 'POST'],
        },
    });
}
