import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Shield as ShieldIcon } from '@mui/icons-material';
import { DEMO_USER } from '../../data/seedEvents';

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}
    >
      <Toolbar className="px-6">
        <ShieldIcon sx={{ color: '#38bdf8', mr: 1.5, fontSize: 28 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.3px', flexGrow: 1 }}
        >
          DataGuard
          <Typography
            component="span"
            sx={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.85rem', ml: 1.5 }}
          >
            Privacy Dashboard
          </Typography>
        </Typography>

        <Box className="flex items-center gap-3">
          {/* <Chip
            label="Demo Mode"
            size="small"
            sx={{ backgroundColor: '#1e3a5f', color: '#7dd3fc', fontSize: '0.7rem', fontWeight: 600 }}
          /> */}
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            {DEMO_USER.name}
          </Typography>
          <Avatar sx={{ width: 34, height: 34, backgroundColor: '#38bdf8', color: '#0f172a', fontSize: '0.85rem', fontWeight: 700 }}>
            JO
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
