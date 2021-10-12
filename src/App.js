import React, { useEffect } from "react";
import Context from "./context";
import TodoList from "./components/todo-list/TodoList";
import Loader from "./components/loader/Loader";
import Modal from "./components/modal/Modal";

const AddTodo = React.lazy(() => import('./components/add-todo/AddTodo'))

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos);
                    setLoading(false);
                }, 2000);
            })
    }, [])

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
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
            }]
        ))
    }

  return (
      <Context.Provider value={{ removeTodo }}>
              <div className='wrapper'>
                  <h1>CRUD App</h1>
                  <Modal />
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
      </Context.Provider>
  );
}

export default App;
