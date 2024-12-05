"use client";
import { useParams } from 'next/navigation';
//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Book, { IBook } from 'components/Book';

export default function BookPage() {
  //const router = useRouter();
  const params = useParams();
  const isbn13 = params.isbn13;

  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    if (isbn13) {
      const fetchBook = async () => {
        try {
          console.log(isbn13);
          const response = await axios.get(`/c/books/isbn/${isbn13}`);
          setBook(response.data.book);
        } catch (error) {
          console.error("Failed to fetch book:", error);
        }
      };
      fetchBook();
    }
  }, [isbn13]);

  if (!book) return <div>FAILING...</div>;

  return <Book book={book} refreshBooks={() => {}} />;
}