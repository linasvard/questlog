import { Link } from 'react-router';
import RetroWindow from './RetroWindow';

type ErrorMessageProps = {
  message: string;
  title?: string;
  showBackLink?: boolean;
};

const ErrorMessage = ({
  message,
  title = 'Error',
  showBackLink = false,
}: ErrorMessageProps) => {
  return (
    <div role="alert" className="mx-auto my-10 w-full min-h-[60vh] max-w-md">
      <RetroWindow title={title} barColor="bg-orange">
        <div className="flex aspect-2/1 flex-col gap-2">
          <p className="font-pixel-2">{message}</p>
          {showBackLink && (
            <Link to="/" className="btn-link-2 mt-auto self-start my-2">
              ← Back to games
            </Link>
          )}
        </div>
      </RetroWindow>
    </div>
  );
};

export default ErrorMessage;
