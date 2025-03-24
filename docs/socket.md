# **OryxSocket - WebSocket Module for Oryx.js**  

## **Description**  
`OryxSocket` is a module that manages WebSocket connections using **Socket.io**. It connects **Socket.io** to the main **OryxServer**, enforces **CORS policies**, and provides basic mechanisms for handling client connections.  

---

## **Features**  
- **Automatic WebSocket Server Initialization** – Uses `OryxServer` as the underlying HTTP server.  
- **CORS Management** – Restricts access based on allowed origins.  
- **Logging Support** – Logs connection events and CORS blocks.  

---

## **Usage**  

### **Importing the Module**  
To use `OryxSocket`, simply import it in your application:  

```typescript
import OryxSocket from './core/OryxSocket';
```

Since `OryxSocket.io` is a static property, you can access the **Socket.io server** instance directly:

```typescript
OryxSocket.io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
});
```

---

## **Class: `OryxSocket`**  

### **Static Properties**  
| Property | Type | Description |
|----------|------|-------------|
| `io` | `Server` | The main **Socket.io** instance bound to `OryxServer.server`. |

---

### **Static Methods**  

#### **`corsHandler(origin: string | undefined, callback: Function): void`**  
Handles CORS restrictions for incoming WebSocket connections.  

**Parameters:**  
- `origin` _(string | undefined)_: The origin of the incoming connection.  
- `callback` _(Function)_: A function that decides whether to allow or block the connection.  

**Example Usage:**  
This function is automatically used in the CORS configuration for `Socket.io`.  

---

## **Example Usage in Controllers**  

### **Emitting an Event to Clients**
```typescript
OryxSocket.io.emit('message', { text: 'Hello, clients!' });
```

### **Listening for Client Events**
```typescript
OryxSocket.io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('chatMessage', (msg) => {
        console.log('Received:', msg);
    });
});
```

---

## **Notes**
- This module **requires** `OryxServer.ts` to be properly initialized.  
- CORS policy is enforced using **socketWhitelist** from `Cors.ts`.  
- The `OryxSocket.io` instance is available globally, ensuring consistency across the application.  
