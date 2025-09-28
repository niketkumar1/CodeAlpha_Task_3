import express from "express"
import http from "http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import projectRoutes from "./routes/project.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

mongoose.connect("mongodb+srv://lemi:lemi@projectmanagement.3tkngcd.mongodb.net/?retryWrites=true&w=majority&appName=projectmanagement")

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes(io))

io.on("connection", socket => {
    socket.on("joinProject", projectId => socket.join(projectId))
})

server.listen(5000)
