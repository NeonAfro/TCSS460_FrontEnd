import React, { useState } from 'react';
import Rating from '@mui/material/Rating'; // MUI Rating Component
import { Typography, Button } from '@mui/material';
import axios from 'utils/axios';
import { BookProps } from 'types/book';

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
  feedback: {
    marginTop: '10px',
    color: 'green',
    fontSize: '0.9rem',
  },
};

export default function BigBook({ book }: BookProps) {
  const [newRating, setNewRating] = useState<number | null>(0); // State for new rating
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Feedback message

  const handleRatingSubmit = async () => {
    if (!newRating) {
      setFeedbackMessage('Please select a rating before submitting.');
      return;
    }

    // Prepare new rating counts
    const ratingCounts = {
      oneStar: newRating === 1 ? 1 : 0,
      twoStar: newRating === 2 ? 1 : 0,
      threeStar: newRating === 3 ? 1 : 0,
      fourStar: newRating === 4 ? 1 : 0,
      fiveStar: newRating === 5 ? 1 : 0,
    };

    try {
      // Send PUT request with new ratings
      await axios.put(
        `c/books/ratings/${book.isbn13}/${ratingCounts.oneStar}/${ratingCounts.twoStar}/${ratingCounts.threeStar}/${ratingCounts.fourStar}/${ratingCounts.fiveStar}`
      );

      setFeedbackMessage('Your rating has been submitted successfully!');

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 1000); // 1-second delay for user feedback
    } catch (error) {
      console.error('Error submitting rating:', error);
      setFeedbackMessage('Failed to submit your rating. Please try again.');
    }
  };

  return (
    <>
      <div style={styles.card}>
        {/* Book Image */}
        <img src={book.icons.large} alt={book.title} style={styles.image} />

        {/* Book Details */}
        <div style={styles.details}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rating
              name="half-rating-read"
              defaultValue={book.ratings.average}
              precision={0.1}
              readOnly
            />
            <p>{Math.round(book.ratings.average * 10) / 10}</p>
          </div>
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

          {/* New Rating Section */}
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Add Your Rating:
            </Typography>
            <Rating
              name="user-rating"
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue)}
              precision={1}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={handleRatingSubmit}
            >
              Submit Rating
            </Button>
            {feedbackMessage && (
              <Typography style={styles.feedback}>{feedbackMessage}</Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

