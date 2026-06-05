import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ShoppingCartOutlined, ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Avoid navigating to product detail
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      await dispatch(addToCart({ productId: product.id, quantity: 1 }));
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        bgcolor: 'background.paper',
      }}
    >
      {/* Category Chip */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(197, 160, 89, 0.3)',
          }}
        />
      </Box>

      {/* Image Container with Zoom hover effect */}
      <Box sx={{ overflow: 'hidden', height: 200, bgcolor: '#f0f2f5', position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.08)',
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1 }}>
        {/* Rating or Brand Placeholder */}
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>
          Kings Electronics
        </Typography>

        {/* Product Name */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'primary.main',
            mt: 0.5,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '2.8rem',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        {/* Product Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '2.4rem',
            lineHeight: 1.2,
            fontSize: '0.85rem',
            mb: 2,
          }}
        >
          {product.description}
        </Typography>

        {/* Price Tag */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {product.mrp > product.price && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ textDecoration: 'line-through', lineHeight: 1 }}
              >
                ₹{product.mrp.toLocaleString('en-IN')}
              </Typography>
            )}
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                fontWeight: 800, 
                color: product.price === 0 ? 'secondary.main' : 'primary.main',
                fontSize: product.price === 0 ? '0.95rem' : '1.1rem',
                lineHeight: 1.2
              }}
            >
              {product.price === 0 ? "Price TBD" : `₹${product.price.toLocaleString('en-IN')}`}
            </Typography>
          </Box>
          {product.stock <= 5 && product.stock > 0 && (
            <Typography variant="caption" color="error.main" sx={{ fontWeight: 600 }}>
              Only {product.stock} left!
            </Typography>
          )}
          {product.stock === 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Out of stock
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          color={adding ? "secondary" : "primary"}
          disabled={adding || product.stock === 0}
          onClick={handleAddToCart}
          startIcon={adding ? <CircularProgress size={16} color="inherit" /> : <ShoppingCartOutlined />}
          sx={{
            py: 1,
            fontSize: '0.85rem',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
        >
          {adding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
}
