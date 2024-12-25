# Welcome to the documentation for the **Authentication Feature**.

---

# **Authentication Feature Documentation**

## **Table of Contents**
1. [What is Authentication?](#what-is-authentication)
2. [Why is Authentication Important?](#why-is-authentication-important)
3. [Data Points and Their Purpose](#data-points-and-their-purpose)
4. [API Endpoints](#api-endpoints)
   - [1. Signup](#1-signup)
   - [2. Login](#2-login)
   - [3. Two-Factor Authentication (2FA)](#3-two-factor-authentication-2fa)
   - [4. User Roles Management](#4-user-roles-management)
   - [5. Authentication Status](#5-authentication-status)
5. [API Endpoint Samples](#api-endpoint-samples)
   - [Request](#request)
   - [Response](#response)

---

## **What is Authentication?**

Authentication is the process of verifying the identity of a user or system attempting to access a resource. It ensures that only authorized individuals or systems can interact with the application's sensitive features, data, or resources.

---

## **Why is Authentication Important?**

1. **Security:** Protects user accounts and sensitive data from unauthorized access.
2. **Access Control:** Ensures that users can access only the resources and features they are authorized for.
3. **User Experience:** Provides seamless login and personalized access for verified users.
4. **Legal Compliance:** Ensures adherence to data protection regulations such as GDPR, HIPAA, or PCI-DSS.

---

## **Data Points and Their Purpose**

| **Field**             | **Type**       | **Purpose**                                                                            |
|-----------------------|---------------|---------------------------------------------------------------------------------------|
| `name`               | `string`      | Stores the user's full name.                                                          |
| `email`              | `string`      | Serves as a unique identifier for account creation and communication.                 |
| `phone`              | `string`      | Alternate identifier for login and communication.                                     |
| `password`           | `string`      | Secures the user account (stored as a hashed value).                                  |
| `role`               | `enum`        | Specifies user permissions (Customer, Seller, Admin).                                 |
| `isVerified`         | `boolean`     | Indicates if the user has verified their email/phone.                                 |
| `twoFactorEnabled`   | `boolean`     | Enables or disables two-factor authentication for the user.                           |
| `twoFactorCode`      | `string`      | Stores temporary 2FA codes for validation.                                            |
| `socialMediaProvider`| `enum`        | Tracks social login method (e.g., Google, Facebook).                                  |

---

## **API Endpoints**

**list of all API endpoints** for the authentication system, including detailed use cases for **email, phone, and social login**:

---

### **1. Registration**
- **POST** `/api/auth/register`  
  Register a new user with at least one mandatory identifier: email, phone, or social login.

---

### **2. Login**
#### **Email & Password Login**
- **POST** `/api/auth/login`  
  Login using email and password.

#### **Phone & OTP Login**
- **POST** `/api/auth/login-phone`  
  Login using phone number and OTP.

#### **Social Login**
- **POST** `/api/auth/social-login`  
  Login or register using a social account (Google, Apple, Facebook, X, Microsoft).

---

### **3. Phone Authentication**
#### **Send OTP**
- **POST** `/api/auth/phone/send-otp`  
  Send an OTP to a phone number.

#### **Verify OTP**
- **POST** `/api/auth/phone/verify-otp`  
  Verify an OTP for phone authentication.

---

### **4. Forgot & Reset Password**
#### **Forgot Password**
- **POST** `/api/auth/forgot-password`  
  Send a password reset link to an email address.

#### **Reset Password**
- **POST** `/api/auth/reset-password`  
  Reset a password using a token.

---

### **5. Account Linking**
- **POST** `/api/auth/link-account`  
  Link additional accounts (social, email, or phone) to an existing user.

---

### **6. User Management**
#### **Get Authenticated User Details**
- **GET** `/api/auth/me`  
  Fetch the currently logged-in user's profile details.

#### **Update User Profile**
- **PUT** `/api/auth/update-profile`  
  Update the user’s profile (e.g., name, additional fields).

---

### **7. Logout**
- **POST** `/api/auth/logout`  
  Logout the user and invalidate their tokens.

---

### **8. Token Management**
#### **Refresh Token**
- **POST** `/api/auth/refresh-token`  
  Refresh an expired access token using a refresh token.

---

### **9. Social Login Callback Endpoints**  
(For handling OAuth callbacks for each social provider.)
- **GET** `/api/auth/oauth/google/callback`
- **GET** `/api/auth/oauth/apple/callback`
- **GET** `/api/auth/oauth/facebook/callback`
- **GET** `/api/auth/oauth/x/callback`  
  (X refers to Twitter.)
- **GET** `/api/auth/oauth/microsoft/callback`

---

### **Summary Table of Endpoints**

| **Category**           | **Endpoint**                              | **Method** |
|-------------------------|-------------------------------------------|------------|
| **Registration**        | `/api/auth/register`                     | POST       |
| **Login**               | `/api/auth/login`                        | POST       |
|                         | `/api/auth/login-phone`                  | POST       |
|                         | `/api/auth/social-login`                 | POST       |
| **Phone Authentication**| `/api/auth/phone/send-otp`               | POST       |
|                         | `/api/auth/phone/verify-otp`             | POST       |
| **Forgot Password**     | `/api/auth/forgot-password`              | POST       |
| **Reset Password**      | `/api/auth/reset-password`               | POST       |
| **Account Linking**     | `/api/auth/link-account`                 | POST       |
| **User Management**     | `/api/auth/me`                           | GET        |
|                         | `/api/auth/update-profile`               | PUT        |
| **Logout**              | `/api/auth/logout`                       | POST       |
| **Token Management**    | `/api/auth/refresh-token`                | POST       |
| **Social Callbacks**    | `/api/auth/oauth/google/callback`        | GET        |
|                         | `/api/auth/oauth/apple/callback`         | GET        |
|                         | `/api/auth/oauth/facebook/callback`      | GET        |
|                         | `/api/auth/oauth/x/callback`             | GET        |
|                         | `/api/auth/oauth/microsoft/callback`     | GET        |



## **API Endpoint Samples**

**Breakdown of the Authentication API with examples**, where **at least one identifier (email, phone, or social) is mandatory for registration**. This also includes **optional fields**, advanced flows, and support for **Google, Apple, Facebook, X (Twitter), Microsoft**, and **phone-based authentication**.

---

## **1. Registration Endpoint**
### **Endpoint**: `/api/auth/register`  
### **Method**: `POST`  
### **Description**: Allows new users to register by providing at least one identifier: email, phone, or social login.  

#### **Scenarios**:
1. **Register with Email and Password** (Mandatory)  
2. **Register with Phone and OTP** (Mandatory)  
3. **Register with Social Login** (Mandatory)  
4. **Optionally include additional identifiers** during or after registration.

---

#### **Example Request: Email & Password Only**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPassword123"
}
```

#### **Example Request: Phone & OTP Only**
```json
{
  "name": "Jane Doe",
  "phone": "+1234567890",
  "otp": "123456"
}
```

#### **Example Request: Social Login Only**
```json
{
  "name": "Chris Appleton",
  "socialProvider": "google",
  "socialToken": "GoogleOAuthTokenHere"
}
```

#### **Example Request: Email, Phone, and Social**
```json
{
  "name": "Emma Johnson",
  "email": "emma.johnson@example.com",
  "password": "SecurePass123",
  "phone": "+9876543210",
  "socialProvider": "facebook",
  "socialToken": "FacebookOAuthTokenHere"
}
```

---

#### **Example Response**
```json
{
  "message": "Registration successful",
  "userId": "uniqueUserId123",
  "token": "JWT-TokenHere",
  "linkedAccounts": ["email", "phone", "facebook"]
}
```

---

## **2. Login Endpoints**

### **2.1 Login with Email & Password**
#### **Endpoint**: `/api/auth/login`  
#### **Method**: `POST`  
#### **Description**: Authenticate a user using email and password.

#### **Request Body**
```json
{
  "email": "john.doe@example.com",
  "password": "StrongPassword123"
}
```

#### **Response**
```json
{
  "token": "JWT-TokenHere",
  "refreshToken": "RefreshTokenHere",
  "userId": "uniqueUserId123",
  "message": "Login successful"
}
```

---

### **2.2 Login with Phone & OTP**
#### **Endpoint**: `/api/auth/login-phone`  
#### **Method**: `POST`  
#### **Description**: Authenticate a user using phone number and OTP.

#### **Request Body**
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

#### **Response**
```json
{
  "token": "JWT-TokenHere",
  "refreshToken": "RefreshTokenHere",
  "userId": "uniqueUserId123",
  "message": "Login successful"
}
```

---

### **2.3 Login with Social Login**
#### **Endpoint**: `/api/auth/social-login`  
#### **Method**: `POST`  
#### **Description**: Login or register a user using a social account.

#### **Request Body**
```json
{
  "provider": "google",
  "socialToken": "GoogleOAuthTokenHere"
}
```

#### **Supported Providers**:
- `google`
- `apple`
- `facebook`
- `x` (Twitter)
- `microsoft`

#### **Response**
```json
{
  "token": "JWT-TokenHere",
  "refreshToken": "RefreshTokenHere",
  "userId": "uniqueUserId123",
  "message": "Login successful"
}
```

---

## **3. Phone Authentication**

### **3.1 Send OTP**
#### **Endpoint**: `/api/auth/phone/send-otp`  
#### **Method**: `POST`  
#### **Description**: Sends a One-Time Password (OTP) to the user's phone.

#### **Request Body**
```json
{
  "phone": "+1234567890"
}
```

#### **Response**
```json
{
  "message": "OTP sent successfully"
}
```

---

### **3.2 Verify OTP**
#### **Endpoint**: `/api/auth/phone/verify-otp`  
#### **Method**: `POST`  
#### **Description**: Verify the OTP and authenticate the user.

#### **Request Body**
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

#### **Response**
```json
{
  "token": "JWT-TokenHere",
  "userId": "uniqueUserId123",
  "message": "Phone verification successful"
}
```

---

## **4. Forgot & Reset Password**

### **4.1 Forgot Password**
#### **Endpoint**: `/api/auth/forgot-password`  
#### **Method**: `POST`  
#### **Description**: Sends a password reset link to the user's email.

#### **Request Body**
```json
{
  "email": "john.doe@example.com"
}
```

#### **Response**
```json
{
  "message": "Password reset link sent to email"
}
```

---

### **4.2 Reset Password**
#### **Endpoint**: `/api/auth/reset-password`  
#### **Method**: `POST`  
#### **Description**: Reset the user's password using a token.

#### **Request Body**
```json
{
  "token": "resetTokenHere",
  "newPassword": "NewSecurePassword123"
}
```

#### **Response**
```json
{
  "message": "Password reset successful"
}
```

---

## **5. Link Additional Accounts**
#### **Endpoint**: `/api/auth/link-account`  
#### **Method**: `POST`  
#### **Description**: Link additional accounts (social, email, or phone) to an existing user account.

#### **Request Body**
```json
{
  "provider": "facebook",
  "socialToken": "FacebookOAuthTokenHere"
}
```

#### **Response**
```json
{
  "message": "Account linked successfully",
  "linkedAccounts": ["google", "facebook", "phone"]
}
```

---

## **6. User Management**

### **6.1 Get Authenticated User Details**
#### **Endpoint**: `/api/auth/me`  
#### **Method**: `GET`  
#### **Description**: Fetch the currently logged-in user's details.

#### **Headers**
```json
{
  "Authorization": "Bearer JWT-TokenHere"
}
```

#### **Response**
```json
{
  "userId": "uniqueUserId123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "linkedSocialAccounts": ["google", "facebook"],
  "roles": ["user"]
}
```

---

## **7. Logout**

### **Endpoint**: `/api/auth/logout`  
### **Method**: `POST`  
### **Description**: Log the user out and invalidate their tokens.

#### **Request Body**
```json
{
  "refreshToken": "RefreshTokenHere"
}
```

#### **Response**
```json
{
  "message": "Logout successful"
}
```

---

### **Additional Notes**
1. **Social Login Providers**:
   - Set up individual OAuth integrations for Google, Apple, Facebook, X, and Microsoft.
2. **OTP Management**:
   - Use a service like Twilio, Firebase, or a custom SMS gateway for phone-based OTP.
3. **Token Security**:
   - Use secure JWT tokens with appropriate expiry times.
   - Refresh tokens must be stored securely and revocable.

