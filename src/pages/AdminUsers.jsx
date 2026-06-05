import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  People as PeopleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import api from '../api';

function Row({ user }) {
  const [open, setOpen] = useState(false);
  const cartItemsCount = user.cartItems?.length || 0;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Avatar>
            <Typography sx={{ fontWeight: 600 }}>{user.name || 'Anonymous'}</Typography>
          </Box>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
        <TableCell align="right">
          <Chip 
            label={cartItemsCount > 0 ? `${cartItemsCount} item(s)` : 'Empty Cart'} 
            color={cartItemsCount > 0 ? "secondary" : "default"}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Cart Details
              </Typography>
              {cartItemsCount > 0 ? (
                <List disablePadding>
                  {user.cartItems.map((item) => (
                    <ListItem key={item.id} sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar variant="rounded" src={item.product.imageUrl} sx={{ width: 50, height: 50, border: '1px solid #E4E7EB' }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Quantity: ${item.quantity} | Unit Price: ₹${item.product.price.toLocaleString('en-IN')}`}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  This user currently has no items in their shopping cart.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndCarts = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError("Failed to load users and cart data. Ensure you are an admin or the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndCarts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <PeopleIcon color="secondary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Users & Active Carts
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ width: 40 }} />
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>User Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email Address</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Registered On</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>Cart Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No registered users found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <Row key={user.id} user={user} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
