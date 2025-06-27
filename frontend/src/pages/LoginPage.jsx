import { Box, Button, Stack, TextField, Typography, Alert } from '@mui/material';
import instaimage from '../assets/images/instaimage_edit.png';
import { useState, useEffect } from 'react';
import CenteredLayout from '../component/layout/CenteredLayout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const { login, loading, error, success, message, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // or wherever you want to redirect
        }
    }, [isAuthenticated, navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if username/email field is filled
        if (!loginDetails.email.trim() && !loginDetails.username.trim()) {
            newErrors.emailOrUsername = 'Username or email is required';
        }

        // Check if password is filled
        if (!loginDetails.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailUsernameChange = (e) => {
        const value = e.target.value;
        
        // Check if the input is an email
        if (validateEmail(value)) {
            setLoginDetails(prev => ({
                ...prev,
                email: value,
                username: ""
            }));
        } else {
            setLoginDetails(prev => ({
                ...prev,
                username: value,
                email: ""
            }));
        }
        
        // Clear error when user starts typing
        if (errors.emailOrUsername) {
            setErrors(prev => ({ ...prev, emailOrUsername: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setLoginDetails(prev => ({ ...prev, password: value }));
        
        // Clear error when user starts typing
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const result = await login(loginDetails);
            if (result.success) {
                // Redirect will happen automatically via useEffect
                navigate('/');
            }
        }
    };

    return (
        <CenteredLayout>
            <Stack 
                mt='3em' 
                spacing={5} 
                sx={{ 
                    width: {sm: '25%', xs: '90%'}
                }}>
                <Box sx={{ height: '5em'}} component={'img'} src={instaimage}/>
                <Stack spacing={1}>
                    {/* Success Alert */}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {message}
                        </Alert>
                    )}
                    
                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    <Stack spacing={1}>
                        <TextField 
                            value={loginDetails.email || loginDetails.username} 
                            onChange={handleEmailUsernameChange} 
                            placeholder='Username or Email'
                            error={!!errors.emailOrUsername}
                            helperText={errors.emailOrUsername}
                            size='small'
                            disabled={loading}
                        />
                        <TextField 
                            value={loginDetails.password} 
                            onChange={handlePasswordChange} 
                            placeholder='Password'
                            type='password'
                            error={!!errors.password}
                            helperText={errors.password}
                            size='small'
                            disabled={loading}
                        />
                    </Stack>
                    
                    {/* Form validation errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            Please fix the errors above
                        </Alert>
                    )}
                    
                    <Button 
                        sx={{ boxShadow: 'none'}} 
                        variant='contained' 
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? 'Logging In...' : 'Log In'}
                    </Button>

                    <Box mt={'1em'} sx={{ textAlign: 'center' }}>
                        <Typography variant='body2' sx={{ marginBottom: '0.2rem' }}>
                            Not signed up?
                        </Typography>
                        <NavLink
                            to='/signup'
                            style={{
                                color: '#1976d2',
                                textDecoration: 'none',
                                fontWeight: 500
                            }}
                        >
                            Sign Up
                        </NavLink>
                    </Box>
                </Stack>
            </Stack>
        </CenteredLayout>
    );
};

export default LoginPage;