import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {toast, ToastContainer, Bounce} from "react-toastify"
import {useUser} from "../Context"
import Popup from "../components/Popup"
import { useNavigate } from "react-router-dom";
const Tasks = () => {
   const Navigate=useNavigate()
   function  ValidateUser(){
    if (!user){
      Navigate("/login")
    }
  }
  document.title="Tasks"
    const {user} =useUser()
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [editTask, setEdit] = useState({ task: "", status: "", id: null });
    
async function fetchData() {
  const dataRef = collection(db, "tasks");
  const taskSnapshot = await getDocs(dataRef);
  const tasksArray = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setData(tasksArray);
  setorginaldata(tasksArray); // Move this here
}

    const [orginaldata,setorginaldata]=useState([])
    useEffect(() => {
        fetchData();
        setorginaldata(data);
        console.log(user)
        console.log("initial stage  "+toggler.EditTask)
    }, []);
    async function onSubmit(formData) {
        const newTask = {
            task: formData.task,
            status: formData.status,
            created_at: Date.now()
        };
        try {
            await addDoc(collection(db, "tasks"), newTask);
            fetchData();
            reset();
            settoggler((prev)=>toggler.addTask==!prev)
        } catch (err) {
            console.log(err);
        }
    }

    async function DeleteData(taskId) {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            await fetchData();
            toast.success("Task Deleted");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong: " + err);
        }
    }

    function EditTask(id) {
      settoggler(prev => ({ ...prev, EditTask: !prev.EditTask }))
      setEdit(data.find((item) => item.id === id));
              console.log("Edit task  "+toggler.EditTask)
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        if (!editTask.task || !editTask.status || !editTask.id) return;
        const taskRef = doc(db, "tasks", editTask.id);
        try {
        settoggler(prev => ({ ...prev, editTask: !prev.editTask }))
          console.log(toggler.EditTask)
            await updateDoc(taskRef, {
                task: editTask.task,
                status: editTask.status,
            });
            toast.success("Task Updated");
            setEdit({ task: "", status: "", id: null });
            fetchData();
            console.log(toggler.editTask)
        } catch (err) {
            console.log(err);
            toast.error("Error: " + err);
        }
    }
const [toggler, settoggler] = useState({ addTask:false, EditTask:false});

const filter = (e) => {
  console.log("Filtering from original data:", orginaldata);

  const filterData = orginaldata.filter(
    item => item.status.toLowerCase() === e.target.value.toLowerCase()
  );

  console.log("Filtered Data:", filterData);
  setData(filterData);
};

function findTask(e) {
  const searchValue = e.target.value.toLowerCase();
  const filterData = orginaldata.filter(item =>
    item.task.toLowerCase().includes(searchValue)
  );
  setData(filterData);
}

const EnterData=()=>{
return(
                <form className="flex h-full w-full items-baseline flex-col  p-3 " onSubmit={handleSubmit(onSubmit)} method="POST">
                <label htmlFor="task">Task Name</label>
                <textarea
                    type="text"
                    className="border-2 border-gray-300 rounded-xl px-4 py-2 shadow-sm"
                    id="task"
                    cols={30}
                    rows={5}
                    {...register("task", { required: true })}
                >
                  </textarea>
                {errors.task ? <p className="text-red-400 animate-pulse">invalid task</p> : null}
                <label htmlFor="status">Status</label>
                <select name="status" className="border border-gray-300 rounded-xl px-4 py-2 shadow-sm" id="status"  {...register("status", { required: true })} defaultValue={"pending"}>
                    <option value="">Select status</option>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="cancle">cancle</option>
                </select>
                {errors.status ? <p className="text-red-400 animate-pulse">invalid status</p> : null}
                <div className="flex w-full">
                <input type="submit" value="Add" className="border-2 rounded-md px-3 py-2 font-bold text-white mt-2 w-full bg-[#252525]" />
                <button className="border-2 rounded-md px-3 py-2 font-bold text-white mt-2 w-full bg-[#252525]" onClick={()=>        settoggler(prev => ({ ...prev, addTask: !prev.addTask }))}>cancle</button>
                </div>
            </form>
)
}
const EditTasks= () => {
  return (
    <>
      {editTask.id && (
        <form
          className="flex h-auto w-auto items-baseline flex-col p-3 mt-4"
          onSubmit={handleEditSubmit}
          method="PUt"
        >
          <label htmlFor="edit-task">Task Name</label>
          <textarea
            type="text"
            cols={30}
                    rows={5}
            className="border-2 rounded-lg"
            id="edit-task"
            value={editTask.task}
            onChange={(e) =>
              setEdit((prev) => ({
                ...prev,
                task: e.target.value,
              }))
            }
          ></textarea>
          <label htmlFor="edit-status">Status</label>
          <select
            name="status"
            id="edit-status"
            value={editTask.status}
            onChange={(e) =>
              setEdit((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="">Select status</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
            <option value="cancle">cancle</option>
          </select>
          <div className="flex">
          <input
            type="submit"
            value="Update"
            className="border-2 rounded-md px-3 py-2 font-bold mt-2"
            />
          <button className="border-2 rounded-md px-3 py-2 font-bold text-white mt-2 w-full bg-[#252525]" onClick={()=>settoggler(prev => ({ ...prev, EditTask: !prev.EditTask }))}>cancle</button>
            </div>
        </form>
      )}
    </>
  );
};
    return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  capitalize overflow-x-hidden">
<ToastContainer
    position="top-center"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
  />
  { toggler.addTask?
  <Popup className="  items-center justify-center">
    <h1 className="text-2xl font-bold text-center">Enter Task</h1>
    <EnterData/>
  </Popup>:null}
  {toggler.editTask?
  <Popup>
    <h1 className="text-2xl font-bold text-center">Edit Task</h1>
    <EditTasks/>
  </Popup>
  :null
  }
            <h1 className=" text-4xl box-border">Current Tasks</h1>
            <div className="flex flex-col items-center w-full  bg-gray-50 max-w-2xl mx-auto p-6 border-pink-300">
                <div className=" flex flex-col md:flex-row lg:flex-row  justify-between items-center  w-auto gap-4 py-2"> 
                    <input type="text" id="tasks" className="w-auto px-4 py-2 rounded-full border shadow-sm focus:ring-blue-400 focus:border-blue-500"
                    onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.target.value !== "" ? findTask(e) : fetchData();
                        }
                    }}
                    placeholder="Task"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-md" onClick={()=>{
                        settoggler(prev => ({ ...prev, addTask: !prev.addTask }))
                    }}>Add A task</button>
                    <select className="border border-gray-300 rounded-full px-4 py-2 shadow-sm capitalize" onChange={(e)=>e.target.value? filter(e):fetchData()}>
                            <option key={"1"} value={""}>{"status"}</option>
                            <option key={"2"} value={"completed"}>completed</option>
                            <option key={"3"} value={"pending"}>pending</option>
                            <option value="cancle">cancle</option>
                    </select>
                </div>
                <div className="flex flex-col items-baseline w-full gap-2 py-3 border-green-300 ">
                {data.length === 0 ? (
                    <div className=" text-6xl italic font-bold">Loading...</div>
                ) :   (
                    data.map((item) => (
                        <div key={item.id} className={`border-l-4 bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-xl w-auto
                        transition-all ease-in-out flex flex-col items-baseline justify-center hover:bg-[#252525] hover:text-white hover:scale-120 hover:z-40 not-hover:z-0
                        ${item.status === "pending" ? "border-yellow-400" : item.status  === "completed" ? "border-green-400 " : "border-red-400 bg-red-100"} `}>
                            <div>
                                <p className="text-md hidden">{item.id}</p>
                                <p className="text-4xl font-bold">{item.task}</p>
                            </div>
                            <span className={` text-green-800 text-xs  font-bold px-2.5 py-0.5 rounded-full ${item.status === "pending" ? "text-yellow-500 bg-yellow-100" : item.status  === "completed" ? "text-green-400 bg-green-100" : "text-red-400 bg-red-100"}`}>{item.status}</span>
                            <div className="flex items-baseline gap-4 justify-baseline p-2">
                            <button className="transition-transform hover:scale-110 hover:text-red-500 " onClick={() => DeleteData(item.id)}>
                                <FaTrash />
                            </button>
                            <button className="transition-transform hover:scale-110 hover:text-blue-500" onClick={() =>{ EditTask(item.id)
                              settoggler(prev => ({ ...prev, editTask: !prev.editTask }))}
                            }>
                                <FaPencilAlt />
                            </button>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </div>          
        </div>
    );
};

export default Tasks;
