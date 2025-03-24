import { Repository, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationParams, PaginationResult } from '../types/Core/Paginate';

export default class Paginate {
    public static async make<T extends ObjectLiteral>(
        repo: Repository<T>,
        params: PaginationParams<T>,
        relations: string[] = [],
    ): Promise<PaginationResult<T>> {
        const page = Number(params.page ?? 1);
        const limit = Number(params.limit ?? 10);
        const filter = params.filter;
        const offset = (page - 1) * limit;

        let queryBuilder: SelectQueryBuilder<T> =
            repo.createQueryBuilder('entity');

        relations.forEach((relation) => {
            queryBuilder = queryBuilder.leftJoinAndSelect(
                `entity.${relation}`,
                relation,
            );
        });

        if (filter) {
            Object.entries(filter).forEach(([key, value]) => {
                queryBuilder = queryBuilder.andWhere(
                    `entity.${key} LIKE :${key}`,
                    {
                        [key]: `%${value}%`,
                    },
                );
            });
        }

        const total = await queryBuilder.getCount();
        const data = await queryBuilder.skip(offset).take(limit).getMany();

        return {
            limit,
            page,
            total,
            max_page: Math.ceil(total / limit),
            data,
        };
    }
}
