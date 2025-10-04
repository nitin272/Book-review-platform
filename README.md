# 📚 Readly - Book Review Platform

A comprehensive full-stack MERN application for book enthusiasts to discover, review, and share their favorite books with a vibrant community.

![Readly Banner](https://via.placeholder.com/1200x400/1a1a1a/ffffff?text=Readly+-+Book+Review+Platform)

## 🌟 Live Demo

- **Frontend**: [https://your-frontend-domain.vercel.app](https://your-frontend-domain.vercel.app)
- **Backend API**: [https://your-backend-domain.render.com](https://your-backend-domain.render.com)
- **API Documentation**: [Postman Documentation](https://documenter.getpostman.com/view/your-collection-id)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📖 **Book Management** - Add, edit, delete, and browse books
- ⭐ **Review System** - Rate and review books (1-5 stars)
- 📄 **Pagination** - Efficient book browsing (5 books per page)
- 🔒 **Protected Routes** - Secure user-specific actions
- 📊 **Dynamic Ratings** - Real-time average rating calculations

### Advanced Features
- 🔍 **Advanced Search** - Search by title, author, or description
- 🏷️ **Smart Filtering** - Filter by genre, year, and rating
- 📈 **Interactive Charts** - Rating distribution and review analytics
- 🌓 **Dark/Light Mode** - Complete theme customization
- 👤 **User Profiles** - Personal book collections and review history
- 🏘️ **Community Hub** - Social features and discussions
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance Optimized** - Redis caching and optimized queries

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Material-UI (MUI)** - Professional component library
- **React Router** - Client-side routing
- **Context API** - State management
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **SCSS** - Advanced styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Redis** - Caching layer
- **Winston** - Logging
- **CORS** - Cross-origin resource sharing

### DevOps & Tools
- **Render** - Backend deployment
- **Vercel** - Frontend deployment
- **Postman** - API testing and documentation
- **ESLint** - Code linting
- **Git** - Version control

## 📁 Project Structure

```
Book-Review-Platform/
├── backend/                    # Backend API
│   ├── config/                # Configuration files
│   │   └── .env              # Environment variables
│   ├── domain/               # Business logic & validation
│   ├── http/                 # HTTP layer
│   │   ├── controllers/      # Route controllers
│   │   ├── middlewares/      # Custom middlewares
│   │   └── routes/          # API routes
│   ├── infrasturcture/      # Database & external services
│   ├── repositories/        # Data access layer
│   ├── services/           # Business services
│   ├── utils/              # Utility functions
│   ├── server.js           # Entry point
│   └── package.json        # Dependencies
├── frontend/                  # React frontend
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable components
│   │   ├── context/         # React contexts
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.jsx          # Main app component
│   ├── package.json         # Dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                 # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend/config/`:
```env
# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string
DB_NAME=bookReview

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_32_characters_minimum
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Redis Configuration (Optional)
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password

# Environment
NODE_ENV=development
LOG_LEVEL=info

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:4500
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:4500
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 🔧 Environment Variables

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | ✅ | - |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ | - |
| `JWT_EXPIRES_IN` | JWT token expiration | ❌ | 7d |
| `REDIS_HOST` | Redis server host | ❌ | - |
| `REDIS_PORT` | Redis server port | ❌ | 6379 |
| `NODE_ENV` | Environment mode | ❌ | development |
| `PORT` | Server port | ❌ | 5000 |
| `FRONTEND_URL` | Frontend URL for CORS | ✅ | - |

### Frontend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | ✅ | - |

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-domain.render.com/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

### Book Endpoints

#### Get All Books (with pagination)
```http
GET /api/books?page=1&limit=5&search=harry&genre=Fantasy
```

#### Get Book by ID
```http
GET /api/books/:id
```

#### Create Book (Protected)
```http
POST /api/books
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description",
  "genre": "Fiction",
  "publishedYear": 2023
}
```

#### Update Book (Protected)
```http
PUT /api/books/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Book (Protected)
```http
DELETE /api/books/:id
Authorization: Bearer <jwt_token>
```

### Review Endpoints

#### Get Book Reviews
```http
GET /api/reviews/book/:bookId
```

#### Create Review (Protected)
```http
POST /api/reviews
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bookId": "book_id_here",
  "rating": 5,
  "reviewText": "Amazing book! Highly recommended."
}
```

#### Update Review (Protected)
```http
PUT /api/reviews/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "rating": 4,
  "reviewText": "Updated review text"
}
```

#### Delete Review (Protected)
```http
DELETE /api/reviews/:id
Authorization: Bearer <jwt_token>
```

### 📖 Complete API Documentation
For detailed API documentation with examples, visit our [Postman Documentation](https://documenter.getpostman.com/view/your-collection-id).

## 🗄 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Schema
```javascript
{
  _id: ObjectId,
  title: String (required, unique),
  author: String (required),
  description: String (required),
  genre: String (required),
  publishedYear: Number (required),
  addedBy: ObjectId (ref: User),
  averageRating: Number (default: 0),
  reviewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  _id: ObjectId,
  bookId: ObjectId (ref: Book),
  userId: ObjectId (ref: User),
  rating: Number (1-5, required),
  reviewText: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 📱 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x500/f8f9fa/333333?text=Home+Page+Screenshot)

### Book List with Search & Filters
![Book List](https://via.placeholder.com/800x500/f8f9fa/333333?text=Book+List+Screenshot)

### Book Details & Reviews
![Book Details](https://via.placeholder.com/800x500/f8f9fa/333333?text=Book+Details+Screenshot)

### User Profile with Analytics
![User Profile](https://via.placeholder.com/800x500/f8f9fa/333333?text=User+Profile+Screenshot)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x500/1a1a1a/ffffff?text=Dark+Mode+Screenshot)

## 🚀 Deployment

### Backend Deployment (Render)

1. **Prepare for deployment:**
   ```bash
   cd backend
   npm run build  # If you have a build script
   ```

2. **Deploy to Render:**
   - Connect your GitHub repository to Render
   - Set environment variables in Render dashboard
   - Deploy with build command: `npm install`
   - Start command: `npm start`

3. **Environment Variables on Render:**
   - Set all required environment variables
   - Update `FRONTEND_URL` to your frontend domain
   - Set `NODE_ENV=production`

### Frontend Deployment (Vercel)

1. **Prepare for deployment:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set `VITE_API_URL` to your backend domain
   - Deploy automatically on push to main branch

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Add your IP address to the whitelist (or 0.0.0.0/0 for production)
3. Create a database user
4. Get the connection string and add it to your environment variables

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test  # If you have tests configured
```

### Frontend Testing
```bash
cd frontend
npm test  # If you have tests configured
```

### API Testing with Postman
Import the Postman collection from `backend/Readly.postman_collection.json` to test all API endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Render](https://render.com) for backend deployment
- [Vercel](https://vercel.com) for frontend deployment
- [Material-UI](https://mui.com) for the component library
- [Chart.js](https://www.chartjs.org) for data visualization

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/your-username/book-review-platform/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the author directly

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Your Name]