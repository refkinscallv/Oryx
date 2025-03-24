import UserSeeder from './User.seeder';

/** don't forget to register your seed here */
export default async function runSeeders() {
    await UserSeeder();
}
