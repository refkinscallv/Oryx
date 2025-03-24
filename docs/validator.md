# **Validator - Data Validation Module for Oryx.js**  

## **Description**  
The `Validator` class is a flexible and extensible validation system for handling form and request data. It supports various validation rules, including **required, nullable, matches (regex), same (field comparison), and built-in `validator.js` functions**.  

---

## **Features**  
- **Multiple Validation Rules** – Supports chaining rules using the `|` separator.  
- **Custom Error Messages** – Generates error messages for each failed validation.  
- **Extends `validator.js`** – Uses built-in validation functions like `isEmail`, `isNumeric`, etc.  
- **First-Class Error Handling** – Retrieve **all errors** or only the **first error per field**.  

---

## **Usage**  

### **Importing the Validator**  
```typescript
import Validator from './core/Validator';
```

### **Example Usage**
```typescript
const validator = new Validator();
validator.make(
    { email: 'invalid-email' },
    [{ name: 'email', label: 'Email', type: 'required|isEmail' }]
);

if (validator.fails()) {
    console.log(validator.errorsAll());
}
```
**Output:**  
```json
{
    "email": ["Email is invalid format"]
}
```

---

## **Class: `Validator`**  

### **Properties**  
| Property | Type | Description |
|----------|------|-------------|
| `fail` | `boolean` | Indicates whether validation has failed. |
| `errors` | `ValidationErrors` | Stores validation error messages. |

---

### **Methods**  

#### **`make(data: Record<string, any>, rules: ValidatorData): void`**  
Validates data based on the specified rules.  

**Parameters:**  
- `data` _(Record<string, any>)_: The object containing the values to validate.  
- `rules` _(ValidatorData)_: The validation rules for each field.  

**Example:**  
```typescript
validator.make(
    { password: '1234', confirmPassword: '12345' },
    [
        { name: 'password', label: 'Password', type: 'required|minLength:6' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'same:password' }
    ]
);
```

---

#### **`fails(): boolean`**  
Returns `true` if validation failed.  

```typescript
if (validator.fails()) {
    console.log('Validation failed!');
}
```

---

#### **`passes(): boolean`**  
Returns `true` if validation passed.  

```typescript
if (validator.passes()) {
    console.log('Validation successful!');
}
```

---

#### **`errorsAll(): ValidationErrors`**  
Returns all validation errors.  

```typescript
console.log(validator.errorsAll());
```

---

#### **`firstError(field: string): string | null`**  
Returns the first validation error for a specific field.  

```typescript
console.log(validator.firstError('email'));
```

---

## **Supported Validation Rules**  

### **Basic Rules**
| Rule | Description | Example |
|------|------------|---------|
| `required` | Field must not be empty | `required` |
| `nullable` | Allows null or empty values | `nullable` |

### **String Rules**
| Rule | Description | Example |
|------|------------|---------|
| `matches:regex` | Must match a regular expression | `matches:^[A-Za-z]+$` |
| `same:field` | Must match another field's value | `same:password` |

### **Validator.js Rules**
Uses built-in **validator.js** functions, such as:  
- `isEmail`
- `isNumeric`
- `isUUID`
- `isDate`
- `isAlpha`
- `isAlphanumeric`  

Example:
```typescript
{ name: 'email', label: 'Email', type: 'isEmail' }
```

---

## **Notes**  
- If a rule is unknown, an error message will indicate that the rule is not supported.  
- Uses **`validator.js`** for extended validation support.  
- You can chain multiple rules using `|`.  