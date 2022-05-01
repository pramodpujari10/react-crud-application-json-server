import React, {useState}  from "react";
import { useNavigate, Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import Pagination from "./Pagination";
import "./app1.css"

function App1({
  removeAll,
  handleFilter,
  filterReset,
  handleSearch,
  value,
  setValue,
  records,
  setRecords,
  addItem,
  updateItem,
  deleteItem,
  singleItem,
  loading
}) {
  let navigate = useNavigate();
const [currenPage,setCurrentPage]=useState(1);
const [postsPerPage,setPostsPerPage]=useState(4)

const indexOfLastRecord=currenPage*postsPerPage;
const indexOfFirstRecord= indexOfLastRecord -postsPerPage;
const currentPost=records.slice(indexOfFirstRecord,indexOfLastRecord)
console.log(currentPost)

  const [statusFilterValue, setStatusFilterValue] = useState("All");

  const handleDelete = (id) => {
    return deleteItem(id);
  };
  const handleUpdate = (id) => {
    return updateItem(id);
  };
  const handleSingleItem = (id) => {
    //  console.log(id)
    // navigate("/singleItem")
    return singleItem(id);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      let temp = records.map((item) => {
        return { ...item, isChecked: checked };
      });
      setRecords(temp);
    } else {
      let temp = records.map((item) =>
        item.id === name ? { ...item, isChecked: checked } : item
      );
      setRecords(temp);
    }
  };
  const handleStatusFilter = (selectedStatus) => {
    setStatusFilterValue(selectedStatus);
    handleFilter(selectedStatus);
  };
  console.log(records)

  const paginate=(pageNumbers)=>{
    setCurrentPage(pageNumbers)

  }
  return (
    <div
      //  onClick={()=>handleSingleItem(id)}
      className="my-8 mx-3 flex flex-col justify-items-center justify-center md:mx-8"
      //  key={id}
      //  shadow-xl shadow-purple-300
    >
      <div className="loader"  style={{ display: loading ? "block" : "none"}}></div>
    {/* <div id="spinner" style={{ display: loading ? "block" : "none"}}>
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600"
          role="status"
        >
          <span className="visually-hidden">.</span>
        </div>
      </div>
    </div> */}
      <h1 className="text-left text-3xl mx-2 my-3 ">User List</h1>
      <div className="flex flex-col justify-between mx-3 my-3 px-3 py-3 w-full md:flex-row justify-between mx-3 my-3 px-3 py-3 w-full">
        <div className="mx-1 my-1">
          <button
            onClick={() => addItem()}
            className="bg-cyan-300 rounded-md border-solid border-2 border-cyan-300 px-4 py-1 mx-1 my-1 "
          >
            Add
          </button>

          <button
            onClick={() => removeAll()}
            className="bg-red-500 rounded-md border-solid border border-red-600 px-4 py-1 mx-1 my-1"
            hidden={
              records.filter((item) => item?.isChecked === true).length > 0
                ? ""
                : "hidden"
            }
          >
            Delete Selected
          </button>
        </div>
        <div className="my-3 mx-3">
          <label className="mr-4">Filter By Status</label>
          <select className="border-solid border border-blue-600 rounded-md "
            name="statusFilter"
            id="statusFilter"
            onChange={(e) => handleStatusFilter(e.target.value)}
            value={statusFilterValue}
          >
            <option value="all">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {/* <h5>Filter By Status</h5>
      <button
        onClick={() => handleFilter(true)}
        className="bg-indigo-400 rounded-md border-solid border-2 border-indigo-400  px-4 py-1 mx-1 my-1"
      >
        
        Active
      </button>
      <button
        onClick={() => handleFilter(false)}
        className="bg-indigo-400 rounded-md border-solid border-2 border-indigo-400  px-4 py-1 mx-1 my-1"
      >
        Inactive
      </button>
      <button
        onClick={() => filterReset()}
        className="bg-red-500 rounded-md border-solid border-2 border-red-600  px-4 py-1 mx-1 my-1"
      >
        Reset
      </button> */}
        </div>
        <form className="  py-1 mx-1 my-1">
          <input
            className="border border-blue-600 rounded-lg  mx-1 my-1"
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-cyan-300 w-auto rounded-lg mx-1 px-1 py-1"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="overflow-x-scroll">
        <table className=" w-full ">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                <input
                  type="checkbox"
                  name="checkAll"
                  checked={
                    records.filter((item) => item?.isChecked !== true).length <
                    1
                  }
                  onChange={handleCheckboxChange}
                />
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Description
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Category
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                isActive
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
            </tr>
          </thead>
          <tbody>
            {/* <App1 records={records} removeItem={removeItem} /> */}
            {currentPost.map((item) => {
              const { id, name, description, category, isActive } = item;
              return (
                <tr className="bg-green-50 border-solid border-black" key={id}>
                  {/* <div key={id}> */}
                  <td className="p-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name={id}
                      checked={item?.isChecked || false}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-700 cursor-pointer">
                    <h4 onClick={() => handleSingleItem(id)}>{name}</h4>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{description}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <h4>{category}</h4>
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    <h4>{isActive ? "Active" : "Inactive"}</h4>
                  </td>

                  {/* <div className="flex flex-row justify-items-center justify-center"> */}
                  <td>
                    <button
                      onClick={() => handleDelete(id)}
                      className="p-3 text-sm text-red-700"
                      // className="bg-indigo-400 rounded-md border-solid border-2 border-indigo-400 m-4 w-16"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdate(id)}
                      className="p-3 text-sm text-gray-700"
                      // className="bg-indigo-400 rounded-md border-solid border-2 border-indigo-400 m-4 w-16"
                    >
                      Edit
                    </button>
                  </td>
                  {/* </div> */}
                  {/* </div> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        <div>
        <Pagination postsPerPage={postsPerPage} totalPosts={records.length} paginate={paginate}  currenPage={currenPage}    />
        </div>
    </div>
  );
}

export default App1;
