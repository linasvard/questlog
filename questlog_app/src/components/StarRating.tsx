import StarFilledIcon from '../assets/icons/StarFilledIcon';

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
      className="flex gap-0.5"
      role="img"
      aria-label={`Rating ${rating} of ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <StarFilledIcon
          key={index}
          className={`${className} ${index < rating ? 'text-orange' : 'text-purple/25'}`}
        />
      ))}
    </span>
  );
};

export default StarRating;
