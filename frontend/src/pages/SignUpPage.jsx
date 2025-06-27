import { Box, Button, Stack, TextField, Typography, Alert } from '@mui/material';
import instaimage from '../assets/images/instaimage_edit.png';
import { useState } from 'react';
import CenteredLayout from '../component/layout/CenteredLayout';
import { NavLink } from 'react-router-dom';
import { useSignup } from '../services/useSignup.js';

const SignUpPage = () => {
    const [signupDetails, setSignupDetails] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [errors, setErrors] = useState({});
    const { signup, loading, success, error, message } = useSignup();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if all fields are required
        if (!signupDetails.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!signupDetails.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!signupDetails.password.trim()) {
            newErrors.password = 'Password is required';
        }
        if (!signupDetails.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }
        if (!signupDetails.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        // Validate email format
        if (signupDetails.email && !validateEmail(signupDetails.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate password length
        if (signupDetails.password && signupDetails.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupDetails(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            await signup(signupDetails);
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
                    <Box>
                        <Typography variant='body1'>
                            Sign up to see photos and videos from your friends
                        </Typography>
                    </Box>
                    
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
                            name='email' 
                            value={signupDetails.email} 
                            onChange={handleChange} 
                            placeholder='Email'
                            error={!!errors.email}
                            helperText={errors.email}
                            size='small'
                            disabled={loading}
                        />
                        <TextField 
                            name='password' 
                            value={signupDetails.password} 
                            onChange={handleChange} 
                            placeholder='Password'
                            type='password'
                            error={!!errors.password}
                            helperText={errors.password}
                            size='small'
                            disabled={loading}
                        />
                        <TextField 
                            name='username' 
                            value={signupDetails.username} 
                            onChange={handleChange} 
                            placeholder='Username'
                            error={!!errors.username}
                            helperText={errors.username}
                            size='small'
                            disabled={loading}
                        />
                        <TextField 
                            name='first_name' 
                            value={signupDetails.first_name} 
                            onChange={handleChange} 
                            placeholder='First Name'
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                            size='small'
                            disabled={loading}
                        />
                        <TextField 
                            name='last_name' 
                            value={signupDetails.last_name} 
                            onChange={handleChange} 
                            placeholder='Last Name'
                            error={!!errors.last_name}
                            helperText={errors.last_name}
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    <Box mt={'1em'} sx={{ textAlign: 'center' }}>
                        <Typography variant='body2' sx={{ marginBottom: '0.2rem' }}>
                            Already have an account?
                        </Typography>
                        <NavLink 
                            to='/login'
                            style={{
                                color: '#1976d2',
                                textDecoration: 'none',
                                fontWeight: 500
                            }}
                        >
                            Log In
                        </NavLink>
                    </Box>
                </Stack>
            </Stack>
        </CenteredLayout>
    );
};

export default SignUpPage;