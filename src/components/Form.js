import React, { useState, useEffect } from "react";
import App1 from "./App1";
import { useNavigate } from "react-router-dom";
import "./form.css";

function Form({
  handleSubmit,
  edit,
  handleCancel,
  names,
  setNames,
  descriptions,
  setDescriptions,
  currentDrop,
  setCurrentDrop,
  checks,
  setChecks,
}) {
  // const [formValue,setFormValue]=useState({
  //   names:"",
  //   descriptions:"",
  //   currentDrop:"volvo",
  //   checks:"false"
  // })
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setFormValue({ ...formValue, [name]: value });
  //   console.log(formValue);
  // };
  let navigate = useNavigate();
  const changeDrop = (newDrop) => {
    setCurrentDrop(newDrop);
  };

  const dropDownArray = ["Arts", "Commerce", "Science", "Diploma"];

  return (
    <div
      // className="shadow-xl shadow-gray-200 my-8 mx-8 bg-slate-100 flex flex-col justify-center"
      className=" mx-8 flex flex-col justify-center max-w-md"
      style={{ margin: "auto" }}
    >
      <div className="flex flex-row justify-around items-center content-center my-10">
        <h1 className="text-4xl ">Form </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-300 max-w-xs rounded-md border-solid border-2 border-cyan-300 p-1"
        >
          Back to Home
        </button>
      </div>
      <form className="shadow-xl shadow-gray-300 my-5 mx-8 bg-slate-100 max-w-md flex flex-col justify-items-center justify-center">
        <label className="mx-6 my-1" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          // value={formValue.names}
          // onChange={(handleChange)}
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="border-solid border-black border	rounded ml-4 mr-12 mb-4 p-1"
        />
        <label className="mx-6 my-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="2"
          cols="20"
          // value={formValue.descriptions}
          // onChange={handleChange}
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
          className="border-solid border-black border	rounded ml-4 mr-12 mb-4 p-1"
        />

        <label className="mx-4 my-1" for="course">
          Choose a Course:
        </label>

        <select
          name="course"
          id="course"
          className="ml-4 mb-4 p-1 w-40 border-solid border border-black-400 rounded-md "
          
          // onChange={handleChange}
          // value={formValue.currentDrop}
          onChange={(e) => changeDrop(e.target.value)}
          value={currentDrop}
        >
          {dropDownArray.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          {/* <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option> */}
        </select>

        <label
          className="switch my-1 "
          // onClick={toggleHandler}
        >
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            // value={formValue.checks} onChange={handleChange}
            checked={checks}
            onChange={(e) => setChecks(!checks)}
          />
          <span className="slider round "></span>
        </label>

        <button
          // onClick={()=>callAllFunction()}
          onClick={handleSubmit}
          className="border-solid border-2 border-cyan-300 rounded mx-4 mt-8 mb-8 p-1 w-40 bg-cyan-300"
        >
          {edit ? "Edit" : "Add"}
        </button>

        {/* <button
          onClick={handleCancel}
          
          className="border-solid border-2 border-indigo-600 rounded mx-4 my-4">
          Reset
        </button> */}
      </form>
    </div>
  );
}

export default Form;
