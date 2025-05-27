import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books/${id}`)
      .then(res => setBook(res.data));
    axios.get(`http://localhost:8080/api/books/${id}/reviews`)
      .then(res => setReviews(res.data));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const averageScore = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length).toFixed(2)
      : "No reviews yet";

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>← Back to List</button>
      <div className="book-details-layout">
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Average Score:</strong> {averageScore}</p>
          <div className="cover-container">
            <img src={book.coverUrl} alt={book.title} style={{ maxWidth: '300px' }} />
            <Link to={`/books/${id}/review`}>
              <button className="add-review-btn">Add a review</button>
            </Link>
          </div>
        </div>
        <div className="book-reviews-container">
          <h2>Reviews</h2>
          <ul className="review-list">
            {reviews.map(r => (
              <li key={r.id}>{r.text} — Score: {r.score}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;