import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
    return (
      <>
        <nav className="sticky bg-cyan-400 rounded-xl p-4 flex justify-between items-center shadow ">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-rose-500 rounded-full mr-2"></div>
            <Link to="/">
            <h1 className="text-lg text-black font-bold">HOME</h1>
            </Link>
          </div>
          <h1 className="text-center font-mono text-black font-bold text-2xl">Super Duper Mall</h1>
          <div className="hidden w-full md:block md:w-auto">
          <a onClick={handleLogout} className="font-extrabold btn btn-error btn-sm mx-1">
            Logout
          </a>
        </div>
        </nav>
      </>
    );
  }
  