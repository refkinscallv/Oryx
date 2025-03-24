# Oryx

Oryx is a lightweight, modular, and scalable TypeScript-based backend framework.  
It is designed to be efficient, flexible, and easy to use, making it suitable for various backend applications.

## Features

- **Lightweight & Modular**: Designed with a minimal footprint while maintaining flexibility.
- **TypeScript Support**: Fully typed with TypeScript for better development experience.
- **Express-based**: Built on top of Express.js for robust API handling.
- **Socket.io Integration**: Includes WebSocket support for real-time applications.
- **TypeORM Support**: ORM integration for database management.
- **Validation System**: Custom validation rules inspired by Laravel's validation.
- **Logging System**: Built-in logger for better debugging.
- **Redis Support**: Caching and session management with Redis.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/refkinscallv/oryx.git
   cd oryx
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy environment variables:

   ```sh
   cp .env.example .env
   ```

4. Build the project:

   ```sh
   npm run build
   ```

5. Start the server:

   ```sh
   npm start
   ```

## Project Structure

```
oryx/
│── docs/                 # Documentation
│── logs/                 # Log files
│── src/                  # Source code
│   ├── app/              # Application logic
│   │   ├── config/       # Configuration files
│   │   ├── database/     # Database models & repositories
│   │   ├── http/         # Controllers, middlewares, validators
│   │   ├── routes/       # API Routes
│   │   ├── services/     # Business logic services
│   ├── core/             # Framework core files
│   ├── types/            # TypeScript types
│── .env.example          # Environment variables example
│── .prettierrc           # Prettier configuration
│── .prettierignore       # Prettier ignore file
│── eslint.config.mjs     # ESLint configuration
│── nodemon.json          # Nodemon config for development
│── package.json          # Project metadata and dependencies
│── tsconfig.json         # TypeScript configuration
```

## Configuration

Edit the `.env` file to configure your environment variables.

Example:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=oryx
JWT_SECRET=your_jwt_secret
```

## Scripts

- `npm run build` - Compile TypeScript files.
- `npm start` - Start the production server.
- `npm run dev` - Start the development server with hot reload.
- `npm run lint` - Run ESLint for code quality checks.
- `npm run lint-fix` - Automatically fix lint issues.
- `npm run format` - Format the code using Prettier.

## Dependencies

### Main Dependencies
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Socket.io](https://socket.io/) - Real-time communication
- [TypeORM](https://typeorm.io/) - ORM for TypeScript & JavaScript
- [Redis](https://redis.io/) - In-memory data store
- [Validator.js](https://github.com/validatorjs/validator.js) - String validation library
- [Axios](https://axios-http.com/) - HTTP client
- [JWT](https://github.com/auth0/node-jsonwebtoken) - Authentication handling

### Dev Dependencies
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [ts-node](https://typestrong.org/ts-node/)
- [Nodemon](https://nodemon.io/)

## License

Oryx is open-source and available under the [MIT License](LICENSE).

---

Created by **Refkinscallv** 🚀

This `README.md` includes:
- Project description
- Features
- Installation guide
- Project structure breakdown
- Configuration details
- Available scripts
- Dependencies list
- License information

Let me know if you need modifications! 🚀