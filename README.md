# 📚 Readly - Book Review Platform

A comprehensive full-stack MERN application for book enthusiasts to discover, review, and share their favorite books with a vibrant community.

## 🌟 Live Demo

- **Frontend**: [https://book-review-platform.pages.dev](https://book-review-platform.pages.dev)
- **Backend API**: [https://book-review-platform-nekp.onrender.com](https://book-review-platform-nekp.onrender.com)
- **API Documentation**: [View Complete API Docs](https://documenter.getpostman.com/view/32417335/2sB3QGuXcT)

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure signup/login with JWT tokens & HTTP-only cookies
- 📖 **Book Management** - Add, edit, delete, and browse books with full CRUD operations
- ⭐ **Review System** - Rate and review books (1-5 stars) with text reviews
- 📄 **Pagination** - Efficient book browsing (5 books per page)
- 🔒 **Protected Routes** - Secure user-specific actions with middleware authentication
- 📊 **Dynamic Ratings** - Real-time average rating calculations

### Advanced Features
- 🔍 **Advanced Search & Filtering** - Search by title/author, filter by genre, year, rating
- 📈 **Interactive Charts** - Rating distribution and review analytics with Chart.js
- 🌓 **Dark/Light Mode** - Complete theme customization with smooth transitions
- 👤 **User Profiles** - Personal book collections and review history with analytics
- 🏘️ **Community Hub** - Social features and discussion forums
- 📱 **Responsive Design** - Mobile-first approach with Material-UI components
- ⚡ **Performance Optimized** - Redis caching and optimized database queries

## � Tech Stack

**Frontend:** React 19, Material-UI, React Router, Context API, Chart.js, Axios, SCSS, Vite  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt, Redis, Winston  
**DevOps:** Render (Backend), Cloudflare Pages (Frontend), Postman (API Testing)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### 1. Clone & Install
```bash
git clone https://github.com/nitin272/book-review-platform.git
cd book-review-platform

# Backend setup
cd backend && npm install

# Frontend setup  
cd ../frontend && npm install
```

### 2. Environment Configuration

**Backend** (`backend/config/.env`):
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_32_characters_minimum
FRONTEND_URL=http://localhost:4500
NODE_ENV=development
PORT=5000
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Application
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)  
npm run dev
```

**Access:** Frontend at http://localhost:4500, Backend at http://localhost:5000/api

## 📚 API Documentation

### Quick API Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |
| `GET` | `/auth/profile` | Get user profile | ✅ |
| `GET` | `/books` | Get all books (paginated) | ❌ |
| `POST` | `/books` | Create new book | ✅ |
| `GET` | `/books/:id` | Get book details | ❌ |
| `PUT` | `/books/:id` | Update book | ✅ |
| `DELETE` | `/books/:id` | Delete book | ✅ |
| `GET` | `/reviews/book/:bookId` | Get book reviews | ❌ |
| `POST` | `/reviews` | Create review | ✅ |
| `PUT` | `/reviews/:id` | Update review | ✅ |
| `DELETE` | `/reviews/:id` | Delete review | ✅ |

### 📖 Complete Documentation
**[View Full API Documentation →](https://documenter.getpostman.com/view/32417335/2sB3QGuXcT)**

Includes detailed request/response examples, authentication flows, error handling, and interactive testing.

## 🗄 Database Schema

```javascript
// User Schema
{
  name: String (required),
  email: String (required, unique), 
  password: String (required, hashed)
}

// Book Schema  
{
  title: String (required, unique),
  author: String (required),
  description: String (required),
  genre: String (required),
  publishedYear: Number (required),
  addedBy: ObjectId (ref: User),
  averageRating: Number (default: 0),
  reviewCount: Number (default: 0)
}

// Review Schema
{
  bookId: ObjectId (ref: Book),
  userId: ObjectId (ref: User), 
  rating: Number (1-5, required),
  reviewText: String (required)
}
```

## 🚀 Deployment

### Production URLs
- **Frontend**: Deployed on Cloudflare Pages
- **Backend**: Deployed on Render  
- **Database**: MongoDB Atlas

### Deploy Your Own
1. **Backend (Render)**: Connect GitHub repo, set environment variables, deploy
2. **Frontend (Vercel/Netlify)**: Connect repo, set `VITE_API_URL`, deploy
3. **Database**: Create MongoDB Atlas cluster, whitelist IPs, get connection string

Detailed deployment guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📁 Project Structure

```
├── backend/                 # Express.js API
│   ├── config/             # Environment configuration
│   ├── http/               # Controllers, routes, middlewares
│   ├── services/           # Business logic
│   ├── repositories/       # Data access layer
│   └── domain/             # Validation & business rules
├── frontend/               # React application  
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   └── services/      # API services
└── README.md
```

## 🧪 Testing

**API Testing**: Import `backend/Readly.postman_collection.json` into Postman  
**Manual Testing**: Use the deployed application or run locally

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**  
📧 [your.email@example.com](mailto:nitinsoni95092@gmail.com)  
🐙 [GitHub](https://github.com/nitin272)  

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ using the MERN stack*
