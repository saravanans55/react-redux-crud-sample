import React from "react";

function Employees(props){

    return (
        <div>
            <h1>{ props.emp_name }</h1>
            <h2>{ props.emp_id }</h2>
        </div>
    );
}

export default Employees;