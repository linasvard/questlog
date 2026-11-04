import { NavLink, Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="bg-grid">
      <header>
        <nav>
          <p>Questlog</p>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/games">Games</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2026 Questlog | Track, rate and review your games.</p>
      </footer>
    </div>
  );
};

export default Layout;
