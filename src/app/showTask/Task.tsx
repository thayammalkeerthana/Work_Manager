import React from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 styles

export const Task: React.FC<{ task: any; deleteShowTaskFromParent: (taskId: any) => Promise<any> }> = ({
  task,
  deleteShowTaskFromParent,
}) => {
  const getUserName = localStorage.getItem('userName');

  const deleteTask = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure you want to delete the status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteShowTaskFromParent(task._id);
      }
    });
  };

  return (
    <div
      className={`${
        task?.status === 'completed'
          ? 'bg-green-100'
          : task?.status === 'pending'
          ? 'bg-red-100'
          : 'bg-orange-100'
      } bg-gray-100 shadow-lg mt-2 rounded-md`}
    >
      <div className="p-5">
        <div className="flex justify-between mb-3 ">
          <h1 className="text-2xl font-semibold text-black">{task?.title}</h1>
          <RxCrossCircled className="w-8 h-8 text-red-500 cursor-pointer" onClick={(e) => deleteTask(e)} />
        </div>
        <p className="font-normal">{task?.content}</p>
        <div className="flex justify-between mt-3">
          <div>
            <span className="font-semibold"> Status: </span> {task?.status}
          </div>
          <div>
            <span className="font-semibold"> Author: </span> {getUserName}
          </div>
        </div>
      </div>
    </div>
  );
};
