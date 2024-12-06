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
}

export default function Pagination({ data, page, limit, maxBooks, pageChange, limitChange, fetchBooks }: PaginationProps) {
  if (!data) {
    return (
      <>
        <h1>LOADING...</h1>
        <Loader />
      </>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {data[page - 1].map((book) => (
          <Book key={book.isbn13} book={book} refreshBooks={fetchBooks} />
        ))}
      </div>
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
};