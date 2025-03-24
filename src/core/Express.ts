import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import Routes from './Routes';
import '../app/routes/Regist';

export default class OryxExpress {
    public static express: Express = express();

    public static init() {
        this.middlewares();
        this.routes();
    }

    public static middlewares() {
        /** default middlewares */
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cookieParser());
    }

    private static routes() {
        const router = express.Router();
        Routes.apply(router);
        this.express.use(router);
    }
}
