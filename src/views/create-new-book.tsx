'use client';

import HoverRating from 'components/Rating';
import React, { useState } from 'react';
import { Box, Button, Drawer, Typography, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function RightDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Validation Schema for Formik
  const validationSchema = Yup.object({
    newId: Yup.string().required('ID is required'),
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

  const handleClick = async (values: any) => {
    try {
      // Axios POST request
      const response = await axios.post('http://localhost:4000/c/books/book', values);
      console.log('Success:', response.data);

      // Close the drawer on success
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* Button to toggle the drawer */}
      <Box
        sx={{
          position: 'fixed',
          right: isOpen ? 300 : 16, // Adjust based on drawer state
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
          {isOpen ? 'Close' : 'Open'} Drawer
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
            width: 400, // Drawer width
            padding: 2,
          },
        }}
      >
        {/* Drawer Content */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Add New Book
          </Typography>
          <HoverRating/>
          <Formik
            initialValues={{
              newId: '',
              isbn13: '',
              authors: '',
              publication_year: '',
              original_title: '',
              title: '',
              image_url: '',
              image_small_url: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleClick} // Pass handleClick as the submit handler
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="newId"
                  label="New ID"
                  fullWidth
                  margin="normal"
                  error={touched.newId && Boolean(errors.newId)}
                  helperText={touched.newId && errors.newId}
                />
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
    </>
  );
}



// 'use client';

// import React, { useState } from 'react';
// import { Box, Button, Drawer, Typography } from '@mui/material';

// export default function RightDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Animation duration (matches Material-UI's default)
//   const animationDuration = 225; // in milliseconds

//   return (
//     <>
//       {/* Button to toggle the drawer */}
//       <Box
//         sx={{
//           position: 'fixed',
//           right: isOpen ? 300 : 16, // Adjust based on drawer state
//           top: '50%',
//           transform: 'translateY(-50%)',
//           transition: `right ${animationDuration}ms ease`, // Match Drawer duration
//           zIndex: 1200, // Ensure it stays above other elements
//         }}
//       >
//         <Button
//           variant="contained"
//           onClick={() => setIsOpen(!isOpen)}
//           sx={{
//             borderRadius: '0 4px 4px 0', // Rounded left corner
//           }}
//         >
//           {isOpen ? 'Close' : 'Open'} Drawer
//         </Button>
//       </Box>

//       {/* Drawer Component */}
//       <Drawer
//         anchor="right"
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         transitionDuration={animationDuration} // Match button animation duration
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 300, // Drawer width
//             padding: 2,
//           },
//         }}
//       >
//         {/* Drawer Content */}
//         <Box>
//           <Typography variant="h6" gutterBottom>
//             Drawer Content
//           </Typography>
//           <Button variant="outlined" onClick={() => setIsOpen(false)}>
//             Close Drawer
//           </Button>
//         </Box>
//       </Drawer>
//     </>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import { Box, Button, Drawer, Typography } from '@mui/material';

// export default function RightDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Button to toggle the drawer */}
//       <Button
//         variant="contained"
//         onClick={() => setIsOpen(true)}
//         sx={{
//           position: 'fixed',
//           right: 16,
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 1200,
//         }}
//       >
//         Open Drawer
//       </Button>

//       {/* Drawer Component */}
//       <Drawer
//         anchor="right" // Pull out from the right
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 300, // Set drawer width
//             padding: 2,
//           },
//         }}
//       >
//         {/* Drawer Content */}
//         <Box>
//           <Typography variant="h6" gutterBottom>
//             Drawer Content
//           </Typography>
//         </Box>
//       </Drawer>
//     </>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import { Box, Button, Drawer, Typography } from '@mui/material';

// export default function BarebonesDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Drawer and Button */}
//       <Drawer
//         anchor="right"
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             display: 'flex',
//             alignItems: 'flex-start',
//             justifyContent: 'space-between',
//             flexDirection: 'column',
//             width: 300, // Adjust the width as needed
//             position: 'relative',
//           },
//         }}
//       >
//         {/* Drawer Content */}
//         <Box sx={{ width: '100%', padding: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Drawer Content
//           </Typography>
//           <Button onClick={() => setIsOpen(false)}>Close</Button>
//         </Box>
//       </Drawer>

//       {/* Persistent Button on the Right */}
//       <Box
//         sx={{
//           position: 'fixed',
//           right: isOpen ? 300 : 0, // Adjust position based on drawer state
//           top: '50%',
//           transform: 'translateY(-50%)',
//           transition: 'right 0.3s ease', // Smooth transition
//           zIndex: 1300, // Ensure it stays above other elements
//         }}
//       >
//         <Button
//           variant="contained"
//           onClick={() => setIsOpen(true)}
//           sx={{
//             borderRadius: '0 4px 4px 0',
//           }}
//         >
//           Open Drawer
//         </Button>
//       </Box>
//     </>
//   );
// }


// import React, { useState } from 'react';
// import { Box, Button, Drawer, Typography } from '@mui/material';

// export default function BarebonesDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Button to open the drawer */}
//       <Button variant="contained" onClick={() => setIsOpen(true)}>
//         Open Drawer
//       </Button>

//       {/* Drawer Component */}
//       <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
//         <Box sx={{ width: 250, padding: 2 }}>
//           <Typography variant="h6">Drawer Content</Typography>
//           <Button onClick={() => setIsOpen(false)}>Close</Button>
//         </Box>
//       </Drawer>
//     </div>
//   );
// }
