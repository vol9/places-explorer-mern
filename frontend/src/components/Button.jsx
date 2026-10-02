const variantStyles = {
  save: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus-visible:ring-indigo-500",
  delete:
    "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:ring-rose-500",
  cancel:
    "bg-slate-100 hover:bg-slate-200 text-slate-700 focus-visible:ring-slate-400",
  edit: "border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 bg-white shadow-sm focus-visible:ring-slate-400",
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "save",
}) => {
  const universalBtnStyle =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50  disabled:cursor-not-allowed disabled:active:scale-100";

  const colors = variantStyles[variant] || variantStyles.save;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${universalBtnStyle} ${colors}`}
    >
      {children}
    </button>
  );
};

export default Button;
