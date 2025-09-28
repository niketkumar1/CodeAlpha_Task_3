import express from "express"
import Project from "../models/Project.js"
import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.sendStatus(401)
    req.user = jwt.verify(token, "secret")
    next()
}

export default io => {
    const router = express.Router()

    router.post("/", auth, async (req, res) => {
        const project = await Project.create({ ...req.body, members: [req.user.id] })
        res.json(project)
    })

    router.get("/", auth, async (req, res) => {
        const projects = await Project.find({ members: req.user.id })
        res.json(projects)
    })

    router.post("/:id/tasks", auth, async (req, res) => {
        const project = await Project.findById(req.params.id)
        project.tasks.push(req.body)
        await project.save()
        io.to(req.params.id).emit("taskAdded", req.body)
        res.json(project)
    })

    router.post("/:id/tasks/:taskId/comments", auth, async (req, res) => {
        const project = await Project.findById(req.params.id)
        const task = project.tasks.id(req.params.taskId)
        task.comments.push({ text: req.body.text, user: req.user.id })
        await project.save()
        io.to(req.params.id).emit("commentAdded", { taskId: task._id, text: req.body.text })
        res.json(task)
    })

    return router
}
