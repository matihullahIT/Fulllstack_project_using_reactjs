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

    return (
    <div className="w-screen h-screen flex flex-col items-center capitalize">
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
            <h1 className="font-bold text-4xl p-3 italic">Current Tasks</h1>
            <div className="flex flex-col items-center w-1/2 h-auto">
                {data.length === 0 ? (
                    <div>no data</div>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="backdrop-blur-xl border-2 shadow-xl border-black rounded-xl m-2 p-2 w-full">
                            <div>
                                <p className="text-md hidden">{item.id}</p>
                                <p className="text-5xl font-bold">{item.task}</p>
                            </div>
                            <p className={`text-xl font-bold ${item.status === "pending" ? "text-yellow-500" : item.status === "completed" ? "text-green-400" : "text-red-400"}`}>{item.status}</p>
                            <button className="text-red-400 mr-2" onClick={() => DeleteData(item.id)}>
                                <FaTrash />
                            </button>
                            <button className="text-green-400" onClick={() => EditTask(item.id)}>
                                <FaPencilAlt />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <form className="flex h-auto w-auto items-baseline flex-col border-1 p-3" onSubmit={handleSubmit(onSubmit)} method="POST">
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
