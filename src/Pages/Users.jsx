import { FaPencilAlt, FaUser } from "react-icons/fa"
const Users = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <div className="flex flex-col text-3xl h-1/2 items-center justify-between bg-white gap-3 backdrop-blur-lg  border-2 rounded-lg p-3 ">
        <FaUser className="text-6xl rounded-full border-2  shadow-2xl"/>
        <div className={`flex gap-3 items-center hover:`}>
        <h1>Username:user</h1>
        <FaPencilAlt className="editpelcil opacity-0 transition-all ease-in-out hover:opacity-100"/>
        </div>
        <div className="flex gap-3 items-center">
        <h1>email:user</h1>
        <FaPencilAlt className="opacity-0 transition-all ease-in-out hover:opacity-100"/>
        </div>
      </div>
    </div>
  )
}

export default Users
