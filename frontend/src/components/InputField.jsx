const InputField = ({ label, type = "text", placeholder, name, className, onChange,value }) => {
  return (
    <div className="w-full flex flex-col mb-4">
      <label className={`text-sm font-medium ${className} text-gray-700 mb-1`}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
