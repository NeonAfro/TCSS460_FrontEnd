"use client";

import { useState, useEffect } from "react";
import axios from "utils/axios";
import Book, { IBook } from "./Book";
import Range from "@mui/material/Pagination";

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/c/books/all/150/30");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {data &&
          data.books.map((book, i) => (
            <Book key={i} book={book} refreshBooks={fetchBooks} />
          ))}
      </div>
      <Range count={10} color="primary" />
    </div>
  );
}