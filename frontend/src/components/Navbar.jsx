import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div class="navbar">
        <Link to="/">
          <h1>Welcome to ODIQ</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <Link to="/add">Add Question</Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Admin Login</Link>
              {/* <Link to="/signup">Sign Up</Link> */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
