import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";

const App = () => {
    const [todoList, setTodo] = useState([]);

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name: name,
        };
        setTodo([...todoList, newTodo]);
    };

    const deleteTodo = (id) => {
        const newTodo = todoList.filter((item) => item.id !== id);
        setTodo(newTodo);
    };

    const randomIntFromInterval = (min, max) => {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew addNewTodo={addNewTodo} />

                {todoList.length > 0 ? (
                    <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                ) : (
                    <div className="todo-img">
                        <img src={reactLogo} alt="logo" className="logo" />
                    </div>
                )}

                {/* {todoList.length > 0 &&
                    <TodoData
                        todoList={todoList}
                    />
                }

                {todoList.length === 0 &&
                    <div className='todo-img'>
                        <img src={reactLogo} alt="logo" className='logo' />
                    </div>} */}
            </div>
        </>
    );
};

export default App;
