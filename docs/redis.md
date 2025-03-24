### **Set Data in Redis**  
Store a key-value pair in Redis, optionally with an expiration time (TTL in seconds).  

```typescript
await OryxRedis.set('user:123', { name: 'John Doe', role: 'admin' }, 3600);
```
✅ Data will expire after **1 hour (3600 seconds)**.  

---

### **Get Data from Redis**  
Retrieve stored data by key.  

```typescript
const user = await OryxRedis.get<{ name: string; role: string }>('user:123');
console.log(user?.name); // Output: John Doe
```

---

### **Delete Data from Redis**  
Remove a key from Redis.  

```typescript
await OryxRedis.delete('user:123');
```

---

### **Publish Messages to a Channel**  
Send messages to Redis Pub/Sub channels.  

```typescript
await OryxRedis.publish('notifications', { message: 'Hello World!' });
```

---

### **Subscribe to a Channel**  
Listen for messages from a Redis channel.  

```typescript
await OryxRedis.subscribe('notifications', (message) => {
    console.log('Received:', message);
});
```

---

### **Close Redis Connection (Optional)**  
Manually close the Redis connection when needed.  

```typescript
await OryxRedis.close();
```

---

## 🔧 Error Handling  

Errors are logged using **Oryx Logger**, so any Redis failures will be recorded automatically.  

If Redis is unreachable or encounters an issue, errors will appear in your logs:  
```
Redis Error: Connection refused
Redis SET Error for key user:123: Timeout
```

Make sure Redis is running before using `OryxRedis`! 🚀  

---

## 🎯 Conclusion  

Now you have a fully functional Redis helper for Oryx.js. You can use it for:  
✔️ **Caching API responses**  
✔️ **Storing session data**  
✔️ **Real-time messaging with Pub/Sub**  

If you have any issues, check the logs or verify your Redis configuration in `.env`.  