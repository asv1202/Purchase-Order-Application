import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const DateFilter = ({ onDateFilterChange = () => {} }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleFromDateChange = (event) => {
    const formattedDate = formatDate(event.target.value);
    setFromDate(formattedDate);
    onDateFilterChange({ fromDate: formattedDate, toDate });
  };

  const handleToDateChange = (event) => {
    const formattedDate = formatDate(event.target.value);
    setToDate(formattedDate);
    onDateFilterChange({ fromDate, toDate: formattedDate });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5, 
      }}
    >
      <TextField
        label="From"
        type="date"
        variant="outlined"
        size="small"
        value={fromDate.split('/').reverse().join('-') || ''}
        onChange={handleFromDateChange}
        InputLabelProps={{
          shrink: true,
          style: {color: 'blue'}
        }}
        sx={{
            '& input': {
              color: 'blue', 
            },
            '& input::-webkit-calendar-picker-indicator': {
              color: 'blue', 
            },
          }}
      />
      <TextField
        label="To"
        type="date"
        variant="outlined"
        size="small"
        value={toDate.split('/').reverse().join('-') || ''}
        onChange={handleToDateChange}
        InputLabelProps={{
          shrink: true,
          style: {color: 'blue'}
        }}
        sx={{
            '& input': {
              color: 'blue',
            },
            '& input::-webkit-calendar-picker-indicator': {
              color: 'blue', 
            },
          }}
      />
    </Box>
  );
};

export default DateFilter;
