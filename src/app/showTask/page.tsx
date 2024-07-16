import React from "react";
import { Metadata } from "next";
import { ShowTask } from "./showTask";

export const metadata: Metadata = {
  title: "Show Task : work Manager",
};

const ShowTaskPage = () => {
  return (
    <>
      <ShowTask />
    </>
  );
};

export default ShowTaskPage;
