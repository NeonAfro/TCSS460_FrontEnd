'use client';

import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'utils/axios';
import Book from 'components/Book'; // Assuming SmallBook is used to render book details
import { Box, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import IconButton from '@mui/material/IconButton';
import { IBook } from 'types/book';

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
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px'
  }
};

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

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IBook[]>([]);

  const handleQuerySearch = (query: string, target: HTMLElement | null) => {
    setSearchQuery(query);
  };

  const handleSearch = async (query: string, target: HTMLElement | null) => {
    try {
      const response = await axios.get(`/c/books/author/${searchQuery}`);
      setSearchResults(response.data.books || []); // Assuming the response contains `books`
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Clear results on error
    }
  };

  return (
    <Box>
      {/* Search Input */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">How to Search</Typography>
              {'Searches must'} <em>{'precisely'}</em> {'match the original title of the book.'}
            </React.Fragment>
          }
        >
          <IconButton style={{ marginRight: '-30px' }}>
            <HelpOutlineTwoToneIcon />
          </IconButton>
        </HtmlTooltip>
        {/* Search Input */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by Author(s)"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => handleQuerySearch(e.target.value, e.target)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e.target.value, e.target); // Trigger search on Enter key press
              }
            }}
          />
        </Search>
      </div>

      {/* Search Results */}
      <div style={styles.grid}>
        {searchResults && searchResults.map((book) => <Book key={book.isbn13} book={book} refreshBooks={() => {}} />)}
      </div>

     </Box>
  );
}
