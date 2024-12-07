'use client';

import React, { useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'utils/axios';
import SmallBook from 'components/SmallBook'; // Assuming SmallBook is used to render book details
import { Box, Typography, Popper, Paper, ClickAwayListener } from '@mui/material';
import debounce from 'lodash.debounce';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import IconButton from '@mui/material/IconButton';
import { IBook } from 'types/book';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length === 0) {
        setSearchResults([]); // Clear results when query is empty
        return;
      }
      query = query[0].toUpperCase() + query.slice(1); // Capitalize the first letter
      try {
        const response = await axios.get(`/c/books/original_title/${query}`);
        setSearchResults(response.data.books || []); // Assuming the response contains `books`
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]); // Clear results on error
      }
    }, 300), // Debounce delay (300ms)
    []
  );

  const handleSearch = (query: string, target: HTMLElement | null) => {
    setSearchQuery(query);
    setAnchorEl(target); // Set the anchor element for the dropdown
    debouncedSearch(query); // Call the debounced function
  };

  // Clear search results
  const clearResults = () => {
    setSearchQuery('');
    setSearchResults([]);
    setAnchorEl(null); // Close the dropdown
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
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by Original Title"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value, e.target)} // Trigger search on input change
            onFocus={(e) => handleSearch(e.target.value, e.target)} // Show dropdown when focused
          />
        </Search>
      </div>

      {/* Dropdown Results */}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300 }}>
        <ClickAwayListener onClickAway={clearResults}>
          <Paper style={{ maxHeight: 300, overflowY: 'auto', width: anchorEl?.offsetWidth || 'auto' }}>
            {searchResults.length > 0 ? (
              searchResults.map((book) => (
                <SmallBook
                  key={book.isbn13}
                  book={book}
                  clearResults={clearResults} // Pass the clearResults callback
                />
              ))
            ) : searchQuery.trim() !== '' ? (
              <Typography>No results found for &quot;{searchQuery}&quot;</Typography>
            ) : null}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
