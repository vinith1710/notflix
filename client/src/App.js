import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Home from "./components/pages/home";
import Random from "./components/pages/Random";
import Trending from "./components/pages/Trending";
import Library from "./components/pages/Library";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./components/pages/Video";
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
                <Route index element={<Home />} />
                <Route path="video">
                  <Route path=":id" element={<Video/>}/>
                </Route>
                <Route path="/random" element={<Random />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/library" element={<Library />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
