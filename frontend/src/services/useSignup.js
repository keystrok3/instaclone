import { useState } from 'react';
import axios from 'axios';

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const signup = async (signupDetails) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        setMessage('');

        try {
            const response = await axios.post('api/accounts/signup/', signupDetails);

            if (response.status === 201) {
                setSuccess(true);
                setMessage(response.data.message || 'Sign Up Successful');
            } else {
                setError(response.data?.error || 'Signup failed');
            }
        } catch (err) {
            setSuccess(false);
            setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setSuccess(false);
        setError(null);
        setMessage('');
    };

    return {
        signup,
        reset,
        loading,
        success,
        error,
        message
    };
};