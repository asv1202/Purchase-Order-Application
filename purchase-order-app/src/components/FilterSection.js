// import React from 'react';
// import { Grid, TextField, MenuItem } from '@mui/material';

// const FilterSection = ({ vendors, statuses, onFilterChange }) => {
//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     onFilterChange(name, value);
//   };

//   return (
//     <Grid container spacing={2} alignItems="center">
//       {/* PO Action Filter */}
//       <Grid item xs={3}>
//         <TextField
//           fullWidth
//           label="PO Action"
//           name="poAction"
//           select
//           onChange={handleFilterChange}
//           value=""
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {/* Add additional options as needed */}
//         </TextField>
//       </Grid>

//       {/* Vendor Filter */}
//       <Grid item xs={3}>
//         <TextField
//           fullWidth
//           label="Vendor"
//           name="vendor"
//           select
//           onChange={handleFilterChange}
//           value=""
//         >
//           {vendors.map((vendor) => (
//             <MenuItem key={vendor} value={vendor}>
//               {vendor}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>

//       {/* Status Filter */}
//       <Grid item xs={3}>
//         <TextField
//           fullWidth
//           label="Status"
//           name="status"
//           select
//           onChange={handleFilterChange}
//           value=""
//         >
//           {statuses.map((status) => (
//             <MenuItem key={status} value={status}>
//               {status}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Grid>
//     </Grid>
//   );
// };

// export default FilterSection;

// FilterSection.js
import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterSection = ({ vendors, statuses, onFilterChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        //alignItems: 'center',
        gap: 1.5, // Space between the filter dropdowns
        //width: '500px'
      }}
      mr={5}
    >
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel sx={{ color: 'blue' }}>Status: All</InputLabel>
        <Select
          label="Status: All"
          //defaultValue="ALL"
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
          //defaultValue="ALL"
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
          //defaultValue="ALL"
          onChange={(e) => onFilterChange('suppliers', e.target.value)}
          style={{ width:'170px' }}
          sx={{ color: 'blue' }}
        >
          <MenuItem value="" sx={{ color: 'blue' }}>All</MenuItem>
          {/* Replace with actual supplier options */}
          <MenuItem value="Supplier1" sx={{ color: 'blue' }}>Supplier1</MenuItem>
          <MenuItem value="Supplier2" sx={{ color: 'blue' }}>Supplier2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSection;
