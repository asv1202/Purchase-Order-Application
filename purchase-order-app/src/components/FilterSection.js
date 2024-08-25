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
        <InputLabel sx={{ color: 'blue' }}>Status: All</InputLabel>
        <Select
          label="Status: All"
          style={{ width:'170px' }}
          onChange={(e) => onFilterChange('status', e.target.value)}
          sx={{ color: 'blue' }}
        >
          <MenuItem value="" sx={{ color: 'blue' }}>All</MenuItem>
          {statuses.map((status, index) => (
            <MenuItem key={index} value={status} sx={{ color: 'blue' }}>
              {status}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: 'blue' }}>2000 Packaging</InputLabel>
        <Select
          label="2000 Packaging"
          onChange={(e) => onFilterChange('vendor', e.target.value)}
          style={{ width:'170px' }}
          sx={{ color: 'blue' }}
        >
          <MenuItem value="" sx={{ color: 'blue' }}>All</MenuItem>
          {vendors.map((vendor, index) => (
            <MenuItem key={index} value={vendor} sx={{ color: 'blue' }}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: 'blue' }}>Suppliers: All</InputLabel>
        <Select
          label="Suppliers: All"
          onChange={(e) => onFilterChange('suppliers', e.target.value)}
          style={{ width:'170px' }}
          sx={{ color: 'blue' }}
        >
          <MenuItem value="" sx={{ color: 'blue' }}>All</MenuItem>
          <MenuItem value="Supplier1" sx={{ color: 'blue' }}>Supplier1</MenuItem>
          <MenuItem value="Supplier2" sx={{ color: 'blue' }}>Supplier2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSection;
