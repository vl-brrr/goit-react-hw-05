import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import css from './Navbar.module.css';
import clsx from 'clsx';

export default function Navbar() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
