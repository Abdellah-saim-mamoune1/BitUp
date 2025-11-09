import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import "./app.css"
import { Register } from "./register"

function App() {

  return (
    <Router>
       
       <div className="flex-1 bg-black dark:bg-gray-900 ">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    
    
    </Router>
  );
}

export default App;
