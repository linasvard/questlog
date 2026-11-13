import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import Footer from '../Footer';
import QuestlogLogoH from '../../assets/icons/QuestlogLogoS';
import NavLinks from '../NavLinks';

const Layout = () => {
  return (
    <div className="bg-grid min-h-screen flex flex-col">
      <ScrollRestoration />
      <header className="sticky md:static bg-grid top-0 z-50 p-2">
        <nav className="text-light flex justify-between items-center content-width">
          <NavLink
            className="inline-flex items-center justify-center border-3 border-dark bg-pink p-1 shadow-blue md:p-2"
            to="/">
            <QuestlogLogoH
              paintOrder="stroke"
              className="h-auto w-10 px-2 py-1 text-yellow stroke-24 stroke-dark md:w-10"
            />
          </NavLink>

          <NavLinks />
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="z-20">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
