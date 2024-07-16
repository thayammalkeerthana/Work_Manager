import React from 'react';
import { Metadata } from "next";
import AddTask from './AddTask';

export const metadata:Metadata = {
  title: "Add Task: work Manager",
};

const AddTaskPage = ( ) => {
    return (
        <>
        <AddTask/>
        </>
    )
}

export default AddTaskPage;