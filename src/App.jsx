import './components/todo/todo.css'
import reactLogo from './assets/react.svg'
import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';

const App = () => {

    const bmTien = "bm_tien";
    const age = 25;
    const data = {
        address: "hue",
        country: "vietnam"
    }

    const addNewTodo = (name) => {
        alert(`call me ${name}`)
    }


    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew
                    addNewTodo={addNewTodo}
                />
                <TodoData
                    name={bmTien}
                    age={age}
                    data={data}
                />
                <div className='todo-img'>
                    <img src={reactLogo} alt="logo" className='logo' />
                </div>
            </div>
        </>
    );
}

export default App;
