import LogoFooter from '../assets/icons/logo_questlog.svg';
import NavLinks from './NavLinks';

const Footer = () => {
  return (
    <footer className="bg-pink px-4 mt-0 py-8 text-dark md:px-8">
      <div className="content-width grid gap-8 md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-y-16">
        <p className="font-bold md:col-start-2 md:row-start-1 md:text-right">
          &copy; 2026 Questlog. All rights reserved.
          <br />
          Track, rate and review your games.
        </p>

        <img
          src={LogoFooter}
          alt="Questlog"
          className="h-auto w-full md:col-start-1 md:row-start-2 md:w-120 md:self-end"
        />

        <nav
          aria-label="Footer"
          className="flex md:col-start-2 md:row-start-2 md:self-end md:justify-self-end">
          <NavLinks linkClassName="btn-link-2" />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
