import { useState } from "react";

const TodoNew = (props) => {

    const { addNewTodo } = props;
    //useState hook
    // const valueInput = "";
    const [valueInput, setValueInput] = useState("eric")

    // addNewTodo("tien");

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }


    return (
        <>
            <div className='todo-new'>
                <input type="text"
                    onChange={(event) => handleOnChange(event.target.value)}
                    value={valueInput}
                />
                <button onClick={handleClick}>Add</button>
                <div>My Text is input = {valueInput}  </div>
            </div>
        </>
    )
}

export default TodoNew;