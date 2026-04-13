import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Apps as AppsIcon, Favorite as FavoriteIcon, People as PeopleIcon } from '@mui/icons-material';
import type { TenantFilter } from '../../types';

const TAB_VALUES: TenantFilter[] = ['all', 'health', 'social'];

interface Props {
  value: TenantFilter;
  onChange: (v: TenantFilter) => void;
  counts: { all: number; health: number; social: number };
}

export default function TenantTabs({ value, onChange, counts }: Props) {
  return (
    <Box sx={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
      <Tabs
        value={TAB_VALUES.indexOf(value)}
        onChange={(_, i) => onChange(TAB_VALUES[i])}
        sx={{
          px: 3,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem', minHeight: 48 },
          '& .Mui-selected': { color: '#0f172a' },
          '& .MuiTabs-indicator': { backgroundColor: '#38bdf8', height: 3 },
        }}
      >
        <Tab icon={<AppsIcon fontSize="small" />} iconPosition="start" label={`All Apps (${counts.all})`} />
        <Tab icon={<FavoriteIcon fontSize="small" />} iconPosition="start" label={`HealthTrack (${counts.health})`} />
        <Tab icon={<PeopleIcon fontSize="small" />} iconPosition="start" label={`ConnectSocial (${counts.social})`} />
      </Tabs>
    </Box>
  );
}
