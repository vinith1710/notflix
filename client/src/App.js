import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Home from "./components/pages/home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./components/pages/Video";
import Login from "./components/pages/Login";
function App() {
  return (
    <>
      {/* <div className="app-top">
<div className="app-sidebar"><Sidebar /></div>  
<div className="app-header"><Header /></div>  
</div> */}
      <BrowserRouter>
        <div className="app-top">
          <div className="app-sidebar"><Sidebar /></div>
          <div className="app-main">
            <Header />
            <Routes>
              <Route path="/" >
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="video">
                  <Route path=":id" element={<Video/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
