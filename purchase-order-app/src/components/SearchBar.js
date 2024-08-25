import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: 'blue' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: '250px',  // Adjust the width
        '& .MuiOutlinedInput-root': {
          height: '40px',  // Adjust the height
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.875rem',  // Adjust the label size
        },
      }}
    />
  );
};

export default SearchBar;
