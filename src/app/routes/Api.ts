import Routes from "../../core/Routes";

/** middlewares */
import CorsMiddleware from "../http/middlewares/Cors.middleware";

/** controllers */
import UserController from "../http/controllers/User.controller";

Routes.group('/api', () => {
    Routes.group('/user', () => {
        Routes.get('/pagination', [UserController, 'pagination'])
        Routes.get('/', [UserController, 'get']);
        Routes.get('/id/:id', [UserController, 'getById']);
        Routes.get('/by', [UserController, 'getBy']);
        Routes.post('/', [UserController, 'store']);
        Routes.put('/:id', [UserController, 'update']);
        Routes.delete('/:id', [UserController, 'delete']);
    })
}, [CorsMiddleware.handle])
