import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutlined as DeleteIcon,
  ShoppingCartOutlined as CartIcon,
  ChevronLeft as ChevronLeftIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemQuantity, removeFromCart, clearCart } from '../store';

export default function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems, loading } = useSelector((state) => state.cart);
  
  // Calculate cart metrics
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const navigate = useNavigate();
  
  // Checkout Dialog State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleQuantityIncrement = (productId, currentQuantity, stock) => {
    if (currentQuantity >= stock) return;
    dispatch(updateCartItemQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleQuantityDecrement = (productId, currentQuantity) => {
    if (currentQuantity <= 1) return;
    dispatch(updateCartItemQuantity({ productId, quantity: currentQuantity - 1 }));
  };

  const handleCheckoutOpen = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  const handleConfirmCheckout = async () => {
    setCheckoutLoading(true);
    // Simulate order placement
    setTimeout(async () => {
      await dispatch(clearCart());
      setCheckoutLoading(false);
      setCheckoutOpen(false);
      alert("👑 Order placed successfully! Thank you for choosing Kings Enterprises.");
      navigate('/');
    }, 1500);
  };

  // Redirect to login if user is guest
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 6, border: '1px solid #E4E7EB', borderRadius: 3 }}>
          <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
            Access Denied
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Please log in to view and manage your shopping cart.
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained" color="primary">
            Sign In Now
          </Button>
        </Paper>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <CartIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}>
          Explore our wide range of premium televisions, refrigerators, washers, and other high-end home appliances to add items.
        </Typography>
        <Button
          component={RouterLink}
          to="/shop"
          variant="contained"
          color="primary"
          startIcon={<ChevronLeftIcon />}
          sx={{ px: 4, py: 1.2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
        Your Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart items list */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ p: 2, border: '1px solid #E4E7EB', borderRadius: 3 }}>
            <List disablePadding>
              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  {index > 0 && <Divider sx={{ my: 2 }} />}
                  <ListItem
                    disablePadding
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2,
                      py: 1,
                    }}
                  >
                    {/* Product Image */}
                    <ListItemAvatar sx={{ minWidth: 100 }}>
                      <Avatar
                        variant="rounded"
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        sx={{ width: 90, height: 90, border: '1px solid #E4E7EB' }}
                      />
                    </ListItemAvatar>

                    {/* Product Details */}
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          component={RouterLink}
                          to={`/product/${item.product.id}`}
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { color: 'secondary.main' },
                          }}
                        >
                          {item.product.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Category: {item.product.category}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}>
                            ₹{item.product.price.toLocaleString('en-IN')} each
                          </Typography>
                        </Box>
                      }
                    />

                    {/* Quantity Selector & Item Total */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        mt: { xs: 2, sm: 0 },
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Controls */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #E4E7EB',
                          borderRadius: '20px',
                          px: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityDecrement(item.productId, item.quantity)}
                          disabled={item.quantity <= 1 || loading}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 'bold' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityIncrement(item.productId, item.quantity, item.product.stock)}
                          disabled={item.quantity >= item.product.stock || loading}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Item Total Price */}
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main', minWidth: 80, textAlign: 'right' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </Typography>

                      {/* Delete Button */}
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        disabled={loading}
                        sx={{
                          bgcolor: 'error.lighter',
                          '&:hover': { bgcolor: 'error.light', color: 'white' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                </Box>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(clearCart())}
                disabled={loading}
                sx={{ fontWeight: 600, borderRadius: '8px' }}
              >
                Clear Shopping Cart
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Order Summary sidebar */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #E4E7EB', borderRadius: 3, bgcolor: 'background.paper' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>
                Order Summary
              </Typography>

              {/* Items count & subtotal */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Items count</Typography>
                <Typography sx={{ fontWeight: 600 }}>{cartCount} items</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ₹{cartTotal.toLocaleString('en-IN')}
                </Typography>
              </Box>

              {/* Shipping (Mock free shipping above ₹10,000) */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Delivery Charge</Typography>
                <Typography sx={{ fontWeight: 600, color: cartTotal >= 10000 ? 'success.main' : 'text.primary' }}>
                  {cartTotal >= 10000 ? 'FREE' : '₹150.00'}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Total Price */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>Total Price</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  ₹{(cartTotal + (cartTotal >= 10000 ? 0 : 150)).toLocaleString('en-IN')}
                </Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleCheckoutOpen}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/shop"
                sx={{ mt: 2, py: 1 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 800 }}>
          <CheckCircleIcon color="secondary" /> Confirm Your Order
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order total is **₹{(cartTotal + (cartTotal >= 10000 ? 0 : 150)).toLocaleString('en-IN')}**. 
            This is a mock checkout flow. Confirming will clear your database cart items and log the transaction.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCheckoutClose} color="primary" disabled={checkoutLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmCheckout}
            variant="contained"
            color="secondary"
            disabled={checkoutLoading}
            startIcon={checkoutLoading && <CircularProgress size={16} color="inherit" />}
          >
            {checkoutLoading ? "Processing..." : "Confirm Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
