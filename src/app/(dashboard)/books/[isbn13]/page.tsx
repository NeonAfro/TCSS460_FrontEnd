"use client";
import { useParams } from 'next/navigation';
//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { IBook } from 'types/book';
import BigBook from 'components/BigBook';
import Loader from 'components/Loader';


export default function BookPage() {
  //const router = useRouter();
  const params = useParams();
  const isbn13 = params.isbn13;

  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    if (isbn13) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`/c/books/isbn/${isbn13}`);
          setBook(response.data.book);
        } catch (error) {
          console.error("Failed to fetch book:", error);
        }
      };
      fetchBook();
    }
  }, [isbn13]);

  if (!book) return (
    <>
      <h1>LOADING...</h1>
      <Loader />
    </>);

  return <BigBook book={book} />;
}