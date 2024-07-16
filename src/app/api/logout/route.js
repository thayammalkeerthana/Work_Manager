import { responseMessage } from "../../../helper/responseMessage";

export async function POST (req) {
    const response =  responseMessage('Logged Out !!',true,200);
    response.cookies.set('authToken','',{
        expires:new Date(0)
    });
    return response;
}