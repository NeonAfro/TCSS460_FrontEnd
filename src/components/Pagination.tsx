"use client";

import { useState, useEffect } from "react";
import axios from "utils/axios";
import Book, { IBook } from "./Book";
import Range from "@mui/material/Pagination";
import { round } from "lodash";

const styles = {
  container: {
    padding: "20px",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};
export default function Pagination() {
  const [data, setData] = useState<{ books: IBook[] } | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [maxBooks, setMaxBooks] = useState(0);
  
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/c/books/all/${page}/${limit}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    try {
      axios.get(`/c/books/all/1/10000`)
      .then((response) => {
        const lim = response.data.books.length;
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
        {data &&
          data.books.map((book) => (
            <Book key={book.isbn13} book={book} refreshBooks={fetchBooks} />
          ))}
      </div>

      <Range count={maxBooks} color="primary" onChange={handleChange} />
    </div>
  );
}