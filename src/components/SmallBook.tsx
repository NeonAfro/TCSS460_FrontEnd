'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { BookProps } from 'types/book';

const styles: { [key: string]: React.CSSProperties } = {
    card: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '10px',
      position: 'relative'
    },
    image: {
      cursor: 'pointer',
      width: '50px',
      height: '75px',
      objectFit: 'cover'
    },
    details: {
      position: 'relative',
      backgroundColor: '#f5f5f5',
      padding: '5px 10px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      fontSize: '0.6rem', // Scaled down font size
      lineHeight: '1', // Reduced line height
      margin: '0', // Reset margin for paragraphs
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    paragraph: {
      margin: '0', // Remove default margin
      padding: '1px 0', // Optional: Add minimal padding for spacing
    }
  };
  
  

export default function SmallBook({
  book,
  clearResults
}: BookProps & { clearResults: () => void }) {
  const handleClick = () => {
    clearResults(); // Clear search results
  };

  return (
    <>
      <div style={styles.card}>
        {/* Book Image */}
        <Link href={`/books/${book.isbn13}`} passHref>
          <img
            src={book.icons.large}
            alt={book.title}
            style={styles.image}
            onClick={handleClick} // Trigger clearResults on click
          />
        </Link>

        {/* Book Details */}
        <div style={styles.details}>
            <h2 style={{ margin: '0 0 4px 0' }}>{book.title}</h2>
                <p style={styles.paragraph}>
                    <strong>ISBN-13:</strong> {book.isbn13}
                </p>
                <p style={styles.paragraph}>
                    <strong>Authors:</strong> {book.authors}
                </p>
                <p style={styles.paragraph}>
                    <strong>Publication Year:</strong> {book.publication}
                </p>
                <p style={styles.paragraph}>
                    <strong>Original Title:</strong> {book.original_title}
                </p>
        </div>
      </div>
    </>
  );
}
