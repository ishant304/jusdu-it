import { faChevronDown, faClipboardQuestion, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import logo from "./assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { use } from "react"
import Footer from "./Footer"

export default function Todolist() {

    const [task, setTask] = useState('')
    const [time, setTime] = useState('')
    const [tasks, setTasks] = useState([])
    const [textError, setTextError] = useState(false)
    const [timeError, setTimeError] = useState(false)
    const [openId, setOpenId] = useState(null)
    const [checked, setChecked] = useState()
    const [view, setView] = useState("active")
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

    useEffect(() => {
        checkExpiredTasks();

        const timer = setInterval(() => {
            checkExpiredTasks();
        }, 60000);

        return () => clearInterval(timer);
    }, []);


    function handleClick(e) {

        const now = new Date().getTime();
        const selected = new Date(time).getTime();

        if (task.trim() != '') {

            setTextError(false)

            if (selected >= now) {

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

        if (diff <= 0) {
            return { expired: true, text: "Deadline Passed" };
        };

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days > 0) return { expired: false, text: `${days} day(s) left` };
        if (hours > 0) return { expired: false, text: `${hours} hour(s) left` };
        return { expired: false, text: `${minutes} minute(s) left` };
    }

    function handleDelete(id) {
        setTasks(tasks.filter(task => task.id != id))
    }

    function handleCheck(e, id) {
        const value = e.target.checked;
        setChecked(value)
        console.log(value)

        const updateTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    status: value ? "complete" : "active"
                }
            }
            return task;
        })

        setTasks(updateTasks);

        const changedTask = updateTasks.find(task => task.id === id);
        console.log(changedTask.status);

    }

    function checkExpiredTasks() {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                const info = getTimeLeft(task.time);
                if (info.expired && task.status === "active") {
                    return { ...task, status: "expired" };
                }
                return task;
            })
        );
    }

    let filteredTasks = tasks;

    if (view === "active") {
        filteredTasks = tasks.filter(task => task.status === "active");
    }
    else if (view === "complete") {
        filteredTasks = tasks.filter(task => task.status === "complete");
    }
    else if (view === "expired") {
        filteredTasks = tasks.filter(task => task.status === "expired");
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
                        <h1 className="progress-number" style={{ color: 'rgba(82, 42, 146, 1)' }}>{tasks.filter(task=>task.status==='active').length}</h1>
                        <p className="progress-caption">Active task</p>
                    </div>
                    <div className="progress-info">
                        <h1 className="progress-number" style={{ color: 'rgba(78, 190, 97, 1)' }}>{tasks.filter(task=>task.status==='complete').length}</h1>
                        <p className="progress-caption">Completed task</p>
                    </div>
                    <div className="progress-info">
                        <h1 className="progress-number" style={{ color: 'rgba(158, 55, 55, 1)' }}>{tasks.filter(task=>task.status==='expired').length}</h1>
                        <p className="progress-caption">Expired task</p>
                    </div>
                </div>
                <div className="todo-list">

                    <div className="button-div">
                        <button className={view === "active" ? "tab-btn activated" : "tab-btn"} onClick={() => setView("active")}>Active</button>
                        <button className={view === "complete" ? "tab-btn activated" : "tab-btn"} onClick={() => setView("complete")}>Completed</button>
                        <button className={view === "expired" ? "tab-btn activated" : "tab-btn"} onClick={() => setView("expired")}>Expired</button>
                    </div>

                    <div className="todo-heading">
                        <p>Tasks</p>
                        <p className="deadline">Deadline</p>
                        <p>Actions</p>
                    </div>
                    {tasks.length === 0 ? (<div className="no-tasks">
                        <FontAwesomeIcon icon={faClipboardQuestion} />
                        <p>No tasks Yet</p>
                    </div>) : (



                        filteredTasks.map((unit) => (
                            <>
                                <div className={`todo-col ${unit.status}`}>
                                    <div className="todo-left">
                                        <input onChange={(e) => handleCheck(e, unit.id)} className="checkbox" type="checkbox" checked={unit.status=== "complete"} disabled={unit.status==="expired"} />
                                        <p>{unit.task}</p>
                                    </div>
                                    <div className="todo-middle">
                                        <p>{getTimeLeft(unit.time).text}</p>
                                    </div>
                                    <div className="todo-right">
                                        <button onClick={() => handleDelete(unit.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        <button onClick={() => setOpenId(openId === unit.id ? null : unit.id)}><FontAwesomeIcon icon={faChevronDown} /></button>
                                    </div>
                                </div>
                                {openId === unit.id && (
                                    <div className={`chevron-menu ${unit.status}`}>
                                        <p className="desktop-chevron">D-Day : {new Date(unit.time).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}</p>
                                        <p className="desktop-chevron">D-Time : {new Date(unit.time).toLocaleTimeString()}</p>

                                        <p className="mobile-chevron">Deadline : {getTimeLeft(unit.time).text}</p>
                                    </div>
                                )}
                            </>
                        ))
                    )
                    }
                </div>
            </div>
            <div class="seprator"></div>
            <Footer />

            
        </>
    )
}