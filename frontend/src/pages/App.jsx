import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Crud from "./Create";
import FourOhFour from "./404";
import Update from "./Update";
import Delete from "./Delete";
import "../css/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Crud />} />
        <Route path="/upd" element={<Update />} />
        <Route path="/del" element={<Delete />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </>
  );
}

export default App;
