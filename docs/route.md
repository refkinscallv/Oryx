# 🚀 Route Management for Oryx.js

The `Routes` utility simplifies **Express.js** route definitions by providing a structured and reusable API.

---

## 🎯 Features

- ✅ **Declarative Route Definitions**
- ✅ **Supports Multiple HTTP Methods**
- ✅ **Middleware Integration**
- ✅ **Controller-Based Route Handling**
- ✅ **Automatic Route Binding**

---

## 📖 Usage

### Importing the Router Utility

```typescript
import Routes from './Routes';
import { Router } from 'express';
import UserController from '../controllers/UserController';
```

---

### Defining Routes

#### Simple GET Route

```typescript
Routes.get('/users', (req, res) => {
    res.json({ message: 'List of users' });
});
```

---

#### Using Controllers

```typescript
Routes.add(
    ['get', 'post'],
    '/users',
    [UserController, 'index'],
);
```

📌 **Equivalent to:**
```typescript
router.get('/users', UserController.index.bind(UserController));
router.post('/users', UserController.index.bind(UserController));
```

---

## 🔗 Applying Routes

Once routes are defined, **apply them to an Express router**:

```typescript
const router = Router();
Routes.apply(router);
export default router;
```

---

## 🛡️ Middleware Support

You can **attach middleware** to routes easily.

Example:

```typescript
import AuthMiddleware from '../middlewares/AuthMiddleware';

Routes.get('/dashboard', (req, res) => {
    res.json({ message: 'Protected route' });
}, [AuthMiddleware]);
```

---

## 🔄 Automatic Controller Binding

If a handler is defined as `[Controller, 'method']`, the utility **automatically binds the method** to the controller.

Example:

```typescript
Routes.get('/profile', [UserController, 'profile']);
```

📌 **Equivalent to:**
```typescript
router.get('/profile', UserController.profile.bind(UserController));
```

---

## ❌ Error Handling

The route handler **automatically wraps functions** inside a try-catch block to handle errors properly.

---

## 🎯 Conclusion

The `Routes` utility simplifies route management in **Oryx.js**, making it **more structured**, **flexible**, and **easier to maintain**.