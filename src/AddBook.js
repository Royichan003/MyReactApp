import React, { useState } from "react";
import BookService from "./BookService";
import { useHistory } from 'react-router-dom';

const AddBook = () => {

  const initialBookState = {
    id: null,
    title: "",
    author: "",
    country: "",
    language: "",
    genre:""
  };
  const history = useHistory();
  const [books, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBook({ ...books, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: books.title,
      author: books.author,
      country: books.country,
      language: books.language,
      genre: books.genre
      
    };

    BookService.create(data)
      .then(response => {
        setBook({
          id: response.data.id,
          title: response.data.title,
          country: response.data.country,
          language: response.data.language,
          genre: response.data.genre
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };
  const close = () => {
    history.push("/books");
  };
  const cancel = () => {
    history.push("/books");
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
            <br />
          <h4>Added Successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add Another Book
          </button>
          {' '}
          <button className="btn btn-success" onClick={close}>
            Close
          </button>
        </div>
      ) : (
        <div>
            <br />
          <div className="form-group">
            <label htmlFor="title"style={{fontWeight: "bold"}}>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={books.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description"style={{fontWeight: "bold"}}>Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={books.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"style={{fontWeight: "bold"}}>Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={books.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"style={{fontWeight: "bold"}}>Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              required
              value={books.language}
              onChange={handleInputChange}
              name="language"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"style={{fontWeight: "bold"}}>Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              required
              value={books.genre}
              onChange={handleInputChange}
              name="genre"
            />
          </div>
          <br />
          <button onClick={saveBook} className="btn btn-success">
            Submit
          </button>{' '}
          <button onClick={cancel} className="btn btn-success">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBook;