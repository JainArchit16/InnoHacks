import { Link } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/Seller">Seller</Link>
      <Link to="/Buyer">Buyer</Link>
    </nav>
  );
};

export default Navbar;
