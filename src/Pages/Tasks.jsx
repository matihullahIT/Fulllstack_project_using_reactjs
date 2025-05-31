import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {toast, ToastContainer, Bounce} from "react-toastify"
const Tasks = () => {
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [editTask, setEdit] = useState({ task: "", status: "", id: null });

    async function fetchData() {
        const dataRef = collection(db, "tasks");
        const taskSnapshot = await getDocs(dataRef);
        const tasksArray = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(tasksArray);
    }
    useEffect(() => {
        fetchData();
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
        const taskToEdit = data.find((item) => item.id === id);
        if (taskToEdit) {
            try {
                setEdit({ task: taskToEdit.task, status: taskToEdit.status, id: taskToEdit.id });
                toast.success("Task ready to edit");
            }
            catch(err){
                toast.error("Error: " + err);
            }
        }
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        if (!editTask.task || !editTask.status || !editTask.id) return;
        const taskRef = doc(db, "tasks", editTask.id);
        try {
            await updateDoc(taskRef, {
                task: editTask.task,
                status: editTask.status,
            });
            toast.success("Task Updated");
            setEdit({ task: "", status: "", id: null });
            fetchData();
        } catch (err) {
            console.log(err);
            toast.error("Error: " + err);
        }
    }
    const[toggler,settoggler]=useState(
        {
            addTask:true,
            EditTask:true,
            DeleteTask:true   
        })
const filter = (status) => {
  console.log("Data before filtering:", data);
  const filterData = data.filter(item => item.status === status);
  console.log("Filtered Data:", filterData);
  setData(filterData);
};
    return (
    <div className="w-full min-h-screen flex flex-col items-center border-2 border-red-300 capitalize overflow-x-hidden">
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
            <h1 className=" text-4xl italic box-border">Current Tasks</h1>
            <div className="flex flex-col items-center w-full  bg-gray-400  border-pink-300">
                <div className=" flex justify-between items-center  w-
                auto gap-4 py-2"> 
                    <input type="text" id="tasks" className="bg-white rounded-xl text-xl p-3"
                    value={(e)=>e.target.value}/>
                    <button className="px-1 py-3 border-white   rounded-xl  linear transition-all hover:bg-blue-500 text-white hover:border-white hover:scale-110">Add A task</button>
                    <select className="bg-white px-2 py-3 text-xl rounded-md capitalize" onChange={(e)=>filter(e.target.value)}>
                            <option key={"1"} value={""}>{"status"}</option>
                            <option key={"2"} value={"completed"}>completed</option>
                            <option key={"3"} value={"pending"}>pending</option>
                    </select>
                </div>
                <div className="flex flex-col items-center w-full gap-2 py-3 border-green-300 ">
                {data.length === 0 ? (
                    <div className="text-white text-6xl italic font-bold">Loading...</div>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="backdrop-blur-xl  hover:shadow-xl border-purple-300 bg-white rounded-xl w-1/3
                        transition-all ease-in-out hover:bg-black hover:text-white hover:scale-120 ">
                            <div>
                                <p className="text-md hidden">{item.id}</p>
                                <p className="text-4xl font-bold">{item.task}</p>
                            </div>
                            <p className={`text-xl font-bold ${item.status === "pending" ? "text-yellow-500" : item.status === "completed" ? "text-green-400" : "text-red-400"}`}>{item.status}</p>
                            <div className="flex items-baseline gap-4 justify-baseline">
                            <button className="p-1 transition-all text-xl hover:text-red-400 " onClick={() => DeleteData(item.id)}>
                                <FaTrash />
                            </button>
                            <button className="p-1 transition-all text-xl hover:text-green-400" onClick={() => EditTask(item.id)}>
                                <FaPencilAlt />
                            </button>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </div>
            <form className="flex h-auto w-auto items-baseline flex-col border-1 p-3 " onSubmit={handleSubmit(onSubmit)} method="POST">
                <label htmlFor="task">Task Name</label>
                <input
                    type="text"
                    className="border-2 rounded-lg"
                    id="task"
                    {...register("task", { required: true })}
                />
                {errors.task ? <p className="text-red-400 animate-pulse">invalid task</p> : null}
                <label htmlFor="status">Status</label>
                <select name="status" id="status"  {...register("status", { required: true })} defaultValue={"pending"}>
                    <option value="">Select status</option>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                </select>
                {errors.status ? <p className="text-red-400 animate-pulse">invalid status</p> : null}
                <input type="submit" value="Add" className="border-2 rounded-md px-3 py-2 font-bold mt-2" />
            </form>
            {editTask.id && (
                <form
                    className="flex h-auto w-auto items-baseline flex-col border-1 p-3 mt-4"
                    onSubmit={handleEditSubmit}
                    method="POST"
                >
                    <label htmlFor="edit-task">Task Name</label>
                    <input
                        type="text"
                        className="border-2 rounded-lg"
                        id="edit-task"
                        value={editTask.task}
                        onChange={(e) =>
                            setEdit((prev) => ({
                                ...prev,
                                task: e.target.value,
                            }))
                        }
                    />
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
                    </select>
                    <input
                        type="submit"
                        value="Update"
                        className="border-2 rounded-md px-3 py-2 font-bold mt-2"
                    />
                </form>
            )}
        </div>
    );
};

export default Tasks;
