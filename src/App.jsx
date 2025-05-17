import "./index.css"
import Navbar from "./components/Navbar";
function App() {
  document.title="Portfolio Site";
  return (
    <div className="border-3 border-black flex items-center justify-center">
      <div className="w-6xl border-1 border-blue-400 p-8 rounded shadow-lg">
        <Navbar/>
      </div>
    </div>
  )
}

export default App
