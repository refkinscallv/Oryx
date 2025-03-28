import UserRepository from '@app/database/repositories/User.repository';
import Common from '@core/Common';
import { Request } from 'express';
import UserValidation from '@app/http/validators/User.validator';
import bcrypt from 'bcrypt';

export default class UserService {
    public static async pagination(req: Request) {
        return Common.handler(async () => {
            const pagination = await UserRepository.pagination(req.query);
            return Common.rawJson(true, 200, 'Success', pagination);
        });
    }

    public static async get() {
        return Common.handler(async () => {
            const get = await UserRepository.get();
            return Common.rawJson(true, 200, 'Success', get);
        });
    }

    public static async getById(req: Request) {
        return Common.handler(async () => {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return Common.rawJson(false, 400, 'Invalid user ID');
            }

            const getById = await UserRepository.getById(userId);
            return Common.rawJson(true, 200, 'Success', getById);
        });
    }

    public static async getBy(req: Request) {
        return Common.handler(async () => {
            if (!Object.keys(req.query).length) {
                return Common.rawJson(false, 400, 'Query parameters required');
            }

            const getBy = await UserRepository.getBy(req.query);
            return Common.rawJson(true, 200, 'Success', getBy);
        });
    }

    public static async store(req: Request) {
        return Common.handler(async () => {
            const validation = UserValidation.store(req.body);
            if (validation.fails()) {
                return Common.rawJson(
                    false,
                    422,
                    'Validation failed',
                    validation.errorsAll(),
                );
            }

            const data = req.body;
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const store = await UserRepository.create({
                ...data,
                password: hashedPassword,
            });

            return Common.rawJson(
                true,
                200,
                'User created successfully',
                store,
            );
        });
    }

    public static async update(req: Request) {
        return Common.handler(async () => {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return Common.rawJson(false, 400, 'Invalid user ID');
            }

            const validation = UserValidation.update(req.body);
            if (validation.fails()) {
                return Common.rawJson(
                    false,
                    422,
                    'Validation failed',
                    validation.errorsAll(),
                );
            }

            const data = req.body;
            const checkUser = await UserRepository.getById(userId);
            if (!checkUser) {
                return Common.rawJson(false, 400, 'User not found');
            }

            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const update = await UserRepository.update(userId, data);

            return Common.rawJson(
                true,
                200,
                'User updated successfully',
                update,
            );
        });
    }

    public static async delete(req: Request) {
        return Common.handler(async () => {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return Common.rawJson(false, 400, 'Invalid user ID');
            }

            const checkUser = await UserRepository.getById(userId);
            if (!checkUser) {
                return Common.rawJson(false, 400, 'User not found');
            }

            await UserRepository.delete(userId);

            return Common.rawJson(true, 200, 'User deleted successfully', null);
        });
    }
}
