"use client";
import { useState, useEffect } from "react";
import axios from 'utils/axios';
import Book, {IBook} from "./Book";

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

const format = (data: { books: IBook[] }) => {
  return (
    <div className="book-container" style={{ ...styles.container, ...styles.grid }}>
      {data.books.map((book, i) => (
        <Book key={i} book={book} />
      ))}
    </div>
  );
};

export default function Pagination() {
    const [data, setData] = useState<{ books: IBook[] } | null>(null);
    let page = 150;
    let limit = 30;
    useEffect(() => {
        axios.get(`/c/books/all/${page}/${limit}`)
            .then((res) => { return res.data; })
            .then((data) => setData(data));
    });
    return (
        <div>
            {data && format(data)}
        </div>
    );
}

