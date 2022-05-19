import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
