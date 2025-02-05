import 'react';

// eslint-disable-next-line react/prop-types
const FormInput = ({ label, type, id, value, onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default FormInput;