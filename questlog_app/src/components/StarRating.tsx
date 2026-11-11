import StarFilledIcon from '../assets/icons/StarFilledIcon';
import StarEmptyIcon from '../assets/icons/StarIcon';

type StarRatingProps = {
  rating: number | null;
  max?: number;
  className?: string;
};

const StarRating = ({
  rating,
  max = 5,
  className = 'size-6',
}: StarRatingProps) => {
  if (rating === null) return null;

  return (
    <span
      className="flex text-orange gap-0.5"
      role="img"
      aria-label={`Rating ${rating} of ${max}`}>
      {Array.from({ length: max }, (_, index) =>
        index < rating ? (
          <StarFilledIcon key={index} className={className} />
        ) : (
          <StarEmptyIcon key={index} className={className} />
        ),
      )}
    </span>
  );
};

export default StarRating;
