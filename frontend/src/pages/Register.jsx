import { useEffect, useState } from "react"
import axios from "axios"

export default function Dashboard() {
    const [projects, setProjects] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("http://localhost:5000/api/projects", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setProjects(res.data))
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Projects</h1>
            <div className="grid grid-cols-3 gap-4">
                {projects.map(p => (
                    <div key={p._id} className="p-4 bg-white shadow rounded">
                        <h2 className="font-semibold">{p.name}</h2>
                        {p.tasks.map(t => (
                            <div key={t._id} className="mt-2 p-2 bg-gray-100 rounded">{t.title}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
