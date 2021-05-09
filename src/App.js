import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import PostsForm from "./components/PostsForm";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
    initData: {},
    showDialog: false,
    operation: "",
  };

  async componentDidMount() {
    const response = await http.get(config.apiEndpoint);
    const { data: posts } = response;
    this.setState({ posts });
  }

  handleAdd = () => {
    this.setState({
      showDialog: true,
      initData: { title: "", body: "" },
      operation: "add",
    });
  };

  handleUpdate = (post) => {
    this.setState({
      showDialog: true,
      initData: { title: post.title, body: post.body, id: post.id },
      operation: "update",
    });
  };

  saveData = async (paramData) => {
    console.log(paramData);
    if (!paramData.ok) {
      this.setState({ showDialog: false });
      return;
    }

    try {
      if (this.state.operation === "add") {
        delete paramData.ok;
        const post = { ...paramData, id: new Date().getTime() };
        await http.post(config.apiEndpoint, paramData);
        const posts = [post, ...this.state.posts];
        this.setState({ showDialog: false, posts });
      } else if (this.state.operation === "update") {
        console.log(paramData);
        delete paramData.ok;
        const data = { ...paramData };
        await http.put(config.apiEndpoint + "/" + paramData.id, paramData);
        const posts = [...this.state.posts];
        console.log(data.id);
        const index = posts.findIndex((post) => post.id === data.id);
        posts[index] = data;
        console.log(index);
        this.setState({ showDialog: false, posts });
      }
    } catch (err) {
      console.log("ERROR", err);
      this.setState({ showDialog: false });
    }
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete("x" + config.apiEndpoint + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      this.setState({ posts: originalPosts });
    }

    //const posts = [...this.state.posts];
    //const index = posts.indexOf(post);
    //posts.splice(index, 1);
    //this.setState({ posts });
  };

  render() {
    console.log(this.state.posts);
    return (
      <React.Fragment>
        {<ToastContainer />}
        {this.state.showDialog && (
          <PostsForm data={this.state.initData} saveData={this.saveData} />
        )}
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
