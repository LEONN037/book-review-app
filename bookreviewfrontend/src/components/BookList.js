import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(res => {
        setBooks(res.data);
        res.data.forEach(book => {
          axios.get(`http://localhost:8080/api/books/${book.id}/reviews`)
            .then(r => {
              setReviews(prev => ({ ...prev, [book.id]: r.data }));
            });
        });
      })
      .catch(err => console.error(err));
  }, []);

  const filteredBooks = books.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.year.toString().includes(term)
    );
  });

  const getAverageScore = (bookId) => {
    const bookReviews = reviews[bookId] || [];
    if (bookReviews.length === 0) return '–';
    const sum = bookReviews.reduce((acc, r) => acc + r.score, 0);
    return (sum / bookReviews.length).toFixed(1);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <Link to="/add-book">
          <button className="add-book-btn">Add New Book</button>
        </Link>
        <input
          type="text"
          placeholder="Search by title, author, or year..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="book-table">
          <colgroup>
            <col style={{ width: '60px' }} />
            <col style={{ width: '300px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '50px' }} />
            <col style={{ width: '70px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Avg. Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr
                key={book.id}
                className="clickable-row"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <td>
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    style={{ maxHeight: '80px', objectFit: 'contain' }}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{getAverageScore(book.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
