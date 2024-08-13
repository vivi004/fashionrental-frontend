import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import '../pages/css/Navbar.css';
import { logoutUser } from '../redux/actions';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.history.pushState(null, "", window.location.origin);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, "", window.location.origin);
    });
    dispatch(logoutUser());
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Fashion Rental</div>
      <ul className="navbar-links">
        <li>
         <Link to="/"> <button className='butt'>Home</button></Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login"><button className='butt'>Login</button></Link>
            </li>
            <li>
            <Link to="/register"><button className='butt'>Register</button></Link>
            </li>
          </>
        ) : (
          <>
            {user.isAdmin ? (
              <li>
                <Link to="/admin/dashboard"><button className='butt'>Admin Dashboard</button></Link>
              </li>
            ) : (
              <li>
                <Link to="/user/dashboard"><button className='butt'>User Dashboard</button></Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="butt">Logout</button>
            </li>
          </>
        )}
        <li>
          <Link to="/sustainability"><button className='butt'>Sustainability</button></Link>
        </li>
        <li>
          <Link to="/landing"><button className='butt'>About Us</button></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;