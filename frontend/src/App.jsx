import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import { Box, CircularProgress } from '@mui/material';


import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Books from './pages/Books/Books';
import BookDetails from './pages/BookDetails/BookDetails';
import AddBook from './pages/AddBook/AddBook';
import EditBook from './pages/EditBook/EditBook';
import Profile from './pages/Profile/Profile';
import Review from './pages/Review/Review';
import Community from './pages/Community/Community';

import './App.scss';


const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app">
      {!isAuthPage && <Navbar />}
      <main className={`main-content ${isAuthPage ? 'auth-page' : ''}`}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

const AppContent = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#fafafa'
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
        <Route path="/books/:id/review" element={<Review />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Layout>
  );
};

export default App;
