import "react";

// eslint-disable-next-line react/prop-types
const BackgroundWrapper = ({ children, imageUrl }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;