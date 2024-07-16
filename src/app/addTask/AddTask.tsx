"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from 'react-toastify';
import addTaskImg from "../../../public/add_task.svg";
import {addTaskFunc} from '../../services/taskService'
import { useRouter } from "next/navigation";


export default function AddTask() {
  const [addTask, setAddTask] = useState({title: '',content: '',status: 'Status',userId: '6661991eaad8f6d9a6814429'});
  const [errors, setErrors] = useState({ title: '', content: '', status: '' });
  const router = useRouter();

  const validate = () => {
    let titleError = '';
    let contentError = '';
    let statusError = '';

    if (!addTask.title.trim()) {
      titleError = 'Title is required';
    }

    if (!addTask.content.trim()) {
      contentError = 'Content is required';
    }

    if (addTask.status === 'Status') {
      statusError = 'Please select a valid status';
    }

    if (titleError || contentError || statusError) {
      setErrors({ title: titleError, content: contentError, status: statusError });
      return false;
    }

    setErrors({ title: '', content: '', status: '' });
    return true;
  };

  const handleAddTask = async(event: any) => {
    event.preventDefault();
    console.log('handleAddTask calling');

    if (validate()) {
      console.log('task:', addTask);
      // Proceed with submitting the form or other actions
      try {
        await addTaskFunc(addTask);
        toast.success('your task was added successfully!',{
          position:'top-center'
        })
        router.push('/')

      } catch (error) {
        toast.error('task not added successfully',{
          position:'top-center'
        })
        console.log("error error error",error)
      }
    }
  };

  return (
<div className="flex justify-center items-center mt-4 px-4 sm:px-0">
    <div className="border w-full sm:w-2/3 lg:w-1/2 p-5 hover:shadow-lg bg-gray-50 cursor-pointer">
        <div className="flex justify-center items-center my-5">
            <Image src={addTaskImg} className="w-1/3" alt="add_Task" />
        </div>
        <h1 className="text-3xl sm:text-xl text-center">Add your task here !!</h1>
        <form action="#!">
            {/* Task title */}
            <div className="mt-4">
                <label htmlFor="task_title" className="block text-sm font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
                    id="task_title"
                    value={addTask.title}
                    onChange={(e) => setAddTask({ ...addTask, title: e.target.value })}
                />
                {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
            </div>
            {/* Task content */}
            <div className="mt-4">
                <label htmlFor="task_content" className="block text-sm font-medium mb-2">
                    Content
                </label>
                <textarea
                    rows={5}
                    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
                    id="task_content"
                    value={addTask.content}
                    onChange={(e) => setAddTask({ ...addTask, content: e.target.value })}
                />
                {errors.content && <span className="text-red-600 text-sm">{errors.content}</span>}
            </div>
            {/* Task status */}
            <div className="mt-4">
                <label htmlFor="task_status" className="block text-sm font-medium mb-2">
                    Status
                </label>
                <select
                    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
                    id="task_status"
                    value={addTask.status}
                    onChange={(e) => setAddTask({ ...addTask, status: e.target.value })}
                >
                    <option value="Status" disabled>
                        --- select Status ---
                    </option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                {errors.status && <span className="text-red-600 text-sm">{errors.status}</span>}
            </div>
            {/* Button action */}
            <div className="mt-4 flex justify-center space-x-3">
                <button
                    className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white"
                    onClick={(e) => handleAddTask(e)}
                >
                    Add Todo
                </button>
                <button
                    className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white"
                    onClick={() => setAddTask({ title: '', content: '', status: 'Status', userId: '' })}
                >
                    Clear
                </button>
            </div>
        </form>
    </div>
    
</div>
  );
}

