import UserSeeder from '@app/database/seeders/User.seeder';

/** don't forget to register your seed here */
export default async function runSeeders() {
    await UserSeeder();
}
