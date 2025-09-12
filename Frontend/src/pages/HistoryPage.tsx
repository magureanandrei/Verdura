
import { Box, Typography, Container } from '@mui/material';

export default function HistoryPage() {
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
                    History Page
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Your Pomodoro session history will appear here.
                </Typography>
            </Box>
        </Container>
    )
}