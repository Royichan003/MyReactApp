import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import BookService from "./BookService";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const BookList = (props) => {

    const history = useHistory();
    const [books, setBooks] = useState([]);
    const bookRef = useRef();
    bookRef.current = books;
    const columns = useMemo(
        () => [
          {
            Header: "Title",
            accessor: "title",
          },
          {
            Header: "Author",
            accessor: "author",
          },
          {
            Header: "Country",
            accessor: "country"
          },
          {
            Header: "Language",
            accessor: "language"
          },
          {
            Header: "Genre",
            accessor: "genre"
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
              const rowIdx = props.row.id;
              return (
                <div>
                  <span onClick={() => openBook(rowIdx)}>
                    <i className="far fa-edit action mr-2"></i>
                  </span>
                  <span>  |  </span>
                  <span onClick={() => deleteBook(rowIdx)}>
                    <i className="fas fa-trash action"></i>
                  </span>
                </div>
              );
            },
          },
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: books,
      });
    
  

  useEffect(() => {
    retrieveBooks();
  }, []);


  const retrieveBooks = () => {
    BookService.getAll()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openBook = (rowIndex) => {
    const id = bookRef.current[rowIndex].id;
debugger
    history.push("/editbooks/" + id);
  };

  const deleteBook = (rowIndex) => {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
            {
              label: 'Yes',
              onClick: () => deleteBookTrue(rowIndex)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ],
        overlayClassName: "overlay-custom-class-name"
      })
    
  };

  const deleteBookTrue = (rowIndex) => {
    const id = bookRef.current[rowIndex].id;

    BookService.remove(id)
      .then((response) => {
          debugger
        history.push("/books");

        let newBook = [...bookRef.current];
        newBook.splice(rowIndex, 1);

        setBooks(newBook);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          {/* <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            
          /> */}
          <div className="input-group-append"><br/>
            <button
              className="btn btn-outline-secondary"
              type="button"
              color="#ff5c5c"
            >
              <Link to={"/add"}style={{ textDecoration: 'none' }}>Add New Book</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;