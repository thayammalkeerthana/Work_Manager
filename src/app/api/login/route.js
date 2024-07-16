import User from '../../../model/users';
import connectDB from '../../../helper/db.js'
import { responseJSONMessage, responseMessage } from "../../../helper/responseMessage.js";
import { NextResponse } from 'next/server.js';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

connectDB()
export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("email, password", email, password);

        // 1.get User
        const user = await User.findOne({email:email});
        console.log("user",user);
        if(!user){
            throw new Error('User not found!!!');
        }

        //2.check Password
        const isPassword  =  bcrypt.compareSync(password,user.password);
        if(!isPassword){
            throw new Error('Password not matched!!!');
        }

        //3.generate token
        const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT_KEY);
        console.log("token",token);

        //4. create nextResponse -- cookie
        const response = NextResponse.json({
            user:user,
            message:"login success !!",
            success:true
        })    
        
        response.cookies.set("authToken",token,{
            expiresIn:'1d',
            httpOnly:true
        })

        return response;
    } catch (error) {
        console.log("error",error);
        return responseMessage(error.message,false,400);
    }
}