import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Books from "./views/books/Books";
import { BrowserRouter as Router, Routes, Route, Redirect,Navigate } from 'react-router-dom';
import Login from "./views/Login/Login";


function App() {
  return (
    <Router>
    <div className="App">
        {/* <Expenses expense_id={""}/> */}
        {/* <Books book_id={""}/> */}

        <Routes>
          {/* Add your other routes here */}
          <Route path="/books" element={<Books />} book_id={""} />

          {/* Redirect to /login when the root path is accessed */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Route for the Login component */}
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
