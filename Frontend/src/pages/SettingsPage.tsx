
import { Box, Typography, Container } from '@mui/material';

export default function SettingsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            py: 4
        }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Settings Page
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                Configure your Pomodoro timer settings here.
            </Typography>
        </Box>
    </Container>
  )
}