import connectDB from '../../../../helper/db.js'
import { responseJSONMessage, responseMessage } from '../../../../helper/responseMessage.js';
import Tasks from '../../../../model/task.js';


export async function GET(req, { params }) {
    const { taskId } = params;
    console.log("taskId",taskId);
    try {
        await connectDB();
        const getSingleTask = await Tasks.findById(taskId);
        return responseJSONMessage(getSingleTask,'task read successfully',true,200)
    } catch (error) {
        console.log("error", error);
        return responseMessage('user not read successfully',false,400)
    }
}

export async function PUT(req, { params }) {
    const { taskId } = params;
    const { title, content, addedDate,status } = await req.json();
    try {
        const task = await Tasks.findById(taskId);
        task.title = title;
        task.content = content;
        task.addedDate = addedDate;
        task.status= status;
        await connectDB();
        const updatedTask = await task.save();
        return responseJSONMessage(updatedTask,'task updated successfully',true,200);
    } catch (error) {
        console.log("error", error);
        return responseMessage('task not updated successfully',false,400)
    }
}

export async function DELETE(req, { params }) {
    const { taskId } = params;
    console.log("params", params, taskId);
    try {
        await connectDB();
        await Tasks.deleteOne({
            _id: taskId
        })
        return responseMessage('deleted successfully',true,200)
    } catch (error) {
        console.log("error", error);
        return responseMessage('deleted not successfully',false,400)
    }
}
