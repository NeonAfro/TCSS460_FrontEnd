"use client";

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
  };
  
  export default function BigBook({
    book,
    refreshBooks,
  }: BookProps & { refreshBooks: () => void }) {
  
  
    return (
      <>
        <div style={styles.card}>
          {/* Book Image */}
          <img src={book.icons.large} alt={book.title} style={styles.image} />
  
          {/* Book Details */}
          <div style={styles.details}>
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
      </>
    );
  }