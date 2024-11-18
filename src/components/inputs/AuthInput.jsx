import "../../index.css";

export function AuthInput({ name, placeholder, type, className, label, value, onChange }) {
  return (

    <div className="grid my-4">
      <label className="text-sky-500 font-medium">{label}</label>
      <div className={`flex gap-2 rounded-xl my-1 ${className}`}>
        <input
          className="w-full text-base shadow-md p-3 rounded-xl border-none focus:outline-none focus:ring-0 dark:bg-[#404040] dark:text-white dark:placeholder:text-gray-200"
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
