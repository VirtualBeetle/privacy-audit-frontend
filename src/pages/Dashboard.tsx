import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TenantTabs from '../components/TenantTabs/TenantTabs';
import StatsBar from '../components/StatsBar/StatsBar';
import SensitivityChart from '../components/SensitivityChart/SensitivityChart';
import DataFieldsChart from '../components/DataFieldsChart/DataFieldsChart';
import EventFeed from '../components/EventFeed/EventFeed';
import { SEED_EVENTS } from '../data/seedEvents';
import type { TenantFilter } from '../types';

const TENANT_SLUG: Record<string, TenantFilter> = {
  'tenant-health-001': 'health',
  'tenant-social-001': 'social',
};

export default function Dashboard() {
  const [tab, setTab] = useState<TenantFilter>('all');

  const filtered =
    tab === 'all'
      ? SEED_EVENTS
      : SEED_EVENTS.filter((e) => TENANT_SLUG[e.tenantId] === tab);

  const counts = {
    all: SEED_EVENTS.length,
    health: SEED_EVENTS.filter((e) => TENANT_SLUG[e.tenantId] === 'health').length,
    social: SEED_EVENTS.filter((e) => TENANT_SLUG[e.tenantId] === 'social').length,
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <TenantTabs value={tab} onChange={setTab} counts={counts} />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        {/* Page title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Your Privacy Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            A complete record of how your personal data has been accessed across all connected apps.
          </Typography>
        </Box>

        {/* Stats cards */}
        <Box sx={{ mb: 4 }}>
          <StatsBar events={filtered} />
        </Box>

        {/* Charts */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4" sx={{ mb: 4 }}>
          <SensitivityChart events={filtered} />
          <DataFieldsChart events={filtered} />
        </Box>

        {/* Event feed */}
        <EventFeed events={filtered} />
      </Box>
    </Box>
  );
}
