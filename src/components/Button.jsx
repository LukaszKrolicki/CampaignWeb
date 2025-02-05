import 'react';

const Button = ({ type, className, onClick, children }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-lg w-full transition duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;