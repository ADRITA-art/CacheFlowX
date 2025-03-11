# 🚀 CacheFlowX

CacheFlowX is a high-performance, Redis-powered API backend built using Node.js and Express. It efficiently handles user authentication, chat messaging, leaderboards, task management, and user preferences while incorporating caching and rate limiting to enhance performance.

## ✨ Features

- 🔐 **User Authentication**: Secure login and logout functionality using JWT authentication.
- 💬 **Chat System**: Redis Streams for handling real-time chat messaging.
- 🏆 **Leaderboard Management**: Tracks and ranks users based on performance.
- 📌 **Task Management**: Enqueues tasks with priority levels and processes them asynchronously using Bull Queue.
- 👤 **User Profile Management**: Allows users to update their email and username.
- ⚡ **Caching Middleware**: Uses Redis to cache responses for frequently requested data.
- ⏳ **Rate Limiting**: Protects endpoints from abuse by limiting requests per user.

## 🛠 Technologies Used

- **Node.js & Express**: Backend framework for building REST APIs.
- **Redis**: Used for caching, rate limiting, and real-time message streams.
- **Bull Queue**: Manages background task processing.
- **JWT (JSON Web Token)**: Handles authentication securely.
- **ioredis**: Library for interacting with Redis.
- **bcryptjs**: Encrypts user passwords.
- **nodemon**: Development tool for automatically restarting the server.
- **Postman**: API testing tool.

## 📁 Folder Structure

```
CacheFlowX/
│-- controllers/
│   ├── authControllers.js
│   ├── chatControllers.js
│   ├── leaderboardControllers.js
│   ├── profileControllers.js
│   ├── taskControllers.js
│   ├── userControllers.js
│-- middleware/
│   ├── cacheMiddleware.js
│   ├── rateLimiter.js
│-- queue/
│   ├── queue.js
|   ├── worker.js
│-- routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   ├── leaderboardRoutes.js
│   ├── profileRoutes.js
│   ├── taskRoutes.js
│-- server.js
│-- package.json
│-- .env
```

## ⚙️ Installation

### Prerequisites

- Install **Node.js** (v16+ recommended)
- Install **Redis** (v6.2.0+ recommended)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ADRITA-art/CacheFlowX.git
   cd CacheFlowX
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Redis server (if not already running):
   ```bash
   redis-server
   ```
4. Create a `.env` file with the following:
   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```
5. Start the application:
   ```bash
   npm start
   ```

## 📌 API Endpoints

### 🔐 Authentication

- **Login**: `POST /api/auth/login`
  - Request Body:
    ```json
    {
      "username": "adrita",
      "password": "securepassword"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful!",
      "token": "your_jwt_token"
    }
    ```
- **Logout**: `POST /api/auth/logout`

### 👤 User Profile

- **Update Profile**: `POST /api/profile/update`
  - Request Body:
    ```json
    {
      "username": "newUsername",
      "newEmail": "newemail@example.com"
    }
    ```

### 💬 Chat System

- **Send a message**: `POST /api/chat/send`
  - Request Body:
    ```json
    {
      "sender": "adrita",
      "message": "Hello!"
    }
    ```
  - Uses Redis Streams  to store messages.

### 🏆 Leaderboard

- **Get Leaderboard**: `GET /api/leaderboard`

### 📌 Task Management

- **Control Tasks**: `POST http://localhost:3000/api/tasks/control`
  - Request Body:
    ```json
    {
      "taskName": "new Task",
      "priority": "high"
    }
    ```
  - Tasks are added to Bull Queue and processed asynchronously.
  - **Output in Terminal**:
    ```
    Task received: new Task, Priority: high
    Task processed successfully!
    ```

## 🛡 Middleware Explanation

### 🗄 **1. Caching Middleware** (`cacheMiddleware.js`)

- Checks if requested data exists in Redis cache.
- If cached, returns the stored response; otherwise, proceeds to fetch fresh data.
- Enhances performance by reducing database queries.

### 🚦 **2. Rate Limiting Middleware** (`rateLimiter.js`)

- Uses Redis to count user requests within a time window.
- Restricts excessive API calls, preventing abuse and server overload.
- Example: Limits requests to `10 per minute` for each user.

## 🔬 How to Test with Postman

1. **Start the backend server** using `npm start`.
2. **Login** to get a JWT token (`POST /api/auth/login`).
3. Copy the token from the response and set it in Postman headers:
   ```
   Key: Authorization
   Value: Bearer your_jwt_token
   ```
4. Send requests to different endpoints and observe the responses.

## 🚀 Applications

- **Real-Time Chat**: Uses Redis Streams (`XADD`) for instant messaging.
- **Caching System**: Reduces database queries by caching leaderboard results and user profiles.
- **Task Queue Management**: Prioritizes and executes background tasks asynchronously using Bull Queue.
- **Leaderboard System**: Efficiently tracks and ranks users using Redis Sorted Sets.

## 🔮 Future Enhancements

- Implement WebSockets for live chat updates.
- Add email notifications for user activities.
- Enhance security with OAuth authentication.
