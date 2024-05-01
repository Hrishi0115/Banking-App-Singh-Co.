import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Alert, Paper, InputAdornment, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'

const backgroundUrl = 'check3.png';
const logoUrl = 'small.png';
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey', // Set the color of the border
          borderRadius: '0px', // Rounded corners
        },

    '& .MuiInputBase-input': {
        // Add styles for placeholder here
        '&::placeholder': {
        // Styles when the input is not empty
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        },
        '&:not(:placeholder-shown)::placeholder': {
        // Styles when the input is empty
        opacity: 1,
        },
    },
    // Style the text field

      '&:hover fieldset': {
        borderColor: 'darkgrey', // Darker border on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Even darker when field is focused
      },
    },
    // Set the width of the input fields
    width: '80%', // Adjust this value as needed
    maxWidth: '350px', // Adjust this value as needed to match the design
    '& label.Mui-focused': {
        color: 'primary', // Change to your theme's primary color
      },
      '& .MuiInputLabel-outlined': {
        zIndex: 2,
        transform: 'translate(14px, 20px) scale(1)', // Default position
        lineHeight: '1',
        
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '& .MuiInputBase-input:valid + fieldset .MuiInputLabel-outlined': {
        display: 'none',
      },
      '& .MuiInputBase-input:focus + fieldset .MuiInputLabel-outlined': {
        display: 'none',
      },
      // ... (other styles)
      '& .MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)', // Position after the label shrinks
      },
  
    // Add other styles here as needed
    '& .MuiOutlinedInput-input': {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #fff inset',
          WebkitTextFillColor: '#000',
          borderRadius: '0px', // Keep consistent with your design
        },
      },
  });

  const LoginButton = styled(Button)({
    // Style the button
    backgroundColor: '#E89105', // Use your primary color
    '&:hover': {
        backgroundColor: '#CC7000', // Darker on hover
    },
    width: '50%', // Less wide
    height: '48px', // Taller button
    borderRadius: '0px', // Fully rounded edges

    });
    
const RegisterLink = styled('span')({
    color: 'blue',
    cursor: 'pointer',
    textTransform: 'none', // Ensures text remains as styled, not uppercase
    '&:hover': {
        textDecoration: 'underline', // Underline on hover to indicate it's clickable
    }
});
    

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [inputFocus, setInputFocus] = useState({ username: false, password: false });

    const handleRegisterClick = async () => {
        if (!username.trim() ||!email.trim() ||!password.trim() ||!confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/account/register', {
                username,
                password,
                email
            });

            if (response.status === 201) {
                navigate('/login'); // Redirect to the login page
            }
        }
        catch (error) {
            const errorStatus = error.response?.status;
            const errorMessage = error.response?.data?.detail;
            if (errorStatus === 400) {
                setError(errorMessage || "Registration failed");
            } else {
                setError("An unexpected error occurred. Please try again later.")
            }
        }
    };

    const navigateToLogin = () => {
        navigate('/login'); // navigate to login page
    };

    return (
        <>
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFDAB9', // Light beige color
            zIndex: -1,
        }} />
        <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensure at least the full height of the viewport
                alignItems: 'center',
                justifyContent: 'center', // Center the Paper vertically and horizontally
                paddingTop: '64px', // Add some padding at the top
                zIndex: 2, // Higher index than the background image
            }}>
                <Paper elevation={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    width: '100%', // Responsive width
                    maxWidth: 400, // Maximum width of the Paper
                    position: 'relative',
                    zIndex: 2,
                }}>
                    <img 
                        src={logoUrl} 
                        alt="Logo" 
                        style={{ maxWidth: '25%', height: 'auto', paddingTop: '20px', paddingBottom: '0px'}} // Adjust the size as needed
                    />
                    <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    `                <StyledTextField
                            autoComplete='username'
                                label="Username"
                                variant="outlined"
                                value={username}
                                margin="normal"
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setInputFocus({ ...inputFocus, username: true })}
                                onBlur={() => setInputFocus({ ...inputFocus, username: false })}
                            />
                    <StyledTextField
                            autoComplete='email'
                                label="Email"
                                variant="outlined"
                                value={email}
                                margin="normal"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setInputFocus({ ...inputFocus, username: true })}
                                onBlur={() => setInputFocus({ ...inputFocus, username: false })}
                            />
                    <StyledTextField
                            autoComplete='password'
                                label="Password"
                                variant="outlined"
                                value={password}
                                type="password"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setInputFocus({ ...inputFocus, username: true })}
                                onBlur={() => setInputFocus({ ...inputFocus, username: false })}
                            />
                    <StyledTextField
                            autoComplete='confirm-password'
                                label="Confirm Password"
                                variant="outlined"
                                value={confirmPassword}
                                type="password"
                                margin="normal"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setInputFocus({ ...inputFocus, username: true })}
                                onBlur={() => setInputFocus({ ...inputFocus, username: false })}
                                sx={{
                                    marginBottom: '0px', // Increase space between Password and Login button
                                    }}
                            />`
                    <LoginButton
                            type="button"
                            variant="contained"
                            onClick={handleRegisterClick}
                    >
                            Register
                        </LoginButton>

                    <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* existing form elements */}
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                        Already have an account{' '}
                        <RegisterLink onClick={navigateToLogin}>Login now</RegisterLink>
                    </Typography>
                    </Box>

                    {/* <Button onClick={handleRegisterClick} variant="contained" sx={{ mt: 2, mb: 1 }}>
                    Register
                    </Button>
                <Button onClick={navigateToLogin} variant="outlined" sx={{ mb: 2 }}>
                    Already registered? Login
                                </Button> */}
                {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Register;