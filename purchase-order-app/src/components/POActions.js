import React from 'react';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const POActions = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: '#4d4d4d',
        color: 'white',
        borderRadius: '4px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#333333',
        },
      }}
      endIcon={<KeyboardArrowDownIcon />}
    >
      PO Actions
    </Button>
  );
};

export default POActions;
