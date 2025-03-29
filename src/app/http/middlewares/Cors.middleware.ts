import { Request, Response, NextFunction } from 'express';
import { expressCors } from '@app/config/Cors';
import Common from '@core/Common';
import Logger from '@core/Logger';

export default class CorsMiddleware {
    public static async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        await Common.handler(
            async () => {
                const origin =
                    req.headers.origin ||
                    Common.env('APP_URL', 'http://localhost');

                // Retrieve the list of allowed origins
                const allowedOrigins = Array.isArray(
                    expressCors['Access-Control-Allow-Origin'],
                )
                    ? expressCors['Access-Control-Allow-Origin']
                    : [expressCors['Access-Control-Allow-Origin']];

                // Block the request if the origin is not allowed
                if (
                    !allowedOrigins.includes('*') &&
                    !allowedOrigins.includes(new URL(origin).hostname)
                ) {
                    Logger.warn(`CORS blocked: ${origin}`);
                    return res
                        .status(403)
                        .json(
                            Common.rawJson(
                                false,
                                403,
                                'Forbidden: CORS Policy',
                            ),
                        );
                }

                // Set all headers defined in `expressCors`
                Object.entries(expressCors).forEach(([key, value]) => {
                    res.setHeader(
                        key,
                        Array.isArray(value) ? value.join(', ') : String(value),
                    );
                });

                // **Handle Preflight Request** (OPTIONS)
                if (req.method === 'OPTIONS') {
                    return res.sendStatus(204);
                }

                next();
            },
            (error) => {
                Logger.error(`CORS Middleware Error: ${error}`);
                next(error); // Forward error to Express error handler
            },
        );
    }
}
