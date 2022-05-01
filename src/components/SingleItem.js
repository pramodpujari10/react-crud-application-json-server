import React, { useEffect, useState } from "react";

let devEnv = process.env.NODE_ENV !== "production";
const apiUrl = devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

function SingleItem({ singleItemId,deleteItem }) {
  // console.log(singleItemId)

  const [item, setItem] = useState({});
  const handleDelete = (id) => {
    setItem({});
    return deleteItem(id);
  };
  
  const fetchSingleData = () => {
    fetch(`${apiUrl}/${singleItemId}`)
      .then((res) => {
        //console.log(res)
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  };
  useEffect(() => {
    fetchSingleData();
  }, []);

  return (
    <div  className="shadow-xl shadow-gray-200 my-8 mx-8  bg-slate-100 flex flex-col max-w-xs justify-center " style={{marginInline:"auto"}}>
      <h1 className=" text-3xl mx-4 my-4">User Details  </h1>
      {/* <h1>{item.id}</h1> */}
      
      <h1 className=" mx-8 my-2">Name: <span className="mx-2">{item.name}</span></h1>
      <h1 className=" mx-8 my-2">Description: <span className="mx-2">{item.description}</span></h1>
      <h1 className=" mx-8 my-2">Course: <span className="mx-2">{item.category}</span></h1>
      <h1 className=" mx-8 my-2">Status: <span className="mx-2">
        {/* {item.isActive} */}
     { item.isActive!=null?(item.isActive? "Active" : "Inactive"):""}</span>
      </h1>
      <button
        onClick={() => handleDelete(item.id)}
        // className="p-3 text-sm text-gray-700"
        className="bg-red-500 rounded-md border-solid border-2 border-red-600 mx-8 my-4"
      >
        Delete
      </button>
     
    </div>
  );
}

export default SingleItem;
