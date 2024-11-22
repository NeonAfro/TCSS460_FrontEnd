// Material-UI imports
import React, { useState } from 'react';
import { IconButton, Typography, Box, Drawer, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Project imports
import MainCard from 'components/MainCard';

// Validation schema for Formik
const validationSchema = Yup.object({
  title: Yup.string().required('Book title is required'),
  author: Yup.string().required('Author name is required'),
  description: Yup.string(),
});

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle form submission
  const handleFormSubmit = (values) => {
    console.log('New Book Data:', values);
    setDrawerOpen(false); // Close the drawer on successful submission
  };

  return (
    <MainCard
      title="Sample Card"
      action={
        <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
          <AddIcon />
        </IconButton>
      }
    >
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>

      {/* Drawer for New Book Form */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            New Book
          </Typography>
          <Formik
            initialValues={{
              title: '',
              author: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Title"
                  name="title"
                  fullWidth
                  margin="normal"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  label="Author"
                  name="author"
                  fullWidth
                  margin="normal"
                  error={touched.author && Boolean(errors.author)}
                  helperText={touched.author && errors.author}
                />
                <Field
                  as={TextField}
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button variant="outlined" color="secondary" onClick={() => setDrawerOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>
    </MainCard>
  );
}
