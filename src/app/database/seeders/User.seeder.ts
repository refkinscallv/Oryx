import Common from '@core/Common';
import UserEntity from '@app/database/entities/User.entity';
import UserRepository from '@app/database/repositories/User.repository';
import bcrypt from 'bcrypt';

export default async function UserSeeder() {
    await Common.executeSeed({
        repo: UserRepository,
        entity: UserEntity,
        data: [
            {
                name: 'user 1',
                email: 'user1@mail.com',
                password: await bcrypt.hash('user1234', 10),
            },
            {
                name: 'user 2',
                email: 'user2@mail.com',
                password: await bcrypt.hash('user1234', 10),
            },
            {
                name: 'user 3',
                email: 'user3@mail.com',
                password: await bcrypt.hash('user1234', 10),
            },
        ],
    });
}
