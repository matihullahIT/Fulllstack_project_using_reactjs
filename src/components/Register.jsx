import { auth,db} from "../firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toggler, setToggler] = useState({
        password:false,
        confirm_password:false
    });

    // ...existing code...
const onSubmit = async (data) => {
    if (data.password === data.confirm_password) {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredentials.user, {
                displayName: data.name
            });
            await setDoc(doc(db, "users", userCredentials.user.uid), {
                name: data.name,
                email: data.email,
                password: data.password,
                date: new Date(),
            })
            Swal.fire({
                title:"user Registered",
                icon:"success"
            })
            navigate("/")
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                title: err.message || "Registration failed!",
                icon: "error",
            });
        }
    } else {
        Swal.fire({
            title: "Passwords do not match!",
            icon: "error",
        }); 
    }
};
// ...existing code...
document.title="Register"
    return (
        <div className="flex items-center justify-center bg-gray-400 min-h-screen w-full px-2  capitalize
        ">
            <div className="border rounded-md bg-white w-full max-w-md md:max-w-lg lg:max-w-xl h-auto p-6 hover:shadow-3xl ">
                <h2 className="font-bold text-3xl md:text-4xl text-center mb-4">Register</h2>
                <form className="flex flex-col gap-4" autoComplete="on" onSubmit={handleSubmit(onSubmit)} method="POST">
                    <label htmlFor="name" className="font-bold">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="John"
                        className="border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                    />
                    {errors.name?<p className="text-red-500 font-bold animate-pulse capitalize">*Invalid Name</p>:null}

                    <label htmlFor="email" className="font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder="john@example.com"
                        className="border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                    />
                    {errors.email ? <p className="text-red-500 font-bold animate-pulse capitalize">*Invalid email</p> : null}
                    <label htmlFor="password" className="font-bold">Password</label>
                    <div className="relative flex items-center">
                        <input
                            id="password"
                            type={toggler.password ? "text" : "password"}
                            {...register("password", { required: true })}
                            placeholder="Password"
                            className="pr-10 flex-1 border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setToggler(prev => ({ ...prev, password: !prev.password }))}
                            tabIndex={-1}
                        >
                            <FontAwesomeIcon icon={toggler.password ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    <label htmlFor="confirm_password" className="font-bold">Confirm Password</label>
                    <div className="relative flex items-center">
                        <input
                            id="confirm_password"
                            type={toggler.confirm_password ? "text" : "password"}
                            {...register("confirm_password", { required: true })}
                            placeholder="Confirm Password"
                            className="pr-10 flex-1 border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setToggler(prev => ({ ...prev, confirm_password: !prev.confirm_password }))}
                            tabIndex={-1}
                        >
                            <FontAwesomeIcon icon={toggler.confirm_password ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    {errors.confirm_password ? (
                        <p className="text-red-500 font-bold animate-pulse capitalize">*invalid password</p>
                    ) : null}
                    <input
                        type="submit"
                        className="bg-black text-white text-lg md:text-2xl rounded-3xl py-2 transition-all ease-in-out
                        hover:scale-105 hover:bg-gray-900 cursor-pointer"
                        value="Submit"
                    />
                    <h3>Already have an account? <Link to="/login" className="text-blue-700 underline underline-offset-1 font-bold italic">Login</Link></h3>
                </form>
            </div>
        </div>
    );
};

export default Register;
