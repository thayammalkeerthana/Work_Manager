import {mongoose} from 'mongoose';

const config = {
    isConnected : 0
}

export default async function connectDB(){
    console.log('config.isConnected',config.isConnected);
    if(config.isConnected){
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$calling");
        return;
    }
try {
    const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{
        dbName:"work_manager"
    })
    console.log("connection",connection);
    console.log("DB is connected",connection.readyState);
    config.isConnected = connection.readyState;
} catch (error) {
    console.log("DB is not connected");
    console.log("error",error);
}
}