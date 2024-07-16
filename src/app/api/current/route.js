import connectDB from "@/helper/db";
import { responseJSONMessage, responseMessage } from "../../../helper/responseMessage";
import User from "@/model/users";



const jwt = require('jsonwebtoken');
export async function GET(req) {
    const authToken = req.cookies.get('authToken')?.value;
    const data = jwt.verify(authToken, process.env.JWT_KEY);
    console.log("data", data);
    try {
        await connectDB();
        const user = await User.findById(data._id).select('-password');
        console.log('user', user);
        return responseJSONMessage(user, "token fetch successfully", true, 200)
    } catch (error) {
        console.log("failed to fetch current user==========", error);
        return responseMessage('failed to fetch current user', false, 400);
    }
}