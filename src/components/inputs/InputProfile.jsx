import "../../index.css";

export function InputProfile({placeholder, type, id, label, defaultValue, readOnly, onChange}) {

    return(
        <div className="mb-3">
        <label htmlFor={id} className="block mb-1 text-base font-medium text-sky-400">{label}</label>
        <input
        type={type}
        id={id}
        className="border-2 border-sky-400 rounded-xl w-full p-3 dark:bg-[#404040] dark:text-white"
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        onChange={onChange}
        />
      </div>
    );
}