import { Link } from 'react-router-dom';

/**
 * Navbar component that displays navigation links.
 * Shows "Orders" link only if a supplier is logged in.
 */

export default function Navbar({supplier}) {
  return (
    <nav className="navbar">
      <Link to="/">Login</Link> | 
      <Link to="/register">Register</Link> | 
      {supplier && <Link to="/orders">Orders</Link>}
    </nav>
  );
}

