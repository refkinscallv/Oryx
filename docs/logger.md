# 📌 Logger Utility - File-Based Logging for Oryx.js

This `Logger` utility provides structured logging by writing logs into categorized files (`info`, `error`, `warn`). It supports environment-based console logging and automatic cleanup of empty log files.

---

## 🚀 Features

- ✅ **Automatic Log Directory Creation**
- ✅ **Logs Categorized by Level (`info`, `error`, `warn`)**
- ✅ **Daily Log Files (`YYYY-MM-DD.log`)**
- ✅ **Structured Logging Format**
- ✅ **Console Logging in Development Mode**
- ✅ **Automatic Cleanup of Empty Logs**

---

## 📖 Usage

### Initializing Logger

Ensure the logger is initialized at the application startup.

```typescript
Logger.init();
```

This will:
- Create a `logs/` directory (if not exists).
- Create subdirectories for `info`, `error`, and `warn`.
- Clean up empty log files.

---

### Writing Logs

#### Info Logs

```typescript
Logger.info('User signed in', { userId: 123 });
```

📄 **Stored in:** `logs/info/YYYY-MM-DD.log`
```
[Oryx][2025-03-24 12:00:00] [INFO] User signed in | {
  "userId": 123
}
```

---

#### Warning Logs

```typescript
Logger.warn('Memory usage is high', { usage: '90%' });
```

📄 **Stored in:** `logs/warn/YYYY-MM-DD.log`
```
[Oryx][2025-03-24 12:05:00] [WARN] Memory usage is high | {
  "usage": "90%"
}
```

---

#### Error Logs

```typescript
try {
    throw new Error('Database connection failed');
} catch (error) {
    Logger.error('Critical Error:', error);
}
```

📄 **Stored in:** `logs/error/YYYY-MM-DD.log`
```
[Oryx][2025-03-24 12:10:00] [ERROR] Critical Error: | Error: Database connection failed
Stack: Error: Database connection failed
    at Object.<anonymous> (/app/server.js:10:11)
```

---

## 🔧 Environment-Based Logging

In **development mode (`APP_ENV=development`)**, logs are **also printed to the console**.

In **production mode (`APP_ENV=production`)**, logs are **only written to files**.

---

## 🗑️ Automatic Log Cleanup

The logger will delete **empty log files** daily to save storage.

---

## 🎯 Conclusion

The `Logger` utility provides **structured, categorized, and persistent logging** for Oryx.js. It ensures reliable debugging and system monitoring.