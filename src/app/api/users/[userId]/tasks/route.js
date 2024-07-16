
import { responseJSONMessage, responseMessage } from '../../../../../helper/responseMessage.js';
import Tasks from '../../../../../model/task.js'
import connectDB from '../../../../../helper/db.js';

// /api/users/[userId]/tasks
export async function GET(req, { params }) {
    const { userId } = params;
    console.log("userId==========",userId);
    try {
        await connectDB();
        const getSingleUsertask = await Tasks.find({userId:userId});
        return responseJSONMessage(getSingleUsertask, 'user task read successfully', true, 200)
    } catch (error) {
        console.log("error", error);
        return responseMessage('user task not read successfully', false, 400)
    }
}