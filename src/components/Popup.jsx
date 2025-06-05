const Popup = ({ children, className = "" }) => {
    return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-30">
      <div className={`bg-white p-6 rounded-xl shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
