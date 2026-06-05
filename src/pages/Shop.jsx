import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  InputAdornment,
  Divider,
  Drawer,
  Fab,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  RestartAlt as ResetIcon,
  LocalOffer as OfferIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store';
import ProductCard from '../components/ProductCard';

const DEPARTMENTS = [
  { name: 'Cooling & Fans', subCats: ['Ceiling Fan', 'Wall Fan', 'Table Fan', 'Exhaust Fan', 'Room Cooler', 'AC', 'Refrigerator'] },
  { name: 'Kitchen Appliances', subCats: ['Chimney', 'OTG', 'Kettle', 'Griller', 'Cookware', 'Microwave', 'Mixer Grinder', 'Sandwich Maker', 'Pressure Cooker'] },
  { name: 'Laundry & Utility', subCats: ['Washing Machine', 'Vacuum Cleaner', 'Water Dispenser'] },
  { name: 'Home & Dining', subCats: ['Light', 'Pillow', 'Bottle', 'Water Bottle', 'Dinner Set'] },
  { name: 'Irons & Personal Care', subCats: ['Personal Care', 'Iron'] }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValFromUrl = searchParams.get('search') || '';

  const dispatch = useDispatch();
  const { items: allProducts, status, error } = useSelector((state) => state.products);
  const loading = status === 'loading' || status === 'idle';

  // Filter & Search local states
  const [searchQuery, setSearchQuery] = useState(searchValFromUrl);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('newest');
  
  // Mobile filter drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync search input with URL query parameter changes
  useEffect(() => {
    setSearchQuery(searchValFromUrl);
  }, [searchValFromUrl]);

  // Dispatch fetch on mount (caching condition handled by slice)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Compute filtered & sorted products client-side using Redux cache
  const filteredProducts = React.useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedDepts.length > 0) {
      const activeSubCats = selectedDepts.flatMap(
        deptName => DEPARTMENTS.find(d => d.name === deptName)?.subCats || []
      );
      if (activeSubCats.length > 0) {
        result = result.filter(p => activeSubCats.includes(p.category));
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price_asc') {
        return a.price - b.price;
      } else if (sortBy === 'price_desc') {
        return b.price - a.price;
      } else if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      } else {
        // default newest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    return result;
  }, [allProducts, selectedDepts, searchQuery, priceRange, sortBy]);

  const products = filteredProducts;

  const handleDeptCheckboxChange = (deptName) => {
    if (selectedDepts.includes(deptName)) {
      setSelectedDepts(selectedDepts.filter(d => d !== deptName));
    } else {
      setSelectedDepts([...selectedDepts, deptName]);
    }
  };

  const handlePriceSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepts([]);
    setPriceRange([0, 200000]);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* 1. Hero Promo Section */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #002A54 0%, #001224 50%, #1e4b7a 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 6 },
          borderRadius: 0,
          position: 'relative',
          overflow: 'hidden',
          mb: 5,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2, display: 'block', mb: 1 }}
          >
            👑 KINGS ENTERPRISES ELECTRONICS
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.8rem' }, color: '#FFFFFF', mb: 2 }}
          >
            Premium Home Tech & Appliances
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255, 255, 255, 0.8)', maxHeight: 100, maxWidth: '600px' }}
          >
            Explore our curated catalog of high-performance electronics, appliances, and luxury cookware.
            Use filters below to narrow down your perfect match.
          </Typography>
        </Container>
      </Paper>

      {/* 2. Catalog layout */}
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start' }}>
          {/* Side Filter Card (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '280px', flexShrink: 0, position: 'sticky', top: 80, zIndex: 10 }}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: '1px solid rgba(0, 42, 84, 0.08)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
                bgcolor: 'background.paper',
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterIcon color="primary" fontSize="small" />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Filters
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<ResetIcon />}
                  onClick={handleResetFilters}
                  sx={{ color: 'secondary.main', fontWeight: 600 }}
                >
                  Reset
                </Button>
              </Box>

              {/* Search input field */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                Search Keyword
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Name, model, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Divider sx={{ mb: 3 }} />

              {/* Department Checkboxes */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                Departments
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                {DEPARTMENTS.map((dept) => (
                  <FormControlLabel
                    key={dept.name}
                    control={
                      <Checkbox
                        checked={selectedDepts.includes(dept.name)}
                        onChange={() => handleDeptCheckboxChange(dept.name)}
                        color="secondary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontWeight: selectedDepts.includes(dept.name) ? 600 : 400 }}>
                        {dept.name}
                      </Typography>
                    }
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>

              <Divider sx={{ mb: 3 }} />

              {/* Price range Slider */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                Price Range
              </Typography>
              <Box sx={{ px: 1, mb: 3 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                  step={1000}
                  color="secondary"
                  valueLabelFormat={(v) => `₹${v.toLocaleString('en-IN')}`}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Min: ₹{priceRange[0].toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Max: ₹{priceRange[1].toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Sorting option */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                Sort By
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-select-label">Sort</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortBy}
                  label="Sort"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                  <MenuItem value="price_asc">Price: Low to High</MenuItem>
                  <MenuItem value="price_desc">Price: High to Low</MenuItem>
                  <MenuItem value="name_asc">Name: A to Z</MenuItem>
                  <MenuItem value="name_desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Box>

          {/* Main Product Grid */}
          <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
            {/* Header info & Mobile Search */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2, mb: 4 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Found <span style={{ fontWeight: 'bold', color: '#002A54' }}>{products.length}</span> premium electronic products
              </Typography>

              {/* Mobile Quick Search */}
              <TextField
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ display: { xs: 'flex', md: 'none' }, bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
                <CircularProgress color="secondary" />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            ) : products.length === 0 ? (
              <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No products match your filters.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Try adjusting your price range, searching for another keyword, or selecting different departments.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              // Tile-like Structure (responsive columns via calc width)
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                width: '100%'
              }}>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'calc(50% - 12px)',
                        md: 'calc(33.33% - 16px)'
                      },
                      display: 'flex'
                    }}
                  >
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Sticky FAB */}
      <Fab
        color="secondary"
        aria-label="filter"
        onClick={() => setMobileOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0, 42, 84, 0.3)',
        }}
      >
        <FilterIcon />
      </Fab>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: { xs: '85%', sm: '320px' }, p: 3 },
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon color="primary" fontSize="small" />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Filters
            </Typography>
          </Box>
          <Box>
            <Button
              size="small"
              startIcon={<ResetIcon />}
              onClick={handleResetFilters}
              sx={{ color: 'secondary.main', fontWeight: 600, mr: 1 }}
            >
              Reset
            </Button>
            <IconButton onClick={() => setMobileOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Search input field */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
          Search Keyword
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Name, model, brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Divider sx={{ mb: 3 }} />

        {/* Department Checkboxes */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
          Departments
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          {DEPARTMENTS.map((dept) => (
            <FormControlLabel
              key={dept.name}
              control={
                <Checkbox
                  checked={selectedDepts.includes(dept.name)}
                  onChange={() => handleDeptCheckboxChange(dept.name)}
                  color="secondary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: selectedDepts.includes(dept.name) ? 600 : 400 }}>
                  {dept.name}
                </Typography>
              }
              sx={{ mb: 0.5 }}
            />
          ))}
        </FormGroup>

        <Divider sx={{ mb: 3 }} />

        {/* Price range Slider */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
          Price Range
        </Typography>
        <Box sx={{ px: 1, mb: 3 }}>
          <Slider
            value={priceRange}
            onChange={handlePriceSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            step={1000}
            color="secondary"
            valueLabelFormat={(v) => `₹${v.toLocaleString('en-IN')}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Min: ₹{priceRange[0].toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Max: ₹{priceRange[1].toLocaleString('en-IN')}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Sorting option */}
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
          Sort By
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="sort-select-mobile-label">Sort</InputLabel>
          <Select
            labelId="sort-select-mobile-label"
            id="sort-select-mobile"
            value={sortBy}
            label="Sort"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">Newest Arrivals</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
            <MenuItem value="name_asc">Name: A to Z</MenuItem>
            <MenuItem value="name_desc">Name: Z to A</MenuItem>
          </Select>
        </FormControl>
        
        <Box sx={{ mt: 4 }}>
          <Button fullWidth variant="contained" color="primary" onClick={() => setMobileOpen(false)}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
