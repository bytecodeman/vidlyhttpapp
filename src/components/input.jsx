import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {
    let input;
    if (type === "select") {
        input = <select name={name} id={name} {...rest} className="form-control">
                <option value=""></option>
                {rest.options.map((option, index) => 
                    <option key={"option" + index} value={"" + option._id + ""}>{option.name}</option>)}
                </select>
    }
    else {
        input = <input 
                    {...rest}
                    type={type}
                    name={name}
                    className="form-control" 
                    id={name}
                />
    }
   return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {input}
            {error && <div className="alert alert-danger">{error}</div> }
        </div>
    );
};

export default Input;
