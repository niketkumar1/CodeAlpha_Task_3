import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })
        localStorage.setItem("token", res.data.token)
        navigate("/dashboard")
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <input className="border p-2 w-full mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="border p-2 w-full mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
        </div>
    )
}
