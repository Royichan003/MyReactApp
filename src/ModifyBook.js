import React, { useState, useEffect } from "react";
import BookService from "./BookService";
import { useHistory } from 'react-router-dom';

const ModifyBook = props => {
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    country: "",
    language: "",
    genre:""
  };
  const history = useHistory();
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const getBook = id => {
      debugger
    BookService.get(id)
      .then(response => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateBook = () => {
      debugger
    BookService.update(currentBook.id, currentBook)
      .then(response => {
          debugger
        console.log(response.data);
        setSubmitted(true);
        setMessage("The book was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const cancel = () => {
    history.push("/books");
  };
  const close = () => {
    history.push("/books");
  };

  const deleteBook = () => {
    BookService.remove(currentBook.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/books");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
    {submitted ? (
      <div><br/>
        <h4>Updated Successfully!</h4>
        <button className="btn btn-success" onClick={close}>
          Close
        </button>
      </div>
    ) : (
    <div>
      {currentBook ? (
        <div className="edit-form">
            <br />
          <h4>Modify Book</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title"style={{fontWeight: "bold"}}>Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author"style={{fontWeight: "bold"}}>Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentBook.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country"style={{fontWeight: "bold"}}>Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={currentBook.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="language"style={{fontWeight: "bold"}}>Language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={currentBook.language}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre"style={{fontWeight: "bold"}}>Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                value={currentBook.genre}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <br />
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateBook}
          >
            Update Book
          </button>{' '}
          <button
            type="submit"
            className="btn btn-success"
            onClick={cancel}
          >
            Close
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
    )}
    </div>
  );
};

export default ModifyBook;