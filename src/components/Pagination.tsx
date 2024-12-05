"use client";
import Link from 'next/link';

import { useState, useEffect } from "react";
import axios from "utils/axios";
import Book, { IBook } from "./Book";
import Range from "@mui/material/Pagination";

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
export default function Pagination() {
  const [data, setData] = useState<{ books: IBook[] } | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [maxBooks, setMaxBooks] = useState(0);
  const [bookCount, setBookCount] = useState(10000);
  
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/c/books/all/${page}/${limit}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const lim = Number((event.target as HTMLInputElement).value);
      setLimit(lim);
      setMaxBooks(Math.round(bookCount / lim));
    }
  };
    
    useEffect(() => {
      try {
        axios.get(`/c/books/all/1/10000`)
        .then((response) => {
          const lim = response.data.books.length;
          setBookCount(lim);
          setMaxBooks(Math.round(lim / limit));
        });
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }, []);
    
    useEffect(() => {
      fetchBooks();
    }, [page, limit]);


  return (
    <div style={styles.container}>
      <div style={styles.grid}>
      {data && data.books.map((book) => (
          <Link key={book.isbn13} href={`/books/${book.isbn13}`} passHref>
              <Book book={book} refreshBooks={fetchBooks} />
          </Link>
        ))}
      </div>
      <div style={styles.flexContainer}>
        <Range count={maxBooks} color="primary" onChange={handlePageChange} />
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={() => event?.preventDefault()}
        >
          <TextField
            label="Limit"
            id="filled-size-small"
            defaultValue={limit}
            variant="filled"
            size="small"
            onKeyDown={handleLimitChange}
          />
        </Box>
      </div>
    </div>
  );
}
