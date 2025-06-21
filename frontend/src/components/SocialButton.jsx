const SocialButton = ({ icon, text, className }) => {
  return (
    
    <button className="flex items-center gap-2 border p-2 rounded-md w-full justify-center hover:bg-gray-100 transition">
      <img src={icon} alt="icon" className="w-5 h-5" />
      <span className={`text-sm ${className}`}>{text}</span>
    </button>
  );
};

export default SocialButton;
