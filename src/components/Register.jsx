
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
 
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toggler, setToggler] = useState({
        password:false,
        confirm_password:false
    });

    const onSubmit = (data) => {
        if (data.password === data.confirm_password) {
            console.log(data);
            Swal.fire({
                title:"User Registerd",
                icon:"success",
            })
        } else {
            Swal.fire({
                title:"Passwords do not match!",
                icon:"error ",
            });
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-400 min-h-screen w-full px-2  capitalize
        ">
            <div className="border rounded-md bg-white w-full max-w-md md:max-w-lg lg:max-w-xl h-auto p-6 hover:shadow-3xl ">
                <h2 className="font-bold text-3xl md:text-4xl text-center mb-4">Register</h2>
                <form className="flex flex-col gap-4" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name" className="font-bold">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="John"
                        className="border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                    />
                    {errors.name?<p className="text-red-500 font-bold animate-pulse capitalize">*Invalid Name</p>:null}

                    <label htmlFor="username" className="font-bold">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="John"
                        className="border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                    />
                    {errors.username?<p className="text-red-500 font-bold animate-pulse capitalize">*Invalid username</p>:null}
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
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember_me"
                            {...register("remember_me")}
                            id="remember_me"
                        />
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>
                    <input
                        type="submit"
                        className="bg-black text-white text-lg md:text-2xl rounded-3xl py-2 transition-all ease-in-out hover:scale-105 hover:bg-gray-900 cursor-pointer"
                        value="Submit"
                    />
                    <h3>Already have an account? <Link to="/login" className="text-blue-700 underline underline-offset-1 font-bold italic">Login</Link></h3>
                </form>
            </div>
        </div>
    );
};

export default Register;
