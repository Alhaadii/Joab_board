import Nav from "./components/Nav";
import { FaPlusCircle } from "react-icons/fa";
import { Route, Routes, Link } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Details from "./pages/JobDetail";
import { getFromLocalStorage } from "./utils/localStorage";

function App() {
  const userInfo = getFromLocalStorage("UserInfo");

  return (
    <div className="min-h-screen  bg-gray-100">
      <Nav />
      <div className="py-2 w-full mx-auto flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diary/form" element={<Form />} />
          <Route path="/diary/form/:id" element={<Form />} />
          <Route path="/diary/details/:id" element={<Details />} />
        </Routes>
      </div>
      <div className="p-2 flex justify-end max-w-[1024px] mx-auto w-full">
        {userInfo && (
          <Link to="/diary/form" className="btn btn-primary">
            <FaPlusCircle className="text-4xl cursor-pointer" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default App;
