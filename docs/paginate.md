# 📌 Pagination Utility for Oryx.js (TypeORM)

The `Paginate` utility simplifies pagination when using **TypeORM** repositories. It supports **filtering**, **relations**, and **page-based results**.

---

## 🚀 Features

- ✅ **Flexible Pagination with `page` and `limit`**
- ✅ **Supports Filtering with `LIKE` Queries**
- ✅ **Supports Relations (`JOIN`)**
- ✅ **Returns Pagination Metadata (`total`, `max_page`)**

---

## 📖 Usage

### Importing the Pagination Utility

```typescript
import Paginate from './Paginate';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
```

---

### Paginating Data

```typescript
const userRepo = getRepository(User);

const result = await Paginate.make(userRepo, {
    page: 2,
    limit: 5,
    filter: { name: 'John' },
});
```

---

### Response Structure

The function returns:

```json
{
    "limit": 5,
    "page": 2,
    "total": 42,
    "max_page": 9,
    "data": [
        {
            "id": 6,
            "name": "John Doe",
            "email": "johndoe@example.com"
        },
        ...
    ]
}
```

---

## 🔍 Filtering Data

Filtering is **optional** but allows searching with `LIKE` queries.

Example:

```typescript
await Paginate.make(userRepo, {
    page: 1,
    limit: 10,
    filter: { email: 'example.com' } // Finds users with 'example.com' in email
});
```

---

## 🔗 Including Relations

To **fetch related entities**, pass an array of relations.

Example:

```typescript
await Paginate.make(userRepo, {
    page: 1,
    limit: 5
}, ['profile', 'posts']);
```

📄 **This will generate:**

```sql
SELECT * FROM users
LEFT JOIN profiles ON users.profileId = profiles.id
LEFT JOIN posts ON users.id = posts.userId
WHERE users.name LIKE '%John%'
LIMIT 5 OFFSET 0;
```

---

## 🎯 Conclusion

The `Paginate` utility provides **efficient**, **flexible**, and **structured pagination** for Oryx.js applications. It makes handling paginated responses easy with TypeORM.