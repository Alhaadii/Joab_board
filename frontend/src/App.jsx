import Nav from "./components/Nav";
import { FaPlusCircle } from "react-icons/fa";
import { Route, Routes, Link } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Details from "./pages/JobDetail";

function App() {
  return (
    <div>
      <Nav />
      <div className="py-2 w-full mx-auto flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diary/form" element={<Form />} />
          <Route path="/diary/form/:id" element={<Form />} />
          <Route path="/diary/details/:id" element={<Details />} />
        </Routes>
      </div>
      <div className="absolute right-7 z-50">
        <Link to="/diary/form" className="btn btn-primary">
          <FaPlusCircle className="text-4xl cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}

export default App;
