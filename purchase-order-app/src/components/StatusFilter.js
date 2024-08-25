import React from 'react';
import { Button, Box } from '@mui/material';

const StatusFilter = ({ statusCounts, selectedStatus, onStatusChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0, 
      }}
    >
      {['Response Awaited', 'Accepted', 'Rejected', 'Review Requested', 'GRN Posted', 'Delayed'].map((status) => (
        <Button
          key={status}
          onClick={() => onStatusChange(status)}
          sx={{
            color: selectedStatus === status ? 'white' : 'blue',
            backgroundColor: selectedStatus === status ? 'blue' : 'white',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: selectedStatus === status ? 'blue' : '#f0f0f0',
            },
          }}
        >
          {status} ({statusCounts[status] || 0})
        </Button>
      ))}
    </Box>
  );
};

export default StatusFilter;
