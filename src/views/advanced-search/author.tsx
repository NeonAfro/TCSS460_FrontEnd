'use client';

import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'utils/axios';
import { Box, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import IconButton from '@mui/material/IconButton';
import { IBook } from 'types/book';
import BigPagination from 'components/BigPagination';


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
  const [searchResults, setSearchResults] = useState<IBook[][]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [maxBooks, setMaxBooks] = useState(0);
  const [bookCount, setBookCount] = useState(10000);

  useEffect(() => {
    fetchBooks();
  }, [page, limit]);

  const fetchBooks = async () => {
    handleSearch(searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const lim = Number((event.target as HTMLInputElement).value);
      if (lim <= 0) return;
      setLimit(lim);
      setMaxBooks(Math.round(bookCount / lim));
      handleSearch(searchQuery);
    }
  };

  // Handle search request
  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`/c/books/author/${searchQuery}`);
      const count = response.data.books.length;
      const data: IBook[][] = [];
      for (let i = 0; i < limit; i++) {
        data.push(response.data.books.slice(i * limit, (i + 1) * limit));
      }
      setMaxBooks(Math.round(count / limit));
      setBookCount(count);
      setSearchResults(data || []); // Use the correct key
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
              {'Search by author, for multiple, comma separate.'} <br></br> {'Example:'} <em>{'J.K. Rowling'}</em>.
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
            placeholder="Search by Author(s)"
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
      {searchResults.length ? (
        <BigPagination
          data={searchResults}
          page={page}
          limit={limit}
          maxBooks={maxBooks}
          pageChange={handlePageChange}
          limitChange={handleLimitChange}
          fetchBooks={fetchBooks}
          setPage={setPage}
        />
      ) : searchQuery.trim() ? (
        <Typography>No results found for "{searchQuery}"</Typography>
      ) : null}
    </Box>
  );
}
