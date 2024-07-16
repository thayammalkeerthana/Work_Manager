import { toast } from "react-toastify";
import { axiosInstance } from "../helper/axiosInstance";

export const SignUpFunc = async (data, router) => {
    console.log("calling", data);
    try {
        let result = await axiosInstance.post('api/users', data).then((response) => response.data);
        router.push('/login');
        toast.success('SignUp successfully!', {
            position: 'top-center'
        })
        return result;
    } catch (error) {
        console.log('error', error);
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : `Signup not successfully`, {
            position: 'top-center'
        })
    }
}

export const addTaskFunc = async (task) => {
    console.log("task calling", task);
    let result = await axiosInstance
        .post('/api/task', task)
        .then((response) => response.data);
    return result;
}

export const loginFunc = async (data, router) => {
    console.log("calling", data);
    try {
        let result = await axiosInstance.post('api/login', data).then((response) => response.data);
        console.log('loginresult', result);
        if (result) {
            router.push('/');
        }
        toast.success('Login successfully!', {
            position: 'top-center'
        })
        console.log("result", result);
        return result;
    } catch (error) {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : `Error in Login`, {
            position: 'top-center'
        })
    }
}

export const getCurrentUSer = async () => {
    console.log("currentUserCalling");
    try {
        let result = await axiosInstance.get('/api/current').then((response) => response?.data?.data);
        console.log("result",result);
        return result;
    } catch (error) {
        if (error?.response?.data?.message !== 'Access Denied !!') {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : `Error in current user loading`, {
                position: 'top-center'
            })
        }
        console.log('error*************', error);
    }
}

export const logOutUser = async (router) => {
    console.log("currentUserCalling");
    try {
        let result = await axiosInstance.post('/api/logout').then((response) => response?.data);
        console.log('result', result);
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        router.push('/login');
        
        return result;
    } catch (error) {
        console.log('error', error);
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : `Error in logOut User`, {
            position: 'top-center'
        })
    }
}

export const getTasksOfUser = async ( userId ) => {
    console.log("task userId calling", userId);
    let getUserId = localStorage.getItem('userId');
    console.log('getUserId',getUserId,userId);
    let result = await axiosInstance
        .get(`/api/users/${userId ? userId : getUserId}/tasks`)
        .then((response) => response.data.data);
        console.log("result",result.data);
    return result;
}

export const deleteTask = async ( taskId ) => {
    console.log("taskId calling", taskId);
    let result = await axiosInstance
        .delete(`/api/task/${taskId}`)
        .then((response) => response.data);
        console.log("result",result);
    return result;
}