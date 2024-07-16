"use client";
import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import { Task } from "./Task";
import { toast } from "react-toastify";

export const ShowTask = () => {
  const [taskData, setTaskData] = useState<any[]>([]);
  const context = useContext(UserContext);
  console.log("context",context);
  

  async function loadTask(userId: any) {
    console.log("userId",userId);
    
    try {
      const task = await getTasksOfUser(userId);
      setTaskData([...task].reverse());
      console.log("tasks=========", task);                                                
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (context) {
      loadTask((context as any)?.user?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log('taskData',taskData);

async function deleteShowTaskFromParent(taskId:any){
  try {
    let result = await deleteTask(taskId);
    let notDeletedData = taskData.filter(item=>item._id !== taskId);
    setTaskData(notDeletedData);
    toast.success('Delete task Successfully', {
      position: 'top-center'
  })
  return result;
  } catch (error) {
    console.log("error",error);
    toast.error('Delete unSuccessfully', {
      position: 'top-center'
  })
  }
}

  return (
    <div className="grid grid-cols-12 mt-3" >
      <div className="col-span-6 col-start-4" >
        <h1 className="text-3xl text-center font-bold mb-6" >your task ({taskData.length})</h1>
        {
            taskData.map( (task:any,inx:number) =>{
                return <Task task={task} key={inx} deleteShowTaskFromParent={deleteShowTaskFromParent} />
            })
        }
      </div>
    </div>
  );
};
