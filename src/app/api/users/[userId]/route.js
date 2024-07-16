import User from '../../../../model/users.js';
import connectDB from '../../../../helper/db.js'
import { responseJSONMessage, responseMessage } from '../../../../helper/responseMessage.js';

export async function GET(req, { params }) {
    const { userId } = params;
    try {
        await connectDB();
        const user = await User.findById(userId);
        return responseJSONMessage(user,'user read successfully',true,200)
    } catch (error) {
        console.log("error", error);
        return responseMessage('user not read successfully',false,400)
    }
}

export async function PUT(req, { params }) {
    const { userId } = params;
    const { name, email, password } = await req.json();
    try {
        const user = await User.findById(userId);
        user.name = name;
        user.email = email;
        user.password = password;
        await connectDB();
        const updatedUser = await user.save();
        return responseJSONMessage(updatedUser,'user updated successfully',true,200);
    } catch (error) {
        console.log("error", error);
        return responseMessage('user not updated successfully',false,400)
    }
}

export async function DELETE(req, { params }) {
    const { userId } = params;
    console.log("params", params, userId);
    try {
        await connectDB();
        await User.deleteOne({
            _id: userId
        })
        return responseMessage('deleted successfully',true,200)
    } catch (error) {
        console.log("error", error);
        return responseMessage('deleted not successfully',false,400)
    }
}
