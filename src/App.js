import React, { useState, useEffect } from "react";
import {Routes,Route,useNavigate} from "react-router-dom"
import Form  from "./components/Form";
import App1 from './components/App1'
import SingleItem from "./components/SingleItem";

  let devEnv = process.env.NODE_ENV !== "production";
  const apiUrl = devEnv ? process.env.REACT_APP_DEV_URL :  process.env.REACT_APP_PROD_URL;

function App() {
  // const [formValue,setFormValue]=useState({
  //   names:"",
  //   descriptions:"",
  //   currentDrop:"volvo",
  //   checks:"false"
  // })

  const [names,setNames]=useState("")
  const [descriptions,setDescriptions]=useState("")
  const [currentDrop,setCurrentDrop]=useState("Arts")
  const [checks,setChecks]=useState(false)
  
  const [toggle, setToggle] = useState(false);
  const [edit,setEdit]=useState(false)
  const [editId,setEditId]=useState(null)
  const [records, setRecords] = useState([]);
  const [value,setValue]=useState("")
  const [singleItemId,setSingleItemId]=useState(null)
  const [loading,setLoading]=useState(false)

  let navigate = useNavigate();

  //Fetch Data from DataBase
  const fetchData = () => {
    setLoading(true)
    fetch(apiUrl)
      .then((res) => {
        //console.log(res) 
        setLoading(false)
        return res.json();
      })
      .then((data) => {
         console.log(data);
        setRecords(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

 
// Handle Submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    // let name = document.getElementById("name").value;
    // let description = document.getElementById("description").value;
    // let category = document.getElementById("cars").value;
    // let isActive = document.getElementById("isActive").checked;

  if(!names || !descriptions){
alert("Name and Description are manditory fields")
return;
  }
  setLoading(true)
  
    if(edit){
      let body = {
        id: editId,
        name: names,
        description: descriptions,
        category: currentDrop,
        isActive: checks,
      };
  
      const response = fetch(`${apiUrl}/${editId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
  
          fetchData();
          setEdit(false);
          setEditId(null);
          setLoading(false)
          alert("User Edited Successfully")
           navigate('./')
        });
    } else{
      let body = {
        id: new Date().getTime().toString(),
        name: names,
        description: descriptions,
        category: currentDrop,
        isActive: checks,
      };
  
      const response = fetch((apiUrl), {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
  
          setRecords([...records, data]);
          setLoading(false)
          alert("User Added Successfully")
          navigate('./')
          
          
        });
      }
    resetForm();
  };
  // Rest form
  const resetForm = () => {
    // document.getElementById("name").value = "";
    // document.getElementById("description").value = "";
    // document.getElementById("cars").value = "";
    // document.getElementById("isActive").checked = false;

     setNames("")
     setDescriptions("")
     setCurrentDrop("Arts")
     setChecks(false)
  };

  // Delete single Itwm
  const deleteItem = (id) => {
    setLoading(true)
    const deleteMethod = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(`${apiUrl}/${id}`, deleteMethod)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecords(records.filter((item) => item.id !== id));
        setLoading(false)
        alert("Are you sure you want to Delete?")
      })
      .catch((err) => console.log(err));
  };

  // Delete Multpile Items
  const removeAll = () => {
    let idArray = [];
    records.forEach((item) => {
      console.log(item);
      if(item.isChecked){
        idArray.push(item.id);
        }
      });
      console.log(idArray);
      if(idArray.length < 1){
        alert("Please Select Users to Delete")
        return
      }
      setLoading(true)
      const deleteMethod = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      let temp = records;
      idArray.map((id)=>{
        temp = temp.filter((item) => item.id !== id)
        fetch(`${apiUrl}/${id}`, deleteMethod)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      setRecords(temp);
      setLoading(false)
    alert("Selected Users Deleted Successfully")
  };

  // Add Item
  const addItem = () => {
    setEdit(false)
    navigate("/addEdit")
   
    resetForm()
  };

  // Update Item
  const updateItem = (id) => {
    setEdit(true)
    navigate("/addEdit")
   
    let data=records.find((item)=>item.id==id)
    console.log(data);
    setEditId(data.id);
    setNames(data.name);
    setDescriptions( data.description);
    setCurrentDrop(data.category);
    setChecks(data.isActive);
  };
// Handle Reset button
const handleCancel=()=>{
  setEdit(false)
  setEditId(null)
  resetForm()
}
// Handle Filter Items Active/InActive
const handleFilter=(value)=>{
  if(value === "all"){
    fetchData();
  } else{
    setLoading(true)
    fetch(`${apiUrl}?isActive=${value}`)
    .then((res) => {
      //console.log(res)
      setLoading(false)
      return res.json();
    })
    .then((data) => {
      console.log(data);
       setRecords(data);
    });
  }

}
// Filter Reset
const filterReset=()=>{
  fetchData()

}
// Search in List by Name
const handleSearch=(e)=>{
  e.preventDefault();
  console.log("search")
  setLoading(true)
  fetch(`${apiUrl}?name_like=${value}`)
  .then((res) => {
    // console.log(res)
     return res.json();
  })
  .then((data) => {
    console.log(data);
    setRecords(data);
    // setValue("")
    setLoading(false)
    
  });
}

// Navigate to Single Item
 const singleItem=(id)=>{
  setSingleItemId(id)
    navigate('/singleItem')
   

 }

  return (
    <Routes>
      <Route path='/addEdit' element={<Form handleSubmit={handleSubmit}
      edit={edit} handleCancel={handleCancel} 
      names={names} setNames={setNames} descriptions={descriptions} setDescriptions={setDescriptions} 
      currentDrop={currentDrop} setCurrentDrop= {setCurrentDrop} checks={checks} setChecks={setChecks}
      />} />

      <Route  path='/' element={<App1 addItem={addItem}
      removeAll={removeAll} handleFilter={handleFilter} handleSearch={handleSearch} value={value} setValue={setValue}
      records={records} setRecords={setRecords} filterReset={filterReset} updateItem={updateItem}
      deleteItem={deleteItem} singleItem={singleItem} loading={loading}
      
      />} />

      <Route path='/singleItem' element={<SingleItem singleItemId={singleItemId} deleteItem={deleteItem}  />} />
    </Routes>
   
  );
}

export default App;
