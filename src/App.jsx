// router imports
import { BrowserRouter, Route, Link, Switch, Routes } from "react-router-dom";

// style and bootstrap imports
import Nav from "react-bootstrap/Nav";
import "./style/App.css";

// image imports
import CLogo from "./img/search.png";
// Import the pages

import DiscoverPage from "./pages/DiscoverPage";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        {/* sidebar start */}
        <div className="navbar">
          <Nav className="sidebar d-flex flex-column">
            <div className="container-fluid">
              <div className="navbar-brand sidebar-logo m-3 mb-5 d-flex align-items-center flex-column">
                <img src={CLogo} style={{ height: 150, width: 150 }} />
                <h2>Event Finder</h2>
              </div>
              <div className="links-container d-flex flex-column mx-5">
                <Link className="my-2" to="discover">
                  Home / Discover
                </Link>
                <Link className="my-2" to="search">
                  Search Page
                </Link>
              </div>
            </div>
          </Nav>
        </div>
        {/* sidebar end */}

        {/* Routes start */}
        <div className="routes w-100">
          <Routes>
            <Route path="/" element={<DiscoverPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* Routes end */}
    </div>
  );
}
export default App;
