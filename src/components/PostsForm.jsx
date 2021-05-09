import React from "react";
import Joi from "joi-browser";
import Form from "./Form";

class PostsForm extends Form {

    state = {
        data: {},
        errors: {},
        loaded: false
    };

    componentDidMount() {
        this.state.data = this.props.data;
        this.setState( {loaded: true} );
    }

    schema = {
        title: Joi.string().required().label("Title"),
        body: Joi.string().required().label("Body"),
        id: Joi.number()
    }

    doSubmit = () => {
        console.log("POSTSFORM: ", this.state.data)
        const data = this.state.data;
        data.ok = true;
        this.props.saveData(data);
    }

    doCancel = () => {
        const data = {ok: false};
        this.props.saveData(data);
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
           <div id="FormParent">
               <h1>Movie Form</h1>
               <form id="PostForm" onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderInput("body", "Body")}
                    {this.renderButton("Save")}
                    {this.renderCancelButton("Cancel")}
                </form>
           </div>
       );
    };
}

export default PostsForm;