import connectDB from '../../../helper/db.js'
import { responseJSONMessage, responseMessage } from "../../../helper/responseMessage.js";
import Tasks from '../../../model/task.js';
const jwt = require('jsonwebtoken');

export async function POST(req) {

    try {
        const { title, content, addedDate,status } = await req.json();
        const authToken = req.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        console.log("title, content, addedDate,status,userId",title, content, addedDate,status,data._id);
        await connectDB();
        const task = new Tasks({
            title,
            content,
            addedDate,
            status,
            userId : data._id
        });
        await task.save();
        return responseJSONMessage(task,"task Created Successfully",true,200)
    } catch (error) {
        console.log("failed to create task",error);
        return responseMessage('failed to create task',false,400);
    }
}

export async function GET (req){
    let tasks = [];
    try {
        await connectDB();
        tasks = await Tasks.find();
        return responseJSONMessage(tasks,"tasks fetch successfully",true,200)
    } catch (error) {
        console.log("failed to fetch task",error);
        return responseMessage('failed to fetch task',false,400);
    }
}

