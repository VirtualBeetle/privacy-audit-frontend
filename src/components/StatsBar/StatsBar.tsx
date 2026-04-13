import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { EventNote as EventNoteIcon, Storage as StorageIcon, Business as BusinessIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import type { AuditEvent } from '../../types';

interface Props {
  events: AuditEvent[];
}

export default function StatsBar({ events }: Props) {
  const totalEvents = events.length;

  const uniqueDataFields = new Set(events.flatMap((e) => e.dataFields)).size;

  const uniqueTenants = new Set(events.map((e) => e.tenantId)).size;

  const sorted = [...events].sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
  );
  const lastActivity = sorted[0]
    ? formatDistanceToNow(new Date(sorted[0].occurredAt), { addSuffix: true })
    : '—';

  const stats = [
    { label: 'Total Access Events', value: totalEvents, icon: <EventNoteIcon />, color: '#3b82f6' },
    { label: 'Data Types Accessed', value: uniqueDataFields, icon: <StorageIcon />, color: '#8b5cf6' },
    { label: 'Apps Connected', value: uniqueTenants, icon: <BusinessIcon />, color: '#06b6d4' },
    { label: 'Last Activity', value: lastActivity, icon: <AccessTimeIcon />, color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Box className="flex items-start justify-between">
              <Box>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 0.5 }}>
                  {s.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                  {s.value}
                </Typography>
              </Box>
              <Box sx={{ color: s.color, mt: 0.5 }}>{s.icon}</Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
