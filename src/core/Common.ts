import dotenv from 'dotenv';
import { Response } from 'express';
import path from 'path';
import { URLProperties } from '../types/Core/Common';
import Logger from './Logger';

/** packacges init */
dotenv.config();

export default class Common {
    public static env<T = any>(key: string, defValue?: T): T {
        return (process.env[key] as T) ?? defValue!;
    }

    public static baseUrl(segment: string = ''): string {
        const baseUrl = this.env('APP_URL', 'http://localhost').replace(
            /\/+$/,
            '',
        );
        const port = this.env('APP_PORT', 3000)
            ? `:${this.env('APP_PORT')}`
            : '';
        return `${baseUrl}${port}${segment ? `/${segment.replace(/^\/+/, '')}` : ''}`;
    }

    public static extractUrl(fullUrl: string, get: URLProperties) {
        try {
            return new URL(fullUrl)[get];
        } catch {
            return fullUrl;
        }
    }

    public static async handler<T>(
        callback: () => Promise<T>,
        shouldThrow: boolean | ((error: unknown) => void) = false,
    ): Promise<T> {
        try {
            return await callback();
        } catch (error) {
            if (typeof shouldThrow === 'function') {
                shouldThrow(error);
            } else if (shouldThrow) {
                throw error;
            }
            return this.rawJson(false, 500, 'Unexpected error', null) as T;
        }
    }

    public static rawJson(
        status: boolean = true,
        code: number = 200,
        message: string = '',
        result: object | any[] | null = {},
        custom: Partial<Record<string, any>> = {},
    ) {
        return { status, code, message, result, ...custom };
    }

    public static resJson(
        res: Response,
        arg1:
            | boolean
            | {
                  status: boolean;
                  code: number;
                  message: string;
                  result: object | null;
                  custom?: object;
              },
        arg2?: number,
        arg3?: string,
        arg4?: object | any[] | null,
        arg5?: Partial<Record<string, any>>,
    ): Response {
        const response =
            typeof arg1 === 'object'
                ? { ...arg1, ...arg1.custom }
                : {
                      status: arg1,
                      code: arg2!,
                      message: arg3!,
                      result: arg4!,
                      ...arg5,
                  };

        return res.status(response.code).json(response);
    }

    public static resView(
        res: Response,
        view: string,
        data: Record<string, any> = {},
        status: number = 200,
    ): void {
        try {
            const viewPath = path.join(__dirname, view);
            res.status(status).render(viewPath, data);
        } catch (error: any) {
            this.resJson(res, false, 500, 'Failed to render view');
        }
    }

    public static async executeSeed<T>({
        repo,
        entity,
        data,
    }: {
        repo: any;
        entity: any;
        data: any[];
    }) {
        const repository = await repo.init();

        if (!data.length) {
            Logger.warn(
                `No data provided for ${entity.name}, seeding skipped`,
            );
            return;
        }

        const allColumns = Object.keys(data[0]);

        await repository
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(data)
            .orUpdate({ conflictTarget: allColumns, overwrite: allColumns })
            .execute();

        Logger.info(
            `Seeder for ${entity.name} executed successfully with auto-update`,
        );
    }
}
