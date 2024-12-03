'use client';

import React, { useState } from 'react';
import HoverRating from 'components/Rating';
import { Box, Button, Drawer, Typography, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';

// Define the Ratings class
class Ratings {
  constructor(
    public rating_avg: number,
    public rating_count: number,
    public rating_1_star: number,
    public rating_2_star: number,
    public rating_3_star: number,
    public rating_4_star: number,
    public rating_5_star: number
  ) {}
}

export default function RightDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [ratings, setRatings] = useState<Ratings>(
    new Ratings(0, 0, 0, 0, 0, 0, 0) // Initialize ratings
  );

  // Validation schema for Formik
  const validationSchema = Yup.object({
    isbn13: Yup.string().required('ISBN-13 is required'),
    authors: Yup.string().required('Authors are required'),
    publication_year: Yup.number()
      .required('Publication Year is required')
      .typeError('Must be a number'),
    original_title: Yup.string().required('Original Title is required'),
    title: Yup.string().required('Title is required'),
    image_url: Yup.string().url('Must be a valid URL'),
    image_small_url: Yup.string().url('Must be a valid URL'),
  });

  // Update the ratings state when a user selects a rating
  const handleRatingChange = (selectedRating: number) => {
    const newRatings = new Ratings(0, 1, 0, 0, 0, 0, 0); // Reset all counts to 0
    newRatings[`rating_${selectedRating}_star` as keyof Ratings] = 1; // Set the selected rating to 1
    newRatings.rating_avg = selectedRating; // Update average rating
    setRatings(newRatings); // Update state
  };

  const handleClick = async (values: any, { resetForm }: any) => {
    try {
      // Include ratings in the payload
      const payload = {
        ...values,
        rating_avg: ratings.rating_avg,
        rating_count: ratings.rating_count,
        rating_1_star: ratings.rating_1_star,
        rating_2_star: ratings.rating_2_star,
        rating_3_star: ratings.rating_3_star,
        rating_4_star: ratings.rating_4_star,
        rating_5_star: ratings.rating_5_star,
      };

      const response = await axios.post('/c/books/book', payload);
      console.log('Success:', response.data);

      // Show success message
      setFeedbackMessage('Book was successfully created!');

      // Close the drawer and reset the form after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setFeedbackMessage('');
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);

      // Show error message
      setFeedbackMessage('Invalid input. Please check the form and try again.');

      // Keep the drawer open for user corrections
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  return (
    <>
      {/* Button to toggle the drawer */}
      <Box
        sx={{
          position: 'fixed',
          right: isOpen ? 300 : 16,
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'right 225ms ease',
          zIndex: 1200,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsOpen(!isOpen)}
          sx={{ borderRadius: '0 4px 4px 0' }}
        >
          {isOpen ? 'Close' : 'New Book'}
        </Button>
      </Box>

      {/* Drawer Component */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transitionDuration={225}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            padding: 2,
          },
        }}
      >
        {/* Drawer Content */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Add New Book
          </Typography>
          <HoverRating onRatingChange={handleRatingChange} />
          <Formik
            initialValues={{
              isbn13: '',
              authors: '',
              publication_year: '',
              original_title: '',
              title: '',
              image_url: '',
              image_small_url: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleClick}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="isbn13"
                  label="ISBN-13"
                  fullWidth
                  margin="normal"
                  error={touched.isbn13 && Boolean(errors.isbn13)}
                  helperText={touched.isbn13 && errors.isbn13}
                />
                <Field
                  as={TextField}
                  name="authors"
                  label="Authors"
                  fullWidth
                  margin="normal"
                  error={touched.authors && Boolean(errors.authors)}
                  helperText={touched.authors && errors.authors}
                />
                <Field
                  as={TextField}
                  name="publication_year"
                  label="Publication Year"
                  fullWidth
                  margin="normal"
                  error={touched.publication_year && Boolean(errors.publication_year)}
                  helperText={touched.publication_year && errors.publication_year}
                />
                <Field
                  as={TextField}
                  name="original_title"
                  label="Original Title"
                  fullWidth
                  margin="normal"
                  error={touched.original_title && Boolean(errors.original_title)}
                  helperText={touched.original_title && errors.original_title}
                />
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  margin="normal"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  name="image_url"
                  label="Image URL"
                  fullWidth
                  margin="normal"
                  error={touched.image_url && Boolean(errors.image_url)}
                  helperText={touched.image_url && errors.image_url}
                />
                <Field
                  as={TextField}
                  name="image_small_url"
                  label="Small Image URL"
                  fullWidth
                  margin="normal"
                  error={touched.image_small_url && Boolean(errors.image_small_url)}
                  helperText={touched.image_small_url && errors.image_small_url}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button variant="outlined" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>

      {/* Feedback Message */}
      {feedbackMessage && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: feedbackMessage.includes('successfully') ? 'green' : 'red',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 4,
            zIndex: 1300,
          }}
        >
          {feedbackMessage}
        </Box>
      )}
    </>
  );
}
