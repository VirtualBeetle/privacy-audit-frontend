import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Shield as ShieldIcon } from '@mui/icons-material';
import { DEMO_USER } from '../../data/seedEvents';

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        backgroundSize: '200% 200%',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: '64px !important' }}>
        {/* Logo */}
        <Box className="flex items-center gap-2 flex-1">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(56,189,248,0.4)',
            }}
          >
            <ShieldIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.4px', lineHeight: 1, fontSize: '1.1rem' }}
            >
              DataGuard
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Privacy Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Right section */}
        <Box className="flex items-center gap-3">
          {/* Live indicator */}
          <Box className="flex items-center gap-1.5">
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
                animation: 'pulseRing 2s ease-out infinite',
              }}
            />
            <Typography sx={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 500 }}>Live</Typography>
          </Box>

          <Box
            sx={{
              width: '1px',
              height: 20,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          />

          <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
            {DEMO_USER.name}
          </Typography>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 2px 10px rgba(56,189,248,0.35)',
            }}
          >
            JO
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
