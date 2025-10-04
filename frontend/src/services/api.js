import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config.url.includes('/auth/profile')) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const bookAPI = {

    getBooks: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) {
            queryParams.append('search', params.search);
        }
        if (params.genre) queryParams.append('genre', params.genre);

        return api.get(`/books?${queryParams.toString()}`);
    },

    getBook: (id) => api.get(`/books/${id}`),

    createBook: (bookData) => api.post('/books', bookData),

    updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),

    deleteBook: (id) => api.delete(`/books/${id}`),

    getUserBooks: () => api.get('/books/user/my-books'),
};

export const reviewAPI = {
    getBookReviews: (bookId) => api.get(`/reviews/book/${bookId}`),
    getReview: (id) => api.get(`/reviews/${id}`),

    createReview: (reviewData) => api.post('/reviews', reviewData),

    updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),

    deleteReview: (id) => api.delete(`/reviews/${id}`),

    getUserReviews: () => api.get('/reviews/user/my-reviews'),
};


export const authAPI = {

    login: (credentials) => api.post('/auth/login', credentials),


    register: (userData) => api.post('/auth/register', userData),


    logout: () => api.post('/auth/logout'),

    getMe: () => api.get('/auth/profile'),

    updateProfile: (userData) => api.put('/auth/profile', userData),
};

export default api;