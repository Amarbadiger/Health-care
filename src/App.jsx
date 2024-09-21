import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Addservice from "./Pages/Addservice";
import Updateservice from "./Pages/Updateservice";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Addservice />} />
          <Route path="/updateservice/:id" element={<Updateservice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
