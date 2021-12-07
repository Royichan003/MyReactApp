import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../src/logo.jpg';
function Home() {
  return (
    <div className="page" style={{ 
      color: 'red',
      backgroundImage: `url("https://images.unsplash.com/photo-1491309055486-24ae511c15c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")` 
    }}>
      <h1>Goodreads: Book reviews, recommendations, and discussions</h1>
      <Link to="/private">
        <button type="button">
          Sign In to continue
        </button>
      </Link>
      <div className="logo">
          <img src={logo} width="100%" height="50%" />
        </div>
    </div>
  );
}

export default Home;