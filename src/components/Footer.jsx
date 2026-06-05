import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube, LocationOn, Phone, Email } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 'auto',
        borderTop: '4px solid',
        borderColor: 'secondary.main',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', letterSpacing: 1 }}>
              <span style={{ color: '#C5A059', marginRight: 8 }}>👑</span> KINGS ENTERPRISES
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2, lineHeight: 1.6 }}>
              Your premium destination for high-end electronics. Offering smart televisions, refrigerators, washing machines, audio systems, and robust power solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
                <YouTube fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' }, fontSize: '0.9rem' }}>
                Home Page
              </Link>
              <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' }, fontSize: '0.9rem' }}>
                Browse Products
              </Link>
              <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' }, fontSize: '0.9rem' }}>
                Exclusive Deals
              </Link>
              <Link href="/" color="inherit" underline="none" sx={{ '&:hover': { color: 'secondary.main' }, fontSize: '0.9rem' }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ color: 'secondary.main', mt: 0.3 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.4 }}>
                  Kings Enterprises Electronics Godown, 123 Main Warehouse District, Mumbai, India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  support@kingsenterprises.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © {new Date().getFullYear()} Kings Enterprises Electronics. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Designed for premium visual excellence.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
