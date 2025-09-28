import mongoose from "mongoose"
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ["todo", "inprogress", "done"], default: "todo" },
    comments: [{ text: String, user: String }]
})
const schema = new mongoose.Schema({
    name: String,
    members: [String],
    tasks: [taskSchema]
})
export default mongoose.model("Project", schema)
