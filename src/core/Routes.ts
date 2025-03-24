import { Router, Request, Response, NextFunction } from 'express';
import {
    RoutesMethod,
    RoutesMiddleware,
    RouteHandler,
    RouteDefinition,
} from '../types/Core/Routes';

export default class Routes {
    private static routes: RouteDefinition[] = [];

    static add(
        methods: RoutesMethod | RoutesMethod[],
        path: string,
        handler: RouteHandler,
        middlewares: RoutesMiddleware[] = [],
    ) {
        const methodArray = Array.isArray(methods) ? methods : [methods];
        this.routes.push({ methods: methodArray, path, handler, middlewares });
    }

    static get(
        path: string,
        handler: RouteHandler,
        middlewares: RoutesMiddleware[] = [],
    ) {
        this.add('get', path, handler, middlewares);
    }

    static async apply(router: Router) {
        for (const route of this.routes) {
            let handlerFunction: any;

            if (typeof route.handler === 'function') {
                handlerFunction = route.handler;
            } else if (
                Array.isArray(route.handler) &&
                route.handler.length === 2
            ) {
                const [Controller, method] = route.handler;
                if (typeof Controller[method] !== 'function') {
                    throw new Error(
                        `Method ${method} not found in controller ${Controller.name}`,
                    );
                }
                handlerFunction = Controller[method].bind(Controller);
            } else {
                throw new Error(
                    `Invalid handler format for route: ${route.path}`,
                );
            }

            for (const method of route.methods) {
                router[method](
                    route.path,
                    ...(route.middlewares || []),
                    async (req: Request, res: Response, next: NextFunction) => {
                        try {
                            const result =
                                handlerFunction.length === 3
                                    ? handlerFunction(req, res, next)
                                    : handlerFunction(req, res);
                            if (result instanceof Promise) await result;
                        } catch (error) {
                            next(error);
                        }
                    },
                );
            }
        }
    }
}
