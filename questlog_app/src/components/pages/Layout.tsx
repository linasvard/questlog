import { NavLink, Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="bg-grid min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-grid py-4 px-5">
        <nav className="text-light flex justify-between items-center">
          <NavLink className="font-pixel text-xl" to="/">
            Questlog
          </NavLink>
          <ul className="font-bold flex space-x-4">
            <li>
              <NavLink to="/">My games</NavLink>
            </li>
            <li>
              <NavLink to="/games/new">Add game</NavLink>
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
