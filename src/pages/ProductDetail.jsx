import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Stack,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCartOutlined as CartIcon,
  ArrowBack as ArrowBackIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, addToCart } from '../store';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const product = useSelector((state) => 
    state.products.items.find(p => p.id === id)
  );

  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);
  
  // Selection quantity state
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // Zoom effect state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!product) {
        setLoading(true);
        setError(null);
        const resultAction = await dispatch(fetchProductById(id));
        if (fetchProductById.rejected.match(resultAction)) {
          setError(resultAction.payload || "Product details could not be retrieved.");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id, product, dispatch]);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAdding(true);
    try {
      const resultAction = await dispatch(addToCart({ productId: product.id, quantity }));
      if (addToCart.fulfilled.match(resultAction)) {
        alert(`👑 Added ${quantity} item(s) to your cart!`);
      } else {
        alert(`Failed to add item: ${resultAction.payload}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || "Product not found."}
        </Alert>
        <Button component={RouterLink} to="/shop" startIcon={<ArrowBackIcon />} variant="contained">
          Back to Shop
        </Button>
      </Container>
    );
  }

  // Helper to generate dynamic specifications table based on categories
  const getSpecs = () => {
    const defaultSpecs = [
      { name: "Brand", value: "Kings Enterprises" },
      { name: "Model Year", value: "2026" },
      { name: "Warranty", value: "2 Years Gold Warranty" },
      { name: "Color", value: "Premium Obsidian / Gold Accent" },
    ];

    if (product.category === 'Television') {
      return [
        ...defaultSpecs,
        { name: "Display Size", value: "65 inches (or 55 inches)" },
        { name: "Display Type", value: "OLED / QLED Ultra HD" },
        { name: "Refresh Rate", value: "120 Hz Smart Engine" },
        { name: "Smart Features", value: "Voice Control, Google TV OS, AirPlay 2" }
      ];
    } else if (product.category === 'Refrigerator') {
      return [
        ...defaultSpecs,
        { name: "Capacity", value: "650 Litres Multi-Compartment" },
        { name: "Defrosting Type", value: "Frost Free Smart Cool" },
        { name: "Energy Rating", value: "5 Star Smart Inverter" }
      ];
    } else if (product.category === 'Washing Machine') {
      return [
        ...defaultSpecs,
        { name: "Washing Capacity", value: "10.5 Kg / 7.5 Kg" },
        { name: "Loading Type", value: "Front Load / Top Load" },
        { name: "Control", value: "AI Direct Drive Smart Control" }
      ];
    } else if (product.category === 'Audio System') {
      return [
        ...defaultSpecs,
        { name: "Audio Output", value: "500W RMS Surround Sound" },
        { name: "Sound Channels", value: "5.1 Dolby Atmos Setup" },
        { name: "Connectivity", value: "Wireless Subwoofer, Bluetooth 5.2, HDMI eARC" }
      ];
    } else if (product.category === 'Power Solutions') {
      return [
        ...defaultSpecs,
        { name: "Capacity / Voltage", value: "1500VA / 220Ah" },
        { name: "Output Type", value: "Pure Sine Wave Inverter" },
        { name: "Charging Technology", value: "Smart Float Charging System" }
      ];
    }

    return defaultSpecs;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        component={RouterLink}
        to="/shop"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4, fontWeight: 600, color: 'text.secondary' }}
      >
        Back to Products
      </Button>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
        {/* Left: Product Image */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper
            elevation={0}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            sx={{
              p: 2,
              borderRadius: 4,
              border: '1px solid #E4E7EB',
              bgcolor: 'white',
              textAlign: 'center',
              position: 'relative',
              cursor: 'crosshair',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: 450,
                objectFit: 'contain',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />
            {/* The Blue Lens Overlay */}
            {isZooming && (
              <Box
                sx={{
                  position: 'absolute',
                  width: '40%', // 100% / 2.5 zoom level
                  height: '40%',
                  // Calculate left and top so it exactly matches the background-position mapping:
                  // background-position moves from 0 to 100%. At 100%, the lens should be at (100% - 40%) = 60%.
                  left: `calc(${zoomPosition.x}% * 0.6)`,
                  top: `calc(${zoomPosition.y}% * 0.6)`,
                  bgcolor: 'rgba(0, 120, 255, 0.2)',
                  border: '1px solid rgba(0, 120, 255, 0.5)',
                  pointerEvents: 'none',
                  zIndex: 5,
                  // Optional: add a grid pattern similar to the screenshot
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />
            )}
          </Paper>
        </Box>

        {/* Right: Product details and order actions */}
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative' }}>
          {isZooming && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                minHeight: 450,
                bgcolor: 'white',
                zIndex: 10,
                backgroundImage: `url(${product.imageUrl})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '250%',
                backgroundRepeat: 'no-repeat',
                border: '1px solid #E4E7EB',
                borderRadius: 4,
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              }}
            />
          )}

          <Box sx={{ opacity: isZooming ? 0 : 1, transition: 'opacity 0.2s', pointerEvents: isZooming ? 'none' : 'auto' }}>
            {/* Category Tag */}
            <Chip
              label={product.category}
              color="secondary"
              sx={{ fontWeight: 700, mb: 2, borderRadius: '6px' }}
            />

            {/* Product Title */}
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              {product.name}
            </Typography>

            {/* Sub-label */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <VerifiedIcon color="secondary" fontSize="small" />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                100% Authentic Product • Kings Certified Godown Stock
              </Typography>
            </Box>

            {/* Price tag */}
            <Box sx={{ mb: 3 }}>
              {product.mrp > product.price && (
                <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through', lineHeight: 1, mb: 0.5 }}>
                  ₹{product.mrp.toLocaleString('en-IN')}
                </Typography>
              )}
              <Typography variant="h4" sx={{ fontWeight: 900, color: product.price === 0 ? 'secondary.main' : 'primary.main', lineHeight: 1.2 }}>
                {product.price === 0 ? "Price TBD" : `₹${product.price.toLocaleString('en-IN')}`}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {/* Stock details */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 'bold' }}>
                Availability Status:
              </Typography>
              {product.stock > 0 ? (
                <Chip
                  label={`In Stock (${product.stock} units available)`}
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              ) : (
                <Chip
                  label="Out of Stock"
                  color="error"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>

            {/* Order Interface */}
            {product.stock > 0 && (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { sm: 'center' }, mb: 4 }}>
                {/* Quantity adjustments */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #E4E7EB',
                    borderRadius: '24px',
                    width: 'fit-content',
                    p: 0.5,
                  }}
                >
                  <IconButton onClick={handleDecrement} disabled={quantity <= 1 || adding}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ px: 3, fontWeight: 800, fontSize: '1.1rem' }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleIncrement} disabled={quantity >= product.stock || adding}>
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Add to cart button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={adding}
                  onClick={handleAddToCart}
                  startIcon={adding ? <CircularProgress size={20} color="inherit" /> : <CartIcon />}
                  sx={{
                    px: 6,
                    py: 1.8,
                    borderRadius: '24px',
                    fontSize: '1rem',
                    flexGrow: { xs: 1, sm: 0 },
                    '&:hover': {
                      bgcolor: 'secondary.main',
                    },
                  }}
                >
                  {adding ? "Adding..." : "Add to Cart"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Stack>

      {/* Specifications Table Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>
          Technical Specifications
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E4E7EB', borderRadius: 3 }}>
          <Table aria-label="product specifications table">
            <TableBody>
              {getSpecs().map((spec) => (
                <TableRow key={spec.name} sx={{ '&:nth-of-type(odd)': { bgcolor: 'background.default' } }}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 700, width: '30%', color: 'primary.main' }}>
                    {spec.name}
                  </TableCell>
                  <TableCell align="left" color="text.secondary">
                    {spec.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
