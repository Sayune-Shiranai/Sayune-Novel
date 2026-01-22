import React from "react";
import { Link } from "react-router-dom";
import "./bookItem.css";
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

export default BookItem;