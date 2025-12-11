const TodoData = (props) => {
    const { name, age, data, todoList } = props;
    return (
        <>
            <div className="todo-data">
                <div>Learning React</div>
                <div>Watching Youtube</div>
                <div>My name is the {name}</div>
                <div>{age}</div>

                <div>{JSON.stringify(todoList)}</div>
            </div>
        </>
    )
}

export default TodoData;
