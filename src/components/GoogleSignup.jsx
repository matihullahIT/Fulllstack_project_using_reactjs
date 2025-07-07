import { auth, provider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context";
export const GoogleSignup=()=>{
    const Navgate=useNavigate()
    const {setUser}=useUser()
async function HandleGooglesingup(){
    try{
const result= await signInWithPopup(auth,provider);
const user=result.user;
setUser(user);
Navgate("/");
console.log("user information"+user)
    }
    catch(err){
        console.log(err)
    }
}
return(
              <button className=" w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-2xl transition-all ease-in-out hover:bg-blue-700"
              onClick={()=>HandleGooglesingup()}>
                    Sign Up with Google
                    </button>
)
}
