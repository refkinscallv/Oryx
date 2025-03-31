import { AppDataSource } from '@app/config/database';
import { Like, Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import UserEntity from '@app/database/entities/User.entity';
import Paginate from '@core/Paginate';
import { PaginationParams, PaginationResult } from '@type/Core/Paginate';
import { isObject, isString, isNumber } from 'lodash';

export default class UserRepository {
    private static entity: Repository<UserEntity> =
        AppDataSource.getRepository(UserEntity);

    public static async pagination(
        params: PaginationParams<UserEntity>,
    ): Promise<PaginationResult<UserEntity>> {
        return await Paginate.make(this.entity, params);
    }

    public static async get(): Promise<UserEntity[]> {
        return await this.entity.find();
    }

    public static async getById(id: number): Promise<UserEntity | null> {
        const user = await this.entity.findOne({
            where: { id },
        });
        return user || null;
    }

    public static async getBy(
        index: string | Record<string, any>,
        value?: any,
    ) {
        if (isObject(index)) {
            const whereList: Record<string, any> = {};

            Object.entries(index).forEach(([key, val]) => {
                if (isString(val) || isNumber(val)) {
                    whereList[key] = Like(`%${val}%`);
                } else {
                    whereList[key] = val;
                }
            });

            return await this.entity.find({
                where: whereList,
            });
        } else if (
            typeof index === 'string' &&
            (isString(value) || isNumber(value))
        ) {
            return await this.entity.find({
                where: { [index]: Like(`%${value}%`) },
            });
        } else {
            return [];
        }
    }

    public static async create(
        data: DeepPartial<UserEntity>,
    ): Promise<UserEntity> {
        const newUser = this.entity.create(data);
        return await this.entity.save(newUser);
    }

    public static async update(
        id: number,
        data: DeepPartial<UserEntity>,
    ): Promise<UserEntity | null> {
        const user = await this.getById(id);
        if (!user) return null;

        const updatedUser = this.entity.merge(user, data);
        return await this.entity.save(updatedUser);
    }

    public static async delete(
        criteria: number | FindOptionsWhere<UserEntity>,
    ): Promise<boolean> {
        const result = await this.entity.delete(criteria);
        return result.affected !== 0;
    }
}
