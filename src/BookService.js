import http from "./http-common";

const getAll = () => {
  return http.get("/books");
};

const get = (id) => {
    debugger
  return http.get(`/books/${id}`);
};

const create = (data) => {
  return http.post("/books", data);
};

const update = (id, data) => {
  return http.put(`/books/${id}`, data);
};

const remove = (id) => {
    debugger
  return http.delete(`/books/${id}`);
};

const BookService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default BookService;