// NotFoundPage.tsx
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('pages:notFound:title')}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {t('pages:notFound:description')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 3, mb: 2 }}
        >
          {t('pages:notFound:goToHomeButton')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
