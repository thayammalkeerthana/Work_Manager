import { NextResponse } from "next/server"

export const responseMessage=(message,status,statusCode)=>{
    return NextResponse.json(
        {
            message:message,
            status:status
        },
        {
            status:statusCode
        }
    )
}

export const responseJSONMessage=(data,message,status,statusCode)=>{
    return NextResponse.json(
        {
            data: data,
            message: message,
            status: status
        },
        {
            status: statusCode // Changed from statusCode to status
        }
    )
}