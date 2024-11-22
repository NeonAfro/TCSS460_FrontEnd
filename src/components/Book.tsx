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



export default function Book({ book } : BookProps) {
    const image = book.icons.large.includes("nophoto") 
    ? <BookPlaceHolderImage book={book} className="book-image"/> 
    : <BookImage book={book} className="book-image"/>;
    return (
        <div className="book-card">
            {image}
            {/* <div className="book-info">
                <h1>{book.isbn13}</h1>
                <p>{book.authors}</p>
                <p>{book.publication}</p>
                <p><s>{book.original_title}</s></p>
                <p>{book.title}</p>
                <h2>Average Rating: {book.ratings.average}</h2>
                <h2>Rating Count: {book.ratings.count}</h2>
            </div> */}
        </div>
    );
}

export function BookImage({ book } : BookImageProps) {
    return (
        <img 
            src={book.icons.large} 
            alt={book.title} 
            onClick={() => alert(book.isbn13)} 
        />
    );
}

export function BookPlaceHolderImage({ book } : BookImageProps) {
    return (
      <img 
      src={book.icons.large} 
      alt={book.title} 
      onClick={() => alert(book.isbn13)} 
  />
    );
}