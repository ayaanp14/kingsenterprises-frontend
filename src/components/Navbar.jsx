import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Storefront as StorefrontIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearCartState } from '../store';

// Styled Search container
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.12),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)((({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
})));

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  // Mobile Drawer State
  const [mobileOpen, setMobileOpen] = useState(false);
  // User Menu State
  const [anchorElUser, setAnchorElUser] = useState(null);
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    dispatch(clearCartState());
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isAdmin = user && ['kingsenterprises1414@gmail.com', 'ayaanpathan14@gmail.com'].includes(user.email.toLowerCase());

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Shop Electronics', path: '/shop', icon: <StorefrontIcon /> },
  ];

  if (isAdmin) {
    menuItems.push({ text: 'Admin Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> });
    menuItems.push({ text: 'Users & Carts', path: '/admin/users', icon: <PeopleIcon /> });
  }

  // Mobile Drawer Menu
  const drawer = (
    <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1, display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/logo.png" alt="Kings Logo" sx={{ height: 40, mr: 1.5 }} /> KE
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} onClick={handleDrawerToggle}>
              <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'primary.main', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        {user ? (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={() => {
              handleDrawerToggle();
              handleLogout();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            onClick={handleDrawerToggle}
          >
            Login / Sign Up
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile Hamburguer Menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Brand Name */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 800,
              letterSpacing: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            <Box component="img" src="/logo.png" alt="Kings Logo" sx={{ height: { xs: 44, sm: 64 }, mr: 1.5 }} />
            KINGS
            <Typography
              component="span"
              variant="h5"
              sx={{
                fontWeight: 400,
                color: 'secondary.main',
                ml: 1,
                display: { xs: 'none', sm: 'inline' },
                fontSize: { sm: '1.5rem' },
              }}
            >
              ENTERPRISES
            </Typography>
          </Typography>

          {/* Search Bar (Desktop/Tablet) */}
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 0.5 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search premium electronics..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button component={RouterLink} to="/" color="primary" sx={{ fontWeight: 500 }}>
              Home
            </Button>
            <Button component={RouterLink} to="/shop" color="primary" sx={{ fontWeight: 500 }}>
              Shop
            </Button>
            {isAdmin && (
              <>
                <Button component={RouterLink} to="/admin/dashboard" color="secondary" sx={{ fontWeight: 700 }}>
                  ⚙️ Admin Dashboard
                </Button>
                <Button component={RouterLink} to="/admin/users" color="secondary" sx={{ fontWeight: 700 }}>
                  👥 Users & Carts
                </Button>
              </>
            )}
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {/* Search Icon for Mobile (Only when search hidden) */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="primary" onClick={() => navigate('/shop')}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Shopping Cart */}
            <IconButton
              component={RouterLink}
              to="/cart"
              color="primary"
              aria-label="shopping cart"
              sx={{
                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* User Profile / Menu */}
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={user.avatar || ''}
                      sx={{
                        width: 38,
                        height: 38,
                        border: '2px solid',
                        borderColor: 'secondary.main',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ px: 2, py: 1.5, minWidth: 150 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider />
                  {isAdmin && (
                    <>
                      <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/admin/dashboard">
                        <Typography textAlign="left" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>⚙️ Admin Dashboard</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/admin/users">
                        <Typography textAlign="left" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>👥 Users & Carts</Typography>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/profile">
                    <Typography textAlign="center">My Profile & Orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography textAlign="center" color="error">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderRadius: '20px',
                  px: 3,
                }}
              >
                Sign In
              </Button>
            )}

            {/* Account Icon on Mobile for guest */}
            {!user && (
              <IconButton
                component={RouterLink}
                to="/login"
                color="primary"
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <AccountIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
