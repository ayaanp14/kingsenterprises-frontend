import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  ShoppingBag as OrderIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearCartState } from '../store';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartState());
    navigate('/login');
  };

  // If user is not logged in, show access denied
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 6, border: '1px solid #E4E7EB', borderRadius: 3 }}>
          <AccountIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
            Access Denied
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Please sign in to view your dashboard.
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained" color="primary">
            Sign In Now
          </Button>
        </Paper>
      </Container>
    );
  }

  // Mock past orders history
  const mockOrders = [
    {
      id: "KE-9824",
      date: "2026-05-18",
      items: "Crown Series Qled 55\" Smart TV x 1",
      total: 899.99,
      status: "Delivered",
    },
    {
      id: "KE-8391",
      date: "2026-04-02",
      items: "Symphony Gold Soundbar 5.1 x 1, Titan Safe 1500VA Inverter x 1",
      total: 799.98,
      status: "Delivered",
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back to Shop */}
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ChevronLeftIcon />}
        sx={{ mb: 4, fontWeight: 600, color: 'text.secondary' }}
      >
        Back to Shopping
      </Button>

      <Grid container spacing={4}>
        {/* Left Card: Profile Details */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #E4E7EB', borderRadius: 3, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: 100, height: 100, border: '3px solid', borderColor: 'secondary.main', mb: 2 }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {user.email}
                </Typography>
                <Chip
                  label={user.role === 'ADMIN' ? '👑 Administrator' : 'Kings Club Member'}
                  color="secondary"
                  size="small"
                  sx={{ fontWeight: 600, mt: 1 }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Log Out Account
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Table: Order History */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <OrderIcon color="secondary" /> Order History
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E4E7EB', borderRadius: 3 }}>
            <Table aria-label="order history table">
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Products Purchased</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Total Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ fontWeight: 700 }}>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell sx={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {order.items}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={order.status} color="success" size="small" sx={{ fontWeight: 600 }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
