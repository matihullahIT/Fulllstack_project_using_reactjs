import { db } from "../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Tasks = () => {
    
    async function fetchData() {
        const dataRef = collection(db, "tasks");
        const taskSnapshot = await getDocs(dataRef);
        const tasksArray = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(tasksArray); // Store as array, not JSON string
    }
    const [data, setData] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

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
            // Use a generated id for the new task
            const newDocRef = doc(collection(db, "tasks"));
            await setDoc(newDocRef, newTask);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }

    async function DeleteData(id) {
        try {
            await deleteDoc(doc(db, "tasks", id));
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center capitalize">
            <h1 className="font-bold text-4xl p-3 italic">Current Tasks</h1>
            <div className="flex flex-col items-center w-1/2 h-auto">
                {data.length === 0 ? (
                    <div>no data</div>
                ) : (
                    data.map((item) => (
                        item ? <div key={item.id} className="backdrop-blur-xl border-2 shadow-xl border-black rounded-xl m-2 p-2 w-full">
                            <div>
                                <p className="text-md">{item.id}</p>
                                <p className="text-5xl font-bold">{item.task}</p>
                            </div>
                            <p className={`text-xl font-bold ${item.status === "pending" ? "text-yellow-500" : item.status === "completed" ? "text-green-400" : "text-red-400"}`}>{item.status}</p>
                            <button className="text-red-400" onClick={() => DeleteData(item.id)}>
                                <FaTrash />
                            </button>
                        </div>
                            : <div>
                                no data
                            </div>
                    ))
                )}
            </div>
            <form className="flex h-auto w-auto items-baseline flex-col border-1 p-3" onSubmit={handleSubmit(onSubmit)} method="POST">
                <label htmlFor="task">taskName</label>
                <input type="text"
                    className="border-2 rounded-lg
        "
                    id="task" {...register("task", { required: true })} />
                {errors.task ? <p className="text-red-400 animate-pulse">invalid task</p> : null}
                <label htmlFor="status">Status</label>
                <select name="status" id="status" {...register("status", { required: true })}>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                </select>
                <input type="submit" value="add" className="border-2 rounded-md px-3 py-2 font-bold" />
            </form>
        </div>
    );
};

export default Tasks;
