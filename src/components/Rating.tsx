import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: number]: string } = {
  0: 'Garbage',
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface HoverRatingProps {
  onRatingChange: (rating: number) => void; // Define the prop for handling rating changes
}

export default function HoverRating({ onRatingChange }: HoverRatingProps) {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
    if (newValue !== null) {
      onRatingChange(newValue); // Call the parent callback with the selected rating
    }
  };

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={handleRatingChange} // Use the modified handler
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        defaultValue={0}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}



