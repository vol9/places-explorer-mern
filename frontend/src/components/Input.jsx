import { useId } from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  ...props
}) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white text-slate-800 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
