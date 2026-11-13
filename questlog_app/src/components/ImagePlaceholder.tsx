type ImagePlaceholderProps = { text?: string; className?: string };

const ImagePlaceholder = ({
  text = 'No cover',
  className = 'aspect-3/4',
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`flex w-full items-center font-pixel-2 justify-center border-[3px] border-dashed border-black/40 p-2 text-center text-black/50 ${className}`}>
      {text}
    </div>
  );
};

export default ImagePlaceholder;
