const { Skeleton } = require("@mui/material");
const { useState } = require("react");

function ImageWithLoader({ src, alt }, props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="image-container">
      {isLoading && <Skeleton variant="circular" width={40} height={40} />}
      <img
        src={src}
        alt={alt}
        {...props}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
}
