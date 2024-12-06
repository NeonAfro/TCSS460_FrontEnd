'use client';

import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // MUI Trash Can Icon
import { Box, Typography } from '@mui/material';
import { BookProps } from 'types/book';
import axios from 'utils/axios';

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px', 
    position: 'relative',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    maxWidth: '90%',
    margin: '20px auto', 
  },
  image: {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
  },
  details: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', 
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

export default function BigBook({ book, refreshBooks }: BookProps & { refreshBooks: () => void }) {
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
        <img src={book.icons.large} alt={book.title} style={styles.image} />

        {/* Book Details */}
        <div style={styles.details}>
          <DeleteIcon style={styles.deleteIcon} onClick={handleDelete} />

          {/* Title */}
          <Typography variant="h3" gutterBottom>
            {book.title}
          </Typography>

          {/* Book Information */}
          <Typography variant="h6">
            <strong>ISBN-13:</strong> {book.isbn13}
          </Typography>
          <Typography variant="h6">
            <strong>Authors:</strong> {book.authors}
          </Typography>
          <Typography variant="h6">
            <strong>Publication Year:</strong> {book.publication}
          </Typography>
          <Typography variant="h6">
            <strong>Original Title:</strong> {book.original_title}
          </Typography>
        </div>
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <Box
          sx={{
            ...styles.feedback,
            backgroundColor: feedbackColor,
          }}
        >
          <Typography>{feedbackMessage}</Typography>
        </Box>
      )}
    </>
  );
}
