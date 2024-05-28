import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Home from "./components/pages/home";
import "./App.css";
import "./mobile.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./components/pages/Video";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
// Fontawasome global import import the library
import { library } from '@fortawesome/fontawesome-svg-core'
import Tags from "./components/pages/Tags";
import Search from "./components/pages/Search";
// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
function App() {
  return (
    <>
      {/* <div className="app-top">
<div className="app-sidebar"><Sidebar /></div>  
<div className="app-header"><Header /></div>  
</div> */}
      <BrowserRouter>
        <div className="app-top">
          <Sidebar />
          <div className="app-main">
            <Header />
            <Routes>
              <Route path="/" >
                <Route index element={<Login/>}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="home" element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search/>} />
                <Route path="movie" element={<Tags type="Movie" />} />
                <Route path="tvseries" element={<Tags type="TvSeries" />} />
                <Route path="anime" element={<Tags type="Anime" />} />
                <Route path="animation" element={<Tags type="Animation" />} />
                <Route path="video">
                  <Route path=":id" element={<Video/>}/>
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
library.add(fab, fas, far)
