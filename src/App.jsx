import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("");
    const [showFinished, setShowFinished] = useState(true);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleEdit = (id) => {
        let t = todos.find(i => i.id === id);
        setTodo(t.todo);
        setPriority(t.priority);
        setTodos(todos.filter(item => item.id !== id));
    };

    const handleDelete = (id) => {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleAdd = () => {
        if (!todo || !priority) return;
        setTodos([...todos, { id: uuidv4(), todo, priority, isCompleted: false }]);
        setTodo("");
        setPriority("");
    };

    const handleChange = (e) => setTodo(e.target.value);
    const handlePriorityChange = (e) => setPriority(e.target.value);

    const handleCheckbox = (e) => {
        let id = e.target.name;
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
    };

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTodos = [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return (
        <>
            <Navbar />
            {!isAuthenticated ? (
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold">Please log in to access your todos.</h2>
                </div>
            ) : (
                <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
                    <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
                    <div className="addtodo my-5 flex flex-col gap-4">
                        <h2 className='text-2xl font-bold'>Add a ToDo</h2>
                        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' placeholder="Enter your task..." />
                        <div className="priority flex gap-4">
                            <label><input type="radio" name="priority" value="High" onChange={handlePriorityChange} checked={priority === "High"} /> High</label>
                            <label><input type="radio" name="priority" value="Medium" onChange={handlePriorityChange} checked={priority === "Medium"} /> Medium</label>
                            <label><input type="radio" name="priority" value="Low" onChange={handlePriorityChange} checked={priority === "Low"} /> Low</label>
                        </div>
                        <button onClick={handleAdd} disabled={!todo || !priority} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white'>Save</button>
                    </div>
                    <input className='my-4' id='show' onChange={() => setShowFinished(!showFinished)} type="checkbox" checked={showFinished} />
                    <label className='mx-2' htmlFor="show">Show Finished</label>
                    <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
                    <h2 className='text-lg font-bold'>Your Todos</h2>
                    <div className="todos">
                        {sortedTodos.length === 0 && <div className='m-5'>No todos to display</div>}
                        {sortedTodos.map(item => (
                            (showFinished || !item.isCompleted) && (
                                <div key={item.id} className="todo flex my-3 justify-between">
                                    <div className='flex gap-5'>
                                        <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                                        <div className={item.isCompleted ? "line-through" : ""}>{item.todo} <span className='text-xs text-gray-600'>({item.priority})</span></div>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} className='bg-red-600 p-2 text-white rounded'>Delete</button>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
export default App;