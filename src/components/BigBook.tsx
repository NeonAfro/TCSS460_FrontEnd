
import Rating from '@mui/material/Rating'; // MUI Rating Component
import { Typography } from '@mui/material';
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

export default function BigBook({ book }: BookProps) {

  return (
    <>
      <div style={styles.card}>
        {/* Book Image */}
        <img src={book.icons.large} alt={book.title} style={styles.image} />

        {/* Book Details */}
        <div style={styles.details}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rating name="half-rating-read" defaultValue={book.ratings.average} precision={0.1} readOnly />
            <p>{book.ratings.average}</p>
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
        </div>
      </div>
    </>
  );
}
