import { useState } from 'react';
import RetroWindow from './RetroWindow';
import ImagePlaceholder from './ImagePlaceholder';

type ImagePreviewProps = {
  url: string;
  title: string;
  barColor?: string;
  emptyText?: string;
};

const ImagePreview = ({
  url,
  title,
  barColor = 'bg-pink',
  emptyText = 'No image yet',
}: ImagePreviewProps) => {
  const [failedUrl, setFailedUrl] = useState('');
  const hasError = url !== '' && url === failedUrl;

  return (
    <RetroWindow title={title} barColor={barColor}>
      {url && !hasError ? (
        <img
          src={url}
          className="h-auto w-full border-[3px] border-black"
          alt={title}
          onError={() => setFailedUrl(url)}
        />
      ) : (
        <ImagePlaceholder text={hasError ? 'Error loading image' : emptyText} />
      )}
    </RetroWindow>
  );
};

export default ImagePreview;
