import { Request, Response, NextFunction } from 'express';
import UserService from '@app/services/User.service';
import Common from '@core/Common';

export default class UserController {
    public static async pagination(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.pagination(req));
        });
    }

    public static async get(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.get());
        });
    }

    public static async getById(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.getById(req));
        });
    }

    public static async getBy(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.getBy(req));
        });
    }

    public static async store(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.store(req));
        });
    }

    public static async update(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.update(req));
        });
    }

    public static async delete(req: Request, res: Response) {
        return Common.handler(async () => {
            return Common.resJson(res, await UserService.delete(req));
        });
    }
}
