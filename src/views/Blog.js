import useFetch from "../customize/fetch";
import "./Blog.scss";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import AddNewBlog from "./AddNewBlog";

const Blog = () => {
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: dataBlogs,
    isLoading,
    isError,
  } = useFetch("https://jsonplaceholder.typicode.com/posts", false);

  useEffect(() => {
    if (dataBlogs && dataBlogs.length > 0) {
      let newDataSimple = dataBlogs.slice(0, 9);
      setNewData(newDataSimple);
    }
  }, [dataBlogs]);

  const handleAddNew = (blog) => {
    setShow(false);
    let data = newData;
    data.unshift(blog);
    setNewData(data);
  };

  const deletePost = (id) => {
    let data = newData;
    data = data.filter((item) => item.id !== id);
    setNewData(data);
  };

  return (
    <>
      <Button variant="primary" className="my-3" onClick={handleShow}>
        + Add new blog
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewBlog handleAddNew={handleAddNew} />
        </Modal.Body>
      </Modal>

      <div className="blogs-container">
        {isLoading === false &&
          newData &&
          newData.length > 0 &&
          newData.map((item) => {
            return (
              <div className="single-blog" key={item.id}>
                <div className="title">
                  <span>{item.title}</span>
                  <span onClick={() => deletePost(item.id)}>X</span>
                </div>
                <div className="content">Content: {item.body}</div>
                <button>
                  <Link to={`/blog/${item.id}`}>View Detail</Link>
                </button>
              </div>
            );
          })}

        {isLoading === true && (
          <div style={{ textAlign: "center !important", width: "100%" }}>
            Loading data...
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
