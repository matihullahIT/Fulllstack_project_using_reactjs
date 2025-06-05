import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Tasks from "./Pages/Tasks";
import Provider from "./Context"
function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
      <Provider>
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
      </Provider>
  )
}

export default App
