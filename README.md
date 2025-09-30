# Form API Backend

A robust backend API for user authentication and form handling built with Node.js, Express, and MongoDB.

## Features

- User authentication (Login/Register/Logout)
- JWT based authorization
- File upload support
- Secure password handling
- CORS enabled
- Error handling middleware
- Environmental variables support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Bcrypt
- Multer
- Cloudinary

## Project Structure

```
src/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
└── db/            # Database configuration
```

## API Endpoints

### Authentication
- POST `/api/v1/users/register` - Register new user
- POST `/api/v1/users/login` - Login user
- POST `/api/v1/users/logout` - Logout user

### User Operations
- GET `/api/v1/users/profile` - Get user profile
- PATCH `/api/v1/users/update` - Update user details
- PATCH `/api/v1/users/password` - Change password

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=http://localhost:5173
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd Backend
npm install
```

3. Set up environment variables:
```bash
cp .env.sample .env
```

4. Start the development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Error Handling

The API uses a custom error handling mechanism:
- `ApiError` class for consistent error responses
- Standardized error format
- Proper HTTP status codes

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Request rate limiting
- HTTP security headers
- XSS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.