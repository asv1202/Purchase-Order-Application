// import React from 'react';
// import { Button, ButtonGroup } from '@mui/material';

// const StatusFilter = ({ statusCounts, selectedStatus, onStatusChange }) => {
//   return (
//     <ButtonGroup variant="contained" sx={{ gap: 1 }}>
//       <Button
//         color={selectedStatus === 'Response Awaited' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('Response Awaited')}
//       >
//         Response Awaited ({statusCounts['Response Awaited'] || 0})
//       </Button>
//       <Button
//         color={selectedStatus === 'Accepted' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('Accepted')}
//       >
//         Accepted ({statusCounts.Accepted || 0})
//       </Button>
//       <Button
//         color={selectedStatus === 'Rejected' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('Rejected')}
//       >
//         Rejected ({statusCounts.Rejected || 0})
//       </Button>
//       <Button
//         color={selectedStatus === 'Review Requested' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('Review Requested')}
//       >
//         Review Requested ({statusCounts['Review Requested'] || 0})
//       </Button>
//       <Button
//         color={selectedStatus === 'GRN posted' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('GRN posted')}
//       >
//         GRN Done ({statusCounts['GRN posted'] || 0})
//       </Button>
//       <Button
//         color={selectedStatus === 'Delayed' ? 'primary' : 'inherit'}
//         onClick={() => onStatusChange('Delayed')}
//       >
//         Delayed ({statusCounts.Delayed || 0})
//       </Button>
//     </ButtonGroup>
//   );
// };

// export default StatusFilter;

// import React from 'react';
// import { Button, ButtonGroup } from '@mui/material';

// const StatusFilter = ({ statusCounts, selectedStatus, onStatusChange }) => {
//   return (
//     <ButtonGroup variant="contained" sx={{ gap: 1}}>
//       {['Response Awaited', 'Accepted', 'Rejected', 'Review Requested', 'GRN posted', 'Delayed'].map((status) => (
//         <Button
//           key={status}
//           onClick={() => onStatusChange(status)}
//           sx={{
//             color: selectedStatus === status ? 'black' : 'blue',
//             backgroundColor: selectedStatus === status ? 'blue' : 'white',
//             '&:hover': {
//               backgroundColor: selectedStatus === status ? 'blue' : '#f0f0f0', // Slight grey on hover
//             },
//           }}
//         >
//           {status} ({statusCounts[status] || 0})
//         </Button>
//       ))}
//     </ButtonGroup>
//   );
// };

// export default StatusFilter;

import React from 'react';
import { Button, Box } from '@mui/material';

const StatusFilter = ({ statusCounts, selectedStatus, onStatusChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0, // Add space between buttons
        //justifyContent: 'center', // Center buttons horizontally
        //marginBottom: 2, // Add space below the filter
      }}
    >
      {['Response Awaited', 'Accepted', 'Rejected', 'Review Requested', 'GRN Posted', 'Delayed'].map((status) => (
        <Button
          key={status}
          onClick={() => onStatusChange(status)}
          sx={{
            color: selectedStatus === status ? 'white' : 'blue',
            backgroundColor: selectedStatus === status ? 'blue' : 'white',
            padding: '8px 16px', // Add padding for better spacing
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
