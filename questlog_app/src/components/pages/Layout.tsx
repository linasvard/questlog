import { NavLink, Outlet } from 'react-router';
import Footer from '../Footer';
import QuestlogLogoH from '../../assets/icons/QuestlogLogoH';

const Layout = () => {
  return (
    <div className="bg-grid min-h-screen flex flex-col">
      <header className="sticky bg-grid top-0 z-50 p-2">
        <nav className="text-light flex justify-between items-center content-width">
          <NavLink
            className="inline-flex items-center justify-center border-3 border-dark bg-pink p-1 shadow-blue md:p-2"
            to="/">
            <QuestlogLogoH
              paintOrder="stroke"
              className="h-auto w-10 px-2 py-1 text-yellow stroke-24 stroke-dark md:w-10"
            />
          </NavLink>

          <ul className="font-bold flex space-x-8">
            <li>
              <NavLink className="btn-link-2" to="/">
                My games
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-link" to="/games/new">
                <span aria-hidden="true" className="-mr-4">
                  +
                </span>
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
      </footer>
    </div>
  );
};

export default Layout;
