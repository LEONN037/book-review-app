import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [score, setScore] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/books/${id}/reviews`, {
      text,
      score: parseInt(score)
    }).then(() => navigate(`/books/${id}`));
  };

  return (
    <div className="container">
      <button onClick={() => navigate(`/books/${id}`)}>← Back to Book</button>
      <h2>Write Your Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="Write your review"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <br />
        <label>Score:</label>
        {[1, 2, 3, 4, 5].map(n => (
          <label key={n}>
            <input
              type="radio"
              value={n}
              checked={score === n}
              onChange={() => setScore(n)}
            />
            {n}
          </label>
        ))}
        <br />
        <button type="submit">Finish Review ✓</button>
      </form>
    </div>
  );
}

export default ReviewForm;