import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, WarningAmber as WarningAmberIcon, CheckCircle as CheckCircleOutlineIcon } from '@mui/icons-material';
import { formatDistanceToNow, format } from 'date-fns';
import SensitivityBadge from '../badges/SensitivityBadge';
import ActorBadge from '../badges/ActorBadge';
import type { AuditEvent } from '../../types';

const ACTION_COLOR: Record<string, { bg: string; color: string }> = {
  READ:   { bg: '#dbeafe', color: '#1d4ed8' },
  EXPORT: { bg: '#fef3c7', color: '#b45309' },
  DELETE: { bg: '#fee2e2', color: '#b91c1c' },
  SHARE:  { bg: '#ffe4e6', color: '#be123c' },
};

interface Props { event: AuditEvent }

export default function EventCard({ event }: Props) {
  const [expanded, setExpanded] = useState(false);
  const ac = ACTION_COLOR[event.actionCode] ?? ACTION_COLOR.READ;

  return (
    <Box
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: 2,
        p: 2,
        backgroundColor: '#fff',
        transition: 'box-shadow 0.15s',
        '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
      }}
    >
      {/* Top row */}
      <Box className="flex items-start justify-between gap-2">
        <Box className="flex items-center gap-2 flex-wrap flex-1">
          <Chip
            label={event.actionLabel}
            size="small"
            sx={{ backgroundColor: ac.bg, color: ac.color, fontWeight: 700, fontSize: '0.7rem', height: 22, borderRadius: '4px' }}
          />
          <SensitivityBadge code={event.sensitivityCode} />
          <ActorBadge type={event.actorType} />
          {event.thirdPartyInvolved && (
            <Chip
              icon={<WarningAmberIcon style={{ fontSize: 13 }} />}
              label="3rd Party"
              size="small"
              sx={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 600, fontSize: '0.7rem', height: 22, borderRadius: '4px' }}
            />
          )}
          {!event.consentObtained && (
            <Chip
              label="No Consent"
              size="small"
              sx={{ backgroundColor: '#fee2e2', color: '#991b1b', fontWeight: 600, fontSize: '0.7rem', height: 22, borderRadius: '4px' }}
            />
          )}
        </Box>
        <Box className="flex items-center gap-2 shrink-0">
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            {formatDistanceToNow(new Date(event.occurredAt), { addSuffix: true })}
          </Typography>
          <IconButton size="small" onClick={() => setExpanded((v) => !v)} sx={{ p: 0.5 }}>
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      {/* Reason and actor */}
      <Typography variant="body2" sx={{ color: '#374151', mt: 1, fontWeight: 500 }}>
        {event.reasonLabel}
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748b' }}>
        By: {event.actorLabel}
        {event.actorIdentifier ? ` (${event.actorIdentifier})` : ''}
        {' · '}{event.tenantName}
      </Typography>

      {/* Data fields chips */}
      <Box className="flex flex-wrap gap-1 mt-2">
        {event.dataFields.map((f) => (
          <Chip
            key={f}
            label={f.replace(/_/g, ' ')}
            size="small"
            sx={{ height: 20, fontSize: '0.68rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '3px' }}
          />
        ))}
      </Box>

      {/* Expanded detail */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 1.5 }} />
        <Box className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            ['Region', event.region ?? '—'],
            ['Retention', `${event.retentionDays} days`],
            ['Consent', event.consentObtained
              ? <Box component="span" className="flex items-center gap-1"><CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#16a34a' }} /> Yes</Box>
              : <Box component="span" sx={{ color: '#dc2626' }}>No</Box>],
            ['Third Party', event.thirdPartyName ?? 'None'],
            ['Occurred', format(new Date(event.occurredAt), 'dd MMM yyyy, HH:mm')],
            ['Event ID', <Typography key="eid" variant="caption" sx={{ fontFamily: 'monospace', color: '#6b7280' }}>{event.eventId}</Typography>],
          ].map(([label, val]) => (
            <Box key={String(label)}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.5px' }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.8rem' }}>
                {val}
              </Typography>
            </Box>
          ))}
        </Box>

        {event.meta && Object.keys(event.meta).length > 0 && (
          <Box sx={{ mt: 1.5, p: 1.5, backgroundColor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.5px', display: 'block', mb: 0.5 }}>
              Additional Context (meta)
            </Typography>
            {Object.entries(event.meta).map(([k, v]) => (
              <Typography key={k} variant="caption" sx={{ display: 'block', color: '#475569', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <span style={{ color: '#6366f1' }}>{k}</span>: {v}
              </Typography>
            ))}
          </Box>
        )}
      </Collapse>
    </Box>
  );
}
