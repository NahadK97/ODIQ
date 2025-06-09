import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddQ from "./components/AddQ";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="home">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddQ />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
