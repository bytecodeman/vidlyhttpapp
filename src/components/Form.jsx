import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {

    validate = () => {
        const options = { abortEarly: false };
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) {
            return null;
        }
        
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({id, value}) => {
        const obj = { [id]: value };
        const schema = { [id]: this.schema[id] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState( {errors: errors || {}} );
        if (errors) {
            return
        }

        this.doSubmit();
   }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) {
            errors[input.id] = errorMessage;
        }
        else {
            delete errors[input.id];
        }

        const data = { ...this.state.data };
        data[input.id] = input.value;
        this.setState( { data, errors });
    };

    renderButton = (label) => {
        return <button disabled={this.validate()} type="submit" className="btn btn-primary">
            {label}
        </button>;
    }

    renderCancelButton = (label) => {
        return <button onClick={this.doCancel} type="button" className="btn btn-secondary">
            {label}
        </button>;        
    }

    renderInput = (name, label, type = "text", options) => {
        const { data, errors } = this.state;
        return <Input 
            value={data[name]}
            onChange={this.handleChange}
            label={label}
            name={name}
            type={type}
            options={options}
            error={errors[name]}
            />
    }
}

export default Form;