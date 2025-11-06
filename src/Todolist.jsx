import { faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import logo from "./assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"

export default function Todolist() {

    const [task, setTask] = useState('')
    const [time, setTime] = useState('')
    const [tasks, setTasks] = useState([])
    const [textError, setTextError] = useState(false)
    const [timeError, setTimeError] = useState(false)
    const [open,setOpen] = useState(false)
    const inputRef = useRef(null);

    useEffect(() => {
        let storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks && storedTasks.length > 0) {
            setTasks(storedTasks);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])


    function handleClick(e) {

        const now = new Date().getTime();
        const selected = new Date(time).getTime();

        console.log(now, selected);

        if (task.trim() != '') {

            setTextError(false)

            if (selected >= now) {

                console.log("yes")

                const newTask = {
                    id: Date.now(),
                    task: task,
                    time: time,
                    status: "active"
                }

                setTasks([...tasks, newTask]);

                setTask("");
                setTime('');

                setTimeError(false)
            }
            else {
                setTimeError(true);
            }
        }
        else {
            setTextError(true)
            inputRef.current.focus();
        }
    }

    function getTimeLeft(deadline) {
        const now = new Date().getTime();
        const target = new Date(deadline).getTime();
        const diff = target - now;

        if (diff <= 0) return "Deadline Passed";

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days > 0) return `${days} day(s) left`;
        if (hours > 0) return `${hours} hour(s) left`;
        return `${minutes} minute(s) left`;
    }

    function handleDelete(id){
        setTasks(tasks.filter(task=>task.id != id))
    }

    return (
        <>
            <div className="header">
                <img className="logo" src={logo} alt="logo" />
                <p className="logo-name">Jusdu It</p>
                <h1 className="todo-list-heading">My Tasks</h1>
            </div>
            <div className="todo-content">
                <div className="add-task-card">
                    <div className="form-group">
                        <label htmlFor="taskInput">Task</label>
                        <input value={task} onChange={(e) => setTask(e.target.value)} ref={inputRef} type="text" placeholder="What needs to be done?" id="taskInput" />
                        {textError && (<p className="error"><FontAwesomeIcon icon={faCircleXmark} />Fill the task field</p>)}


                    </div>
                    <div className="form-group">
                        <label htmlFor="deadlineInput">Deadline</label>
                        <input value={time} onChange={(e) => setTime(e.target.value)} type="datetime-local" id="deadlineInput" placeholder="Enter the deadline" />
                        {timeError && (<p className="error"><FontAwesomeIcon icon={faCircleXmark} />Enter valid date and time</p>)}
                    </div>

                    <button className="add-btn" onClick={(e) => handleClick()}>
                        <FontAwesomeIcon icon={faPlus} /> Add Task
                    </button>
                </div>
                <div className="progress-div">
                    <div className="progress-info">
                        <h1 className="progress-number" style={{ color: 'rgba(82, 42, 146, 1)' }}>0</h1>
                        <p className="progress-caption">Active task</p>
                    </div>
                    <div className="progress-info">
                        <h1 className="progress-number" style={{ color: 'rgba(78, 190, 97, 1)' }}>0</h1>
                        <p className="progress-caption">Completed task</p>
                    </div>
                    <div className="progress-info">
                        <h1 className="progress-number" style={{ color: 'rgba(158, 55, 55, 1)' }}>0</h1>
                        <p className="progress-caption">Missed task task</p>
                    </div>
                </div>
                <div className="todo-list">
                    <div className="todo-heading">
                        <p>Tasks</p>
                        <p className="deadline">Deadline</p>
                        <p>Actions</p>
                    </div>
                    {   tasks.length === 0 ? <p>No record</p> : (
                        tasks.map((unit) => (
                            <>
                            <div className="todo-col">
                                <div className="todo-left">
                                    <input className="checkbox" type="checkbox" />
                                    <p>{unit.task}</p>
                                </div>
                                <div className="todo-middle">
                                    <p>{getTimeLeft(unit.time)}</p>
                                </div>
                                <div className="todo-right">
                                    <button onClick={()=>handleDelete(unit.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    <button onClick={()=>setOpen(!open)}><FontAwesomeIcon icon={faChevronDown} /></button>
                                </div>
                            </div>
                            { open && <p>hello</p> }
                            </>
                        )))
                    }
                </div>
            </div>



        </>
    )
}