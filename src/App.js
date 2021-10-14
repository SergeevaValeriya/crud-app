import React, { useEffect } from "react";
import { useState } from "react";
import Context from "./context";
import TodoList from "./components/todo-list/TodoList";
import Loader from "./components/loader/Loader";
import Modal from "./components/modal/Modal";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./components/themes/Themes.js";

const AddTodo = React.lazy(() => import('./components/add-todo/AddTodo'));
const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [theme, setTheme] = React.useState('light');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos);
                    setLoading(false);
                }, 2000);
            })
    }, []);

    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
            }]
        ))
    }

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

  return (
      <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
          <GlobalStyles />
          <Context.Provider value={{ removeTodo }}>
              <StyledApp>
              <div className='wrapper'>
                  <h1>CRUD App</h1>
                  <Modal />
                  <button className="theme-toggler" onClick={() => themeToggler()}>Change Theme</button>
                  <React.Suspense fallback={<p>loading...</p>}>
                      <AddTodo onCreate={addTodo} />
                  </React.Suspense>
                  {loading && <Loader />}
                  {todos.length ?
                      <TodoList todos={todos} onToggle={toggleTodo} />
                      : loading ? null : (
                          <span>There is nothing here.</span>
                          )}
              </div>
              </StyledApp>
          </Context.Provider>
      </ThemeProvider>
  );
}

export default App;
