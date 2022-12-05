import logo from "./logo.svg";
import "./App.scss";
import Nav from "./Nav";
import Todo from "./Todos";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Covid from "./Covid";
import Blog from "./Blog";
import DetailBlog from "./DetailBlog";
import AddNewBlog from "./AddNewBlog";
import { CountDown, NewCountDown } from "./Countdown";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  let [name, setName] = useState("Nope");
  const [address, setAddress] = useState("");
  const [todos, setTodos] = useState([
    { id: "todo1", title: "Watching YouTube", type: "Nope" },
    { id: "todo2", title: "Doing homework", type: "Nope" },
    { id: "todo3", title: "Playing game", type: "Minh" },
  ]);

  //did mount
  // useEffect(() => {
  //   console.log("run use effect");
  // }, []);

  useEffect(() => {
    console.log("run use effect");
  }, [address]);

  useEffect(() => {
    console.log("run use effect todos");
  }, [todos]);

  const handleEventClick = (event) => {
    if (!address) {
      alert("empty input");
      return;
    }

    let newTodo = {
      id: Math.floor(Math.random() * 100000 + 1),
      title: address,
      type: "Nope",
    };
    setTodos([...todos, newTodo]);
    setAddress("");
  };

  const handleOnchangeInput = (event) => {
    setAddress(event.target.value);
  };

  const deleteDataTodo = (id) => {
    let currentTodos = todos;
    currentTodos = todos.filter((item) => item.id !== id);
    setTodos(currentTodos);
  };

  const onTimeUp = () => {
    //  alert("times up");
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav></Nav>
          <img src={logo} className="App-logo" alt="logo" />

          <h1>Hello world with React and {name}</h1>
        </header>

        <Switch>
          <Route path="/" exact>
            <Covid />
          </Route>

          <Route path="/timer">
            <CountDown onTimeUp={onTimeUp} />
            <span>---------------------------</span>
            <NewCountDown onTimeUp={onTimeUp} />
          </Route>

          <Route path="/todo">
            <Todo
              todos={todos}
              title={"All todo"}
              deleteDataTodo={deleteDataTodo}
            />

            <input
              type="text"
              value={address}
              onChange={(event) => handleOnchangeInput(event)}
            />

            <button
              type="button"
              onClick={(event) => {
                handleEventClick(event);
              }}
            >
              Click me
            </button>
          </Route>

          <Route path="/blog" exact>
            <Blog />
          </Route>

          <Route path="/blog/:id">
            <DetailBlog />
          </Route>

          <Route path="/add-new-blog">
            <AddNewBlog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
