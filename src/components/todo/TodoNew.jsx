import { useState } from "react";

const TodoNew = (props) => {

    const { addNewTodo } = props;
    //useState hook
    // const valueInput = "";
    const [valueInput, setValueInput] = useState("eric")

    // addNewTodo("tien");

    const handleClick = () => {
        console.log(">>>value Input", valueInput)
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }


    return (
        <>
            <div className='todo-new'>
                <input type="text"
                    onChange={(event) => handleOnChange(event.target.value)}
                />
                <button onClick={handleClick}>Add</button>
                <div>My Text is input = {valueInput}  </div>
            </div>
        </>
    )
}

export default TodoNew;