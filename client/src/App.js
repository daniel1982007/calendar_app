import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Events from "./components/Events";
import AddEvent from "./components/AddEvent";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add_event" element={<AddEvent />} />
      </Routes>
    </>
  );
}

export default App;
