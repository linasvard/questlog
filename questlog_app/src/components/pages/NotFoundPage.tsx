import NotFoundIcon from '../../assets/icons/NotFoundIcon';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-start gap-4 px-4 pt-30 md:pt-20">
      <NotFoundIcon className="w-80 h-auto mb-10 md:w-100" aria-hidden="true" />
      <h1 className="sr-only">404 - Page not found</h1>
      <p className="md:text-5xl text-outline text-3xl text-pink font-pixel uppercase font-bold">
        Oops!
      </p>
      <p className="text-center mt-2 text-lg max-w-sm uppercase font-bold text-light font-pixel-2">
        The page you are looking for does not exist.
      </p>
      <div className="flex gap-4 mt-6 justify-center items-center flex-wrap">
        <Link to="/" className="btn bg-light text-dark border-3 border-dark">
          ← Go home
        </Link>
        <span className="font-pixel">or</span>
        <Link
          to="/games/new"
          className="btn-link bg-yellow text-dark border-3 border-dark">
          + Add game
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
