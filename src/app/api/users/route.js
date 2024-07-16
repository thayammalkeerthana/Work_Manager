import User from '../../../model/users.js';
import connectDB from '../../../helper/db.js'
import { responseJSONMessage, responseMessage } from "../../../helper/responseMessage.js";

const bcrypt = require('bcrypt');

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        console.log("name, email, password",name, email, password);
        await connectDB();
        const user = new User({
            name,
            email,
            password
        });
        user.password = bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT));
        console.log('uer.password',user.password);
        await user.save();
        return responseJSONMessage(user,"user Created Successfully",true,201)
    } catch (error) {
        console.log("failed to create user",error,error?.errorResponse?.errmsg.includes('duplicate'));
        return responseMessage(`${error?.errorResponse?.errmsg.includes('duplicate')?`Already User Exist`: `Failed to create User`}`,false,400);
    }
}

export async function GET (req){
    let users = [];
    try {
        await connectDB();
        users = await User.find();
        return responseJSONMessage(users,"user fetch successfully",true,200)
    } catch (error) {
        console.log("failed to fetch user",error);
        return responseMessage('failed to fetch user',false,400);
    }
}

