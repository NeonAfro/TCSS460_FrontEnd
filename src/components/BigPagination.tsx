'use client';
import Book from 'components/Book';
import { IBook } from 'types/book';
import Range from '@mui/material/Pagination';
import Loader from 'components/Loader';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

interface PaginationProps {
  data: IBook[][] | null;
  page: number;
  limit: number;
  maxBooks: number;
  pageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  limitChange: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  fetchBooks: () => void;
  setPage?: (value: number) => void; // Make setPage optional
}

export default function Pagination({
  data,
  page,
  limit,
  maxBooks,
  pageChange,
  limitChange,
  fetchBooks,
  setPage // Add setPage as an optional prop
}: PaginationProps) {
  if (!data) {
    return (
      <>
        <h1>LOADING...</h1>
        <Loader />
      </>
    );
  }

  // Adjust the page if it exceeds the new maxBooks
  if (setPage && page > maxBooks) {
    setPage(maxBooks > 0 ? maxBooks : 1); // Ensure page is within bounds
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>{data[page - 1]?.map((book) => <Book key={book.isbn13} book={book} refreshBooks={fetchBooks} />)}</div>
      <div style={styles.flexContainer}>
        <Range count={maxBooks} color="primary" onChange={pageChange} page={page} />
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField label="Limit" id="filled-size-small" defaultValue={limit} variant="filled" size="small" onKeyDown={limitChange} />
        </Box>
      </div>
    </div>
  );
}
