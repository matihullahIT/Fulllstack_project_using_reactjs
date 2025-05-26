import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Login = () => {
    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    const [toggler, setToggler] = useState(false);
    return (
        <div className="flex items-center justify-center bg-gray-400 min-h-screen w-full px-2 capitalize">
            <div className="border rounded-md bg-white w-full max-w-md md:max-w-lg lg:max-w-xl h-auto p-6 shadow-lg">
                <h2 className="font-bold text-3xl md:text-4xl text-center mb-4">login</h2>
                <form className="flex flex-col gap-4" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username" className="font-bold">Name</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="John"
                        className="border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                    />
                    {errors.username?<p className="text-red-500 font-bold animate-pulse capitalize">*incorrect username</p>:null}
                    <label htmlFor="password" className="font-bold">Password</label>
                    <div className="relative flex items-center">
                        <input
                            id="password"
                            type={toggler ? "text" : "password"}
                            {...register("password", { required: true })}
                            placeholder="Password"
                            className="pr-10 flex-1 border rounded-sm text-lg md:text-2xl focus:outline-2 px-2 py-1"
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setToggler((prev) => !prev)}
                            tabIndex={-1}
                        >
                            <FontAwesomeIcon icon={toggler ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    {errors.password?<p className="text-red-500 font-bold animate-pulse capitalize">*incorrect password</p>:null}
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
                </form>
                <h3>Haven't <Link to="/register" className="text-blue-700 underline underline-offset-1 font-bold italic">registered</Link> yet?</h3>
            </div>
        </div>
    );
};

export default Login;


