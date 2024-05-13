import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Home from "./components/pages/home";
import Random from "./components/pages/Random";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
<>
{/* <div className="app-top">
<div className="app-sidebar"><Sidebar /></div>  
<div className="app-header"><Header /></div>  
</div> */}
<BrowserRouter>
<div className="app-top">
  <div className="app-sidebar"><Sidebar/></div>
  <div className="app-main">
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/random" element={<Random/>} />
    </Routes>
  </div>
</div>
</BrowserRouter>
</>
  );
}

export default App;
