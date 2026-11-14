import NotFoundIcon from '../../assets/icons/NotFoundIcon';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      <NotFoundIcon className="w-100 h-auto" />
      <h1 className="text-2xl text-light font-bold">404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
