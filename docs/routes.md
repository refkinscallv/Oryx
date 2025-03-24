Berikut adalah perbaikan `docs.md` agar mencerminkan fitur terbaru seperti **route grouping, middleware di grup, dan error logging dengan `Logger`**.  

---

# 🚀 **Route Management for Oryx.js**

The `Routes` utility simplifies **Express.js** route definitions by providing a structured and reusable API.

---

## 🎯 **Features**
- ✅ **Declarative Route Definitions**
- ✅ **Supports All HTTP Methods**
- ✅ **Middleware Integration (Route & Group Level)**
- ✅ **Controller-Based Route Handling**
- ✅ **Automatic Route Binding**
- ✅ **Route Grouping with Prefixes**
- ✅ **Built-in Error Logging with Oryx `Logger`**

---

## 📖 **Usage**

### **Importing the Router Utility**
```typescript
import Routes from './Routes';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
```

---

### **Defining Routes**

#### **Simple GET Route**
```typescript
Routes.get('/users', (req, res) => {
    res.json({ message: 'List of users' });
});
```

---

#### **Using Controllers**
```typescript
Routes.add(['get', 'post'], '/users', [UserController, 'index']);
```
📌 **Equivalent to:**
```typescript
router.get('/users', UserController.index.bind(UserController));
router.post('/users', UserController.index.bind(UserController));
```

---

## 🔗 **Applying Routes**

Once routes are defined, **apply them to an Express router**:
```typescript
const router = Router();
Routes.apply(router);
export default router;
```

---

## 🛡️ **Middleware Support**

You can **attach middleware** to individual routes.

Example:
```typescript
Routes.get('/dashboard', (req, res) => {
    res.json({ message: 'Protected route' });
}, [AuthMiddleware]);
```

---

## 🔀 **Grouping Routes with Middleware**
You can **group routes** under a common prefix and attach **middleware** to all routes inside the group.

### **Example:**
```typescript
Routes.group('/users', () => {
    Routes.get('/', [UserController, 'index']); // GET /users/
    Routes.get('/:id', [UserController, 'show']); // GET /users/:id
    Routes.post('/', [UserController, 'store']); // POST /users/
    Routes.put('/:id', [UserController, 'update']); // PUT /users/:id
    Routes.delete('/:id', [UserController, 'destroy']); // DELETE /users/:id
}, [AuthMiddleware]);
```
📌 **All routes inside `/users` are protected by `AuthMiddleware`**.

---

## 🔄 **Automatic Controller Binding**
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

## ❌ **Error Handling & Logging**
The router **automatically wraps functions inside a try-catch block**, logging errors using the Oryx `Logger`.

Example:
```typescript
Routes.get('/error', async () => {
    throw new Error('Something went wrong!');
});
```
📌 If an error occurs, **it will be logged and passed to Express’s error handler**.

---

## 🎯 **Conclusion**
The `Routes` utility simplifies route management in **Oryx.js**, making it **more structured, flexible, and easier to maintain**. Now with **grouping, middleware, and built-in logging**, route management is even more powerful. 🚀