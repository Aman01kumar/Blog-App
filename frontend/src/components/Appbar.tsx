import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <div className="border-b flex justify-between items-center px-10 py-3 ">
      <Link to="/blogs" className="text-lg font-semibold cursor-pointer">
        Medium
      </Link>

      <div className="flex items-center gap-4 cursor-pointer">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
          >
            Publish
          </button>
        </Link>

        {/* Logout before Avatar */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
        >
          Logout
        </button>

        <Avatar size="big" name={userName} />
      </div>
    </div>
  );
};
