import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterSection = ({ vendors, statuses, onFilterChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5, 
      }}
      mr={5}
    >
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: '#007bff' }}>Status: All</InputLabel>
        <Select
          label="Status: All"
          style={{ width:'170px' }}
          onChange={(e) => onFilterChange('status', e.target.value)}
          sx={{ color: '#007bff' }}
        >
          <MenuItem value="" sx={{ color: '#007bff' }}>All</MenuItem>
          {statuses.map((status, index) => (
            <MenuItem key={index} value={status} sx={{ color: '#007bff' }}>
              {status}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: '#007bff' }}>2000 Packaging</InputLabel>
        <Select
          label="2000 Packaging"
          onChange={(e) => onFilterChange('vendor', e.target.value)}
          style={{ width:'170px' }}
          sx={{ color: '#007bff' }}
        >
          <MenuItem value="" sx={{ color: '#007bff' }}>All</MenuItem>
          {vendors.map((vendor, index) => (
            <MenuItem key={index} value={vendor} sx={{ color: '#007bff' }}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: '#007bff' }}>Suppliers: All</InputLabel>
        <Select
          label="Suppliers: All"
          onChange={(e) => onFilterChange('suppliers', e.target.value)}
          style={{ width:'170px' }}
          sx={{ color: '#007bff' }}
        >
          <MenuItem value="" sx={{ color: '#007bff' }}>All</MenuItem>
          <MenuItem value="Supplier1" sx={{ color: '#007bff' }}>Supplier1</MenuItem>
          <MenuItem value="Supplier2" sx={{ color: '#007bff' }}>Supplier2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSection;
