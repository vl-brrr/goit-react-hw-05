import { NavLink } from 'react-router-dom';
// import clsx from "clsx";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
}
