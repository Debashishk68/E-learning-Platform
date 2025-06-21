const Button = ({ text, type = "button", disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-md text-white font-medium transition ${
        disabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
