import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './bookCarousel.css';

const BookItem = ({ book }) => {
  const statusText = book.Book_Status ? book.Book_Status.status_name : "Đang cập nhật";

  return (
    <div className="home-book-card">
      <Link to={`/truyen/${book.slug}`} style={{color: 'inherit', textDecoration: 'none'}}>
        <div className="home-book-cover-wrapper">
          <img 
            src={book.img || "https://static2.vieon.vn/vieplay-image/poster_v4/2022/04/20/z96eha0f_660x946-demonslayer.jpg"} 
            alt={book.title} 
            onError={(e) => {e.target.src = "https://static2.vieon.vn/vieplay-image/poster_v4/2022/04/20/z96eha0f_660x946-demonslayer.jpg"}}
          />
          
          <div className="home-read-overlay">
            <span className="home-read-btn">Đọc truyện</span>
          </div>

          <span className="home-book-chapter">{statusText}</span>
        </div>
        
        <h3 className="home-book-title">{book.title}</h3>
      </Link>
    </div>
  );
};

const BookCarousel = ({ title, books }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (startIndex + itemsPerPage < books.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  
  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="home-book-section">
      <h2 className="home-section-title">{title}</h2>
      
      <div className="home-carousel-container">
        {startIndex > 0 && (
          <button className="home-carousel-btn home-prev-btn" onClick={handlePrev}>‹</button>
        )}
        <div className="home-book-grid-4">
          {visibleBooks.map(book => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>

        {startIndex + itemsPerPage < books.length && (
          <button className="home-carousel-btn home-next-btn" onClick={handleNext}>›</button>
        )}
      </div>
    </section>
  );
};

export default BookCarousel;