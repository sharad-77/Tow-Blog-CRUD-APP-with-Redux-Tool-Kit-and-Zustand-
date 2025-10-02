import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className=" shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold ">Blog</Link>
        <nav className="space-x-4">
          <Link to="/" className=" hover:text-gray-800">Home</Link>
          {isAuthenticated ? (<Link to="/dashboard" className=" hover:text-gray-800">Dashboard</Link>) : (
            <>
              <Link to="/login" className=" hover:text-gray-800">Login</Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
