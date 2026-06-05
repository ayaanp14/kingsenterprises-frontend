import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Inventory as InventoryIcon,
  PriceCheck as PriceIcon,
  WarningAmber as LowStockIcon,
  Dashboard as DashIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items: products, status, error: productsError } = useSelector((state) => state.products);
  const loading = status === 'loading' || status === 'idle';
  const [error, setError] = useState(null);

  // Sync productsError from Redux to local error state if needed
  useEffect(() => {
    if (productsError) {
      setError(productsError);
    } else {
      setError(null);
    }
  }, [productsError]);

  // Search/Filter local states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Dialog / Edit states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Product Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    mrp: '',
    stock: '',
    imageUrl: '',
  });

  // Feedback Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open Dialog for Creating a new product
  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedProductId(null);
    setFormData({
      name: '',
      category: 'Ceiling Fan',
      description: '',
      price: '0',
      mrp: '0',
      stock: '10',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    });
    setDialogOpen(true);
  };

  // Open Dialog for Editing an existing product
  const handleOpenEdit = (product) => {
    setIsEditMode(true);
    setSelectedProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price.toString(),
      mrp: (product.mrp || 0).toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
    });
    setDialogOpen(true);
  };

  // Handle Form Submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name || !formData.description || !formData.category || !formData.imageUrl) {
      setSnackbar({
        open: true,
        message: 'All fields are required.',
        severity: 'warning',
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        mrp: parseFloat(formData.mrp) || 0,
        stock: parseInt(formData.stock) || 0,
      };

      if (isEditMode) {
        const resultAction = await dispatch(updateProduct({ id: selectedProductId, data: payload }));
        if (updateProduct.fulfilled.match(resultAction)) {
          setSnackbar({
            open: true,
            message: 'Product updated successfully!',
            severity: 'success',
          });
          setDialogOpen(false);
        } else {
          throw new Error(resultAction.payload || 'Failed to update product');
        }
      } else {
        const resultAction = await dispatch(createProduct(payload));
        if (createProduct.fulfilled.match(resultAction)) {
          setSnackbar({
            open: true,
            message: 'Product created successfully!',
            severity: 'success',
          });
          setDialogOpen(false);
        } else {
          throw new Error(resultAction.payload || 'Failed to create product');
        }
      }
    } catch (err) {
      console.error("Save product failed:", err);
      setSnackbar({
        open: true,
        message: err.message || 'Failed to save product details.',
        severity: 'error',
      });
    }
  };

  // Delete product action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      const resultAction = await dispatch(deleteProduct(id));
      if (deleteProduct.fulfilled.match(resultAction)) {
        setSnackbar({
          open: true,
          message: 'Product deleted successfully!',
          severity: 'success',
        });
      } else {
        setSnackbar({
          open: true,
          message: resultAction.payload || 'Failed to delete product from database.',
          severity: 'error',
        });
      }
    }
  };

  // Get list of unique categories in inventory
  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  // Filtering products for listing
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate Metrics
  const totalProducts = products.length;
  const zeroPriceProducts = products.filter(p => p.price === 0).length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DashIcon color="secondary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
            Merchant Inventory Dashboard
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ borderRadius: '20px', px: 3, py: 1 }}
        >
          Add New Product
        </Button>
      </Box>

      {/* Quick Metrics Bar */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Metric 1 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, borderLeft: '5px solid #002A54', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: 'rgba(0,42,84,0.1)', p: 1.5, borderRadius: '50%', color: 'primary.main' }}>
                <InventoryIcon />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>{totalProducts}</Typography>
                <Typography variant="body2" color="text.secondary">Total Catalog Items</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Metric 2 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, borderLeft: '5px solid #C5A059', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: 'rgba(197,160,89,0.15)', p: 1.5, borderRadius: '50%', color: 'secondary.main' }}>
                <PriceIcon />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: zeroPriceProducts > 0 ? 'secondary.main' : 'inherit' }}>
                  {zeroPriceProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">Unpriced Products (₹0)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Metric 3 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, borderLeft: '5px solid #d32f2f', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: 'rgba(211,47,47,0.1)', p: 1.5, borderRadius: '50%', color: '#d32f2f' }}>
                <LowStockIcon />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: lowStockProducts > 0 ? '#d32f2f' : 'inherit' }}>
                  {lowStockProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">Low Stock Alert (&lt; 5)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Inventory Table section */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        {/* Table Filters header */}
        <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', bgcolor: 'rgba(0,42,84,0.02)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1, fontSize: 20 }} />,
            }}
            sx={{ flexGrow: 1, maxWidth: 400, bgcolor: 'white' }}
          />

          <FormControl size="small" sx={{ minWidth: 200, bgcolor: 'white' }}>
            <InputLabel id="category-filter-label">Filter Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              label="Filter Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {uniqueCategories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ p: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No products found matching filters.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Image</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, textAlign: 'right' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, textAlign: 'right' }}>Stock</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        component="img"
                        src={row.imageUrl}
                        alt={row.name}
                        sx={{ width: 50, height: 50, borderRadius: 1.5, objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Tooltip title={row.name}>
                        <span>{row.name}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: row.price === 0 ? 'secondary.main' : 'inherit' }}>
                      {row.price === 0 ? "₹0.00 (Set Price)" : `₹${row.price.toLocaleString('en-IN')}`}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: row.stock < 5 ? 'error.main' : 'inherit' }}>
                      {row.stock}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEdit(row)}
                          sx={{ '&:hover': { bgcolor: 'rgba(0,42,84,0.05)' } }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                          sx={{ '&:hover': { bgcolor: 'rgba(211,47,47,0.05)' } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Add / Edit Dialog Form */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}>
            {isEditMode ? '⚙️ Edit Product Settings' : '📦 Create New Product'}
          </DialogTitle>
          
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Product Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  helperText="e.g. Ceiling Fan, Refrigerator, Cookware"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="imageUrl"
                  label="Image URL"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="price"
                  label="Selling Price (₹)"
                  type="number"
                  value={formData.price}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  inputProps={{ min: "0", step: "0.01" }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="mrp"
                  label="MRP (₹)"
                  type="number"
                  value={formData.mrp}
                  onChange={handleFormChange}
                  fullWidth
                  inputProps={{ min: "0", step: "0.01" }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="stock"
                  label="Stock Quantity"
                  type="number"
                  value={formData.stock}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  inputProps={{ min: "0" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description / Specifications"
                  value={formData.description}
                  onChange={handleFormChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <Button onClick={() => setDialogOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              {isEditMode ? 'Save Changes' : 'Create Product'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
