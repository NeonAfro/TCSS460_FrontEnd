"use client";

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete"; // MUI Trash Can Icon
import { Box, Typography } from "@mui/material";
import axios from "utils/axios";

export interface IRatings {
  average: number;
  count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}

export interface IUrlIcon {
  large: string;
  small: string;
}

export interface IBook {
  isbn13: number;
  authors: string;
  publication: number;
  original_title: string;
  title: string;
  ratings: IRatings;
  icons: IUrlIcon;
}

export interface BookProps {
  book: IBook;
}

export interface BookImageProps {
  book: IBook;
  className?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "10px",
      position: "relative",
    },
    image: {
      cursor: "pointer",
      width: "200px",
      height: "300px",
      objectFit: "cover",
    },
    details: {
      position: "relative",
      backgroundColor: "#f5f5f5",
      padding: "5px 10px",
      borderRadius: "4px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "0.8rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1.2",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    deleteIcon: {
      position: "absolute",
      top: "5px",
      right: "5px",
      cursor: "pointer",
      color: "#ff5252",
    },
    feedback: {
      position: "fixed",
      bottom: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "8px 16px",
      borderRadius: "4px",
      zIndex: 1300,
      color: "white",
    },
  };
  
  export default function BigBook({
    book,
    refreshBooks,
  }: BookProps & { refreshBooks: () => void }) {
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackColor, setFeedbackColor] = useState<string>("");
  
    const handleDelete = async () => {
      try {
        await axios.delete(`/c/books/isbn/${book.isbn13}`);
        setFeedbackMessage("Book deleted successfully!");
        setFeedbackColor("green");
        setTimeout(() => setFeedbackMessage(null), 3000); // Clear feedback after 3 seconds
        refreshBooks(); // Refresh the book list
      } catch (error) {
        console.error("Error deleting book:", error);
        setFeedbackMessage("Failed to delete the book.");
        setFeedbackColor("red");
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
              backgroundColor: feedbackColor,
            }}
          >
            <Typography>{feedbackMessage}</Typography>
          </Box>
        )}
      </>
    );
  }