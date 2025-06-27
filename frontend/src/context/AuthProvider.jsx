import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    // Configure axios defaults for httpOnly cookies
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    // Check authentication status on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        
        if (authStatus === 'true') {
            // Verify with server since we're using httpOnly cookies
            verifyAuth();
        }
    }, []);

    // Helper function to remove empty string values
    const removeEmptyFields = (obj) => {
        const cleaned = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
                cleaned[key] = obj[key];
            }
        });
        return cleaned;
    };

    const login = async (loginDetails) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setMessage('');

        try {
            // Remove empty fields before submitting
            const cleanedDetails = removeEmptyFields(loginDetails);
            
            // Configure axios to include cookies
            const response = await axios.post('/api/token/', cleanedDetails, {
                withCredentials: true
            });

            if (response.status === 200) {
                const { user: userData } = response.data;
                
                // Store authentication status and user data
                localStorage.setItem('isAuthenticated', 'true');
                
                // Store user data if provided
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                }
                
                setIsAuthenticated(true);
                setSuccess(true);
                setMessage('Login successful');
                
                return { success: true, data: response.data };
            }
        } catch (err) {
            setError(
                err.response?.data?.detail || 
                err.response?.data?.error || 
                err.response?.data?.message ||
                err.message || 
                'Login failed. Please try again.'
            );
            return { success: false, error: err.response?.data || err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Call logout endpoint to clear httpOnly cookies
            await axios.post('api/accounts/logout/', {}, {
                withCredentials: true
            });
            console.log('Logged in')
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Clear localStorage and reset state regardless of API call result
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            
            setIsAuthenticated(false);
            setUser(null);
            setError(null);
            setSuccess(false);
            setMessage('');
        }
    };

    const clearMessages = () => {
        setError(null);
        setSuccess(false);
        setMessage('');
    };

    // Verify authentication status with server
    const verifyAuth = async () => {
        try {
            const response = await axios.get('api/token/verify/', {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setIsAuthenticated(true);
                console.log('Verified')
                if (response.data.user) {
                    setUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                localStorage.setItem('isAuthenticated', 'true');
            }
        } catch (err) {
            // Token invalid or expired
            console.log('Not verified: ', err)
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
        }
    };

    const value = {
        // State
        isAuthenticated,
        loading,
        error,
        success,
        message,
        user,
        
        // Actions
        login,
        logout,
        clearMessages,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};