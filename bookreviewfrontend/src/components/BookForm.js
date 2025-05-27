import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/books', { title, author, year, coverUrl })
      .then(() => navigate('/'))
      .catch(err => alert('Failed to add book'));
  };

  return (
      <div className="container">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Cover URL" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
          </div>
          <button type="submit">Add Book</button>
          <button onClick={() => navigate('/')} className="cancel-btn">Cancel</button>
        </form>
      </div>
    );
}

export default BookForm;