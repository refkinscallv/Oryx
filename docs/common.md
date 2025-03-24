# 📌 Common Utility - Helper for Oryx.js  

This guide explains how to use the `Common` utility class, which provides helper functions for environment variables, response formatting, error handling, URL processing, and database seeding.  

---

## 🚀 Features  

- ✅ **Environment Variable Management**  
- ✅ **Base URL Formatting**  
- ✅ **URL Extraction**  
- ✅ **Error Handling Wrapper**  
- ✅ **Custom JSON Responses**  
- ✅ **View Rendering**  
- ✅ **Database Seeding Helper**  

---

## 📖 Usage  

### **Get Environment Variables**  
Retrieve values from the `.env` file with a default fallback.  

```typescript
const appUrl = Common.env('APP_URL', 'http://localhost');
console.log(appUrl); // Output: http://localhost
```

---

### **Get Base URL with Port & Segment**  
Formats the base URL based on environment variables.  

```typescript
const fullUrl = Common.baseUrl('api/users');
console.log(fullUrl); // Output: http://localhost:3000/api/users
```

---

### **Extract Properties from URL**  
Get parts of a URL such as `hostname`, `pathname`, etc.  

```typescript
const host = Common.extractUrl('https://example.com/path?query=1', 'hostname');
console.log(host); // Output: example.com
```

---

### **Handle Async Functions with Error Handling**  
Wrap async functions to handle errors automatically.  

```typescript
const result = await Common.handler(async () => {
    return await someAsyncFunction();
}, true);
```
- If `true`, it **throws an error**.  
- If `false`, it **returns a default error JSON**.  
- If a function is passed, it **handles the error with custom logic**.  

---

### **Return Standardized JSON Response**  

#### **Return JSON Data**  
Creates a structured JSON response.  

```typescript
const response = Common.rawJson(true, 200, 'Success', { id: 1, name: 'Alice' });
console.log(response);

/*
{
  status: true,
  code: 200,
  message: "Success",
  result: { id: 1, name: "Alice" }
}
*/
```

#### **Send JSON Response in Express**  
Use this inside an Express controller.  

```typescript
Common.resJson(res, true, 200, 'User found', { id: 1, name: 'Alice' });
```

---

### **Render Views with Data**  
Send HTML views in Express.  

```typescript
Common.resView(res, 'index.ejs', { title: 'Home Page' });
```

- If the view file doesn’t exist, it **returns a JSON error**.  

---

### **Execute Database Seeding**  
Insert or update database records efficiently.  

```typescript
await Common.executeSeed({
    repo: UserRepository,
    entity: UserEntity,
    data: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
});
```

✔ **Auto-inserts & updates** existing records.  
✔ Skips if no data is provided.  

---

## 🔧 Error Handling  

If an error occurs in any function, it is automatically logged and handled, ensuring **stability and debugging ease**.  

Example error logs:  
```
Redis GET Error for key user:123: Connection failed
Failed to render view: index.ejs not found
```

---

## 🎯 Conclusion  

The `Common` utility class is a **powerful helper** for Oryx.js, simplifying:  
✔ **Environment handling**  
✔ **Error handling**  
✔ **Database seeding**  
✔ **API responses**  