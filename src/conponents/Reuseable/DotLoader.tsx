const DottedLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
    </div>
  );
};

export default DottedLoader;
