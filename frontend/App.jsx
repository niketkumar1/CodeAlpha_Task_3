import { useState, useEffect } from "react"
import { io } from "socket.io-client"
import axios from "axios"

const socket = io("http://localhost:5000")

export default function App() {
    const [projects, setProjects] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
            .then(r => setProjects(r.data))
    }, [])

    const addTask = (id, title) => {
        axios.post(`/api/projects/${id}/tasks`, { title }, { headers: { Authorization: `Bearer ${token}` } })
    }

    useEffect(() => {
        socket.on("taskAdded", task => {
            setProjects(p => p.map(pr => ({ ...pr, tasks: [...pr.tasks, task] })))
        })
    }, [])

    return (
        <div className="p-6 grid grid-cols-3 gap-4">
            {projects.map(p =>
                <div key={p._id} className="bg-gray-100 rounded p-4">
                    <h2 className="font-bold">{p.name}</h2>
                    {p.tasks.map(t => <div key={t._id} className="p-2 bg-white rounded mt-2">{t.title}</div>)}
                    <button onClick={() => addTask(p._id, "New Task")} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">+ Task</button>
                </div>
            )}
        </div>
    )
}
