import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithGoogle, clearError, setError as setAuthError } from '../store';

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    dispatch(clearError());

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');
    dispatch(clearError());
    const resultAction = await dispatch(loginWithGoogle(credentialResponse.credential));
    if (loginWithGoogle.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleGoogleError = () => {
    setLocalError('Google Sign-In failed. Please try again.');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center' }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          border: '1px solid #E4E7EB',
          boxShadow: '0px 10px 40px rgba(0, 42, 84, 0.04)',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        {/* Header Icon & Brand */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="span" sx={{ fontSize: '3rem', display: 'block', mb: 1 }}>
            👑
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your Kings Enterprises account
          </Typography>
        </Box>

        {/* Alerts for Errors */}
        {(localError || error) && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => { setLocalError(''); dispatch(clearError()); }}>
            {localError || error}
          </Alert>
        )}

        {/* Email & Password Form */}
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="enter your email address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>

        {/* Divider with text */}
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            OR
          </Typography>
        </Divider>

        {/* Google Authentication Container */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          {/* Custom style helper wrapper for full width Google OAuth button */}
          <div style={{ width: '100%' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              size="large"
              shape="rectangular"
              logo_alignment="left"
              width="100%"
              text="signin_with"
            />
          </div>
        </Box>

        {/* Navigation Link to Signup */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" color="secondary" sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Create Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
