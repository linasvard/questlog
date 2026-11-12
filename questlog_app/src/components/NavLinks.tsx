import { NavLink } from 'react-router';

type NavLinksProps = { className?: string; linkClassName?: string };

const NavLinks = ({ className = '', linkClassName }: NavLinksProps) => {
  return (
    <ul className={`flex font-bold gap-6 ${className}`}>
      <li>
        <NavLink
          className={linkClassName ?? 'btn-link'}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          to="/"
          end>
          My games
        </NavLink>
      </li>
      <li>
        <NavLink className={linkClassName ?? 'btn-link'} to="/games/new">
          <span aria-hidden="true" className="-mr-4">
            +
          </span>
          Add game
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
