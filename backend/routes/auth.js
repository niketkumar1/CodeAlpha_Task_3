import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash })
    res.json(user)
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ error: "Invalid credentials" })
    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, user })
})

export default router
