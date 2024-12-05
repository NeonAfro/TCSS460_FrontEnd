'use client';

import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Trash Can Icon
import { Box, Typography } from '@mui/material';
import axios from 'utils/axios';
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
    width: '100px',
    height: '150px',
    objectFit: 'cover'
  },
  details: {
    position: 'relative',
    backgroundColor: '#f5f5f5',
    padding: '5px 10px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '0.8rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.2',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    color: '#ff5252'
  },
  feedback: {
    position: 'fixed',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '8px 16px',
    borderRadius: '4px',
    zIndex: 1300,
    color: 'white'
  }
};

export default function Book({ book, refreshBooks }: BookProps & { refreshBooks: () => void }) {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackColor, setFeedbackColor] = useState<string>('');

  const handleDelete = async () => {
    try {
      await axios.delete(`/c/books/isbn/${book.isbn13}`);
      setFeedbackMessage('Book deleted successfully!');
      setFeedbackColor('green');
      setTimeout(() => setFeedbackMessage(null), 3000); // Clear feedback after 3 seconds
      refreshBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error deleting book:', error);
      setFeedbackMessage('Failed to delete the book.');
      setFeedbackColor('red');
      setTimeout(() => setFeedbackMessage(null), 3000); // Clear feedback after 3 seconds
    }
  };

  return (
    <>
      <div style={styles.card}>
        {/* Book Image */}
        <Link href={`/books/${book.isbn13}`} passHref>
          <img src={book.icons.large} alt={book.title} style={styles.image} />
        </Link>

        {/* Book Details */}
        <div style={styles.details}>
          <DeleteIcon style={styles.deleteIcon} onClick={handleDelete} />
          <h2>{book.title}</h2>
          <p>
            <strong>ISBN-13:</strong> {book.isbn13}
          </p>
          <p>
            <strong>Authors:</strong> {book.authors}
          </p>
          <p>
            <strong>Publication Year:</strong> {book.publication}
          </p>
          <p>
            <strong>Original Title:</strong> {book.original_title}
          </p>
        </div>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <Box
          sx={{
            ...styles.feedback,
            backgroundColor: feedbackColor
          }}
        >
          <Typography>{feedbackMessage}</Typography>
        </Box>
      )}
    </>
  );
}
