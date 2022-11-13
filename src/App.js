import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeLayout from "./views/layouts/HomeLayout";
import BooksComponent from "./views/books/BooksComponent";
import EmployeesComponent from "./views/employees/EmployeesComponent";
import ExpensesComponent from "./views/expense/ExpensesComponent";
import StudentsComponent from "./views/students/StudentsComponent";
import PageNotFoundComponent from "./views/page-not-found/PageNotFoundComponent";
import HomeComponent from "./views/home/HomeComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeComponent />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path="books" element={<BooksComponent />} />
          <Route path="employees" element={<EmployeesComponent />} />
          <Route path="expenses" element={<ExpensesComponent />} />
          <Route path="students" element={<StudentsComponent />} />
          <Route path="*" element={<PageNotFoundComponent />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
