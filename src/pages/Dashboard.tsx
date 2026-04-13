import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TenantTabs from '../components/TenantTabs/TenantTabs';
import StatsBar from '../components/StatsBar/StatsBar';
import SensitivityChart from '../components/SensitivityChart/SensitivityChart';
import DataFieldsChart from '../components/DataFieldsChart/DataFieldsChart';
import EventFeed from '../components/EventFeed/EventFeed';
import AIChatButton from '../components/AIChatButton/AIChatButton';
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
    all:    SEED_EVENTS.length,
    health: SEED_EVENTS.filter((e) => TENANT_SLUG[e.tenantId] === 'health').length,
    social: SEED_EVENTS.filter((e) => TENANT_SLUG[e.tenantId] === 'social').length,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #f1f5f9 0%, #e8edf5 50%, #f1f5f9 100%)',
      }}
    >
      <TenantTabs value={tab} onChange={setTab} counts={counts} />

      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>

        {/* Page title */}
        <Box className="anim-fade-up delay-0" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.15 }}
          >
            Your{' '}
            <span className="gradient-text">Privacy</span>{' '}
            Overview
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            A complete record of how your personal data has been accessed across all connected apps.
          </Typography>
        </Box>

        {/* Stats */}
        <Box className="anim-fade-up delay-1" sx={{ mb: 4 }}>
          <StatsBar events={filtered} />
        </Box>

        {/* Charts */}
        <Box
          className="anim-fade-up delay-2"
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}
        >
          <SensitivityChart events={filtered} />
          <DataFieldsChart events={filtered} />
        </Box>

        {/* Event feed */}
        <Box className="anim-fade-up delay-3">
          <EventFeed events={filtered} />
        </Box>
      </Box>

      {/* AI chat FAB */}
      <AIChatButton />
    </Box>
  );
}
