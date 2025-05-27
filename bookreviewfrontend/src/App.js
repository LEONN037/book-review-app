import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import ReviewForm from './components/ReviewForm';
import './App.css';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/review" element={<ReviewForm />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;