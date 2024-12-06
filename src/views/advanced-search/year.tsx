'use client';

import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'utils/axios';
import Book from 'components/Book';
import { Box, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import IconButton from '@mui/material/IconButton';
import { IBook } from 'types/book';

// Styles
const styles = {
  container: {
    padding: '20px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  }
};

// Custom Tooltip
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9'
    }
  })
);

// Search Input Styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

// SearchBar Component
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);

  // Handle search request
  const handleSearch = async (query: string) => {
    try {
      console.log('Searching for:', query); // Debugging query
      const response = await axios.get(`/c/books/publication/${query}`);
      console.log('Raw Response:', response); // Log the raw response object
      console.log('Search Results:', response.data.book); // Correctly access the `book` array
      setSearchResults(response.data.book || []); // Use the correct key
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Clear results on error
    }
  };

  return (
    <Box>
      {/* Search Input and Tooltip */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">How to Search</Typography>
              {'Search by publication year. Example: '} <em>{'2001'}</em>.
            </React.Fragment>
          }
        >
          <IconButton style={{ marginRight: '-30px' }}>
            <HelpOutlineTwoToneIcon />
          </IconButton>
        </HtmlTooltip>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by Year"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update query but don't trigger search
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery); // Trigger search on Enter key press
              }
            }}
          />
        </Search>
      </div>

      {/* Search Results */}
      <div style={styles.grid}>
        {searchResults.length > 0 ? (
          searchResults.map((book) => <Book key={book.isbn13} book={book} refreshBooks={() => {}} />)
        ) : searchQuery.trim() ? (
          <Typography>No results found for "{searchQuery}"</Typography>
        ) : null}
      </div>
    </Box>
  );
}
