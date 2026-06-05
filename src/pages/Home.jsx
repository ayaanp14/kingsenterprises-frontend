import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import {
  Storefront as StoreIcon,
  VerifiedUserOutlined as ShieldIcon,
  LocalOfferOutlined as DiscountIcon,
  SupportAgentOutlined as SupportIcon,
} from '@mui/icons-material';

const CATEGORIES = [
  {
    title: 'Cooling & Air comfort',
    desc: 'Ceiling fans, exhausts, air conditioners, and premium room coolers.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    link: '/shop'
  },
  {
    title: 'Modern Kitchen Tech',
    desc: 'Advanced designer chimneys, OTGs, kettle boilers, and luxury grillers.',
    imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80',
    link: '/shop'
  },
  {
    title: 'Laundry & Utility',
    desc: 'High-efficiency smart front-load washers, top loaders, and dry vacuum cleaners.',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
    link: '/shop'
  },
  {
    title: 'Premium Home Solutions',
    desc: 'Syska emergency LEDs, high-capacity sine-wave inverters, and luxury cookware.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    link: '/shop'
  }
];

export default function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 10 }}>
      {/* 1. Premium Hero Showcase */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #002A54 0%, #001224 50%, #1e4b7a 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 6 },
          borderRadius: 0,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 800,
              letterSpacing: 3,
              display: 'block',
              mb: 2,
              fontSize: '1rem',
            }}
          >
            KINGS ENTERPRISES
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.3rem', md: '3.6rem' },
              color: '#FFFFFF',
              mb: 3,
              letterSpacing: -0.5,
              lineHeight: 1.2,
            }}
          >
            Luxury Technology for Your Modern Home
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              mb: 4,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Partnering with India's leading home appliance and power solution brands. Discover curated luxury comfort, certified durability, and elite craftsmanship — with discounts up to 50% off on select premium electronics.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/shop"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 25px rgba(197, 160, 89, 0.4)',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                }
              }}
            >
              Explore Catalog
            </Button>
            <Button
              component="a"
              href="#about"
              variant="outlined"
              sx={{
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                px: 5,
                py: 1.8,
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.05)',
                }
              }}
            >
              Our Story
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* 2. Core Value Badges - Styled Grid Layout */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr 1fr'
          },
          gap: 4
        }}>
          {/* Badge 1 */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid rgba(0, 42, 84, 0.08)',
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{
              bgcolor: 'rgba(197, 160, 89, 0.1)',
              width: 70,
              height: 70,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              color: 'secondary.main',
              mb: 3
            }}>
              <ShieldIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main' }}>
              100% Authentic Products
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Every item comes directly from verified manufacturers, fully serialized with original documentation.
            </Typography>
          </Paper>
          
          {/* Badge 2 */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid rgba(0, 42, 84, 0.08)',
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{
              bgcolor: 'rgba(197, 160, 89, 0.1)',
              width: 70,
              height: 70,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              color: 'secondary.main',
              mb: 3
            }}>
              <DiscountIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main' }}>
              Upto 50% Off
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Save big on premium home appliances and electronics — exclusive discounts across our entire catalog.
            </Typography>
          </Paper>

          {/* Badge 3 */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid rgba(0, 42, 84, 0.08)',
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{
              bgcolor: 'rgba(197, 160, 89, 0.1)',
              width: 70,
              height: 70,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              color: 'secondary.main',
              mb: 3
            }}>
              <SupportIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main' }}>
              Gold Merchant Support
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Dedicated assistance to help you configure your smart-home setup, warranty claims, and repairs.
            </Typography>
          </Paper>
        </Box>
      </Container>

      <Divider sx={{ my: 6, opacity: 0.06 }} />

      {/* 3. Category Showcase ("What We Sell") - Structured CSS Grid Layout */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 1.5 }}>OUR PORTFOLIO</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 1 }}>What We Sell</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '600px', mx: 'auto' }}>
            We stock only the highest performing appliances and tech accessories from leading brands like Syska, RR, Lloyd, Ecolink, and Preethi.
          </Typography>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr'
          },
          gap: 4,
          alignItems: 'stretch'
        }}>
          {CATEGORIES.map((cat, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0, 42, 84, 0.08)',
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
                }
              }}
            >
              {/* Force image container to have strict height and cover alignment */}
              <Box sx={{ height: 180, overflow: 'hidden', bgcolor: '#f0f2f5' }}>
                <CardMedia
                  component="img"
                  image={cat.imageUrl}
                  alt={cat.title}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, fontSize: '1.1rem' }}>
                  {cat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.5 }}>
                  {cat.desc}
                </Typography>
                <Button
                  component={RouterLink}
                  to={cat.link}
                  variant="text"
                  color="secondary"
                  sx={{ fontWeight: 700, p: 0, justifyContent: 'flex-start', alignSelf: 'flex-start', mt: 'auto' }}
                >
                  Explore Shop &rarr;
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* 4. About Us ("Who We Are") */}
      <Box sx={{ bgcolor: 'rgba(0, 42, 84, 0.02)', py: 8 }}>
        <Container maxWidth="lg" id="about">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ borderRadius: 6, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', height: { md: 400 } }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
                  alt="Kings Enterprises Showroom"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 1.5 }}>KINGS TRUST</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 1, mb: 3 }}>Who We Are</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                Founded in 1995, **Kings Enterprises** has grown from a local appliance outlet into one of the region's most reputable distributors of premium home technology, smart lighting solutions, and performance cookware.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4.5, lineHeight: 1.7 }}>
                Our commitment has always been simple: bridging the gap between top-tier manufacturers and demanding homeowners. We curate our stock directly from brand assemblies, ensuring complete authenticity. Whether you are seeking energy-efficient cooling solutions or professional kitchenware, our inventory represents the pinnacle of performance.
              </Typography>
              <Button
                component={RouterLink}
                to="/shop"
                variant="contained"
                color="primary"
                sx={{ px: 4, py: 1.2, borderRadius: '20px', fontWeight: 600 }}
              >
                Visit Our Online Catalog
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5. Contact Info & Interactive Google Map */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 1.5 }}>VISIT US</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 1 }}>Where to Find Us</Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {/* Address Card */}
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                width: '100%',
                border: '1px solid rgba(0, 42, 84, 0.08)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                🏠 Bhopal Showroom Head Office
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Kings Enterprises<br />
                Second Floor, 157, Mayur vihar<br />
                Near durga fham mandir, ashoka garden, bhopal<br />
                462023, India
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mt: 2 }}>
                📞 General Inquiries:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                +91 11 4355 1414 / +91 98100 12345
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ✉️ Email Address:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                support@kingsenterprises.com
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                ⏰ Working Hours: Monday - Saturday: 10:00 AM - 8:30 PM (Sunday Closed)
              </Typography>
            </Paper>
          </Grid>

          {/* Interactive Map Embed */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '320px', md: '450px' },
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(0, 42, 84, 0.08)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
              }}
            >
              <iframe
                title="Kings Enterprises Bhopal Showroom Map"
                src="https://maps.google.com/maps?q=Second+Floor,+157,+Mayur+vihar,+Near+durga+fham+mandir,+Ashoka+Garden,+Bhopal,+462023,+India&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
