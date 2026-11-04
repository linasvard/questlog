import { NavLink, Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="bg-grid min-h-screen flex flex-col">
      <header>
        <nav className="bg-dark text-light p-4 flex justify-between items-center">
          <p>Questlog</p>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/">My games</NavLink>
            </li>
            <li>
              <NavLink to="/games">Add game</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2026 Questlog | Track, rate and review your games.</p>
      </footer>
    </div>
  );
};

export default Layout;
