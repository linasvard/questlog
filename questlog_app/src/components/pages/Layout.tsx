import { NavLink, Outlet } from 'react-router';
import Footer from '../Footer';

const Layout = () => {
  return (
    <div className="bg-grid min-h-screen flex flex-col">
      <header className="sticky bg-grid top-0 z-50 p-2">
        <nav className="text-light flex justify-between items-center content-width">
          <NavLink className="font-pixel text-xl" to="/">
            Questlog
          </NavLink>

          <ul className="font-bold flex space-x-8">
            <li>
              <NavLink className="btn-link-2" to="/">
                My games
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-link" to="/games/new">
                Add game
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
        <p>&copy; 2026 Questlog | Track, rate and review your games.</p>
      </footer>
    </div>
  );
};

export default Layout;
