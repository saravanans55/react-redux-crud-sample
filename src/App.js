import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Expenses from "./views/expenses/Expenses";

function App() {
  return (
    <div className="App">
        <Expenses expense_id={""}/>
    </div>
  );
}

export default App;
