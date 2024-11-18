import "../../index.css";

export function Selected({ options, id, placeholder, label, onChange, cBorder }) {
  return (
    <>
      <div className="grid my-4">
        <label className="block font-medium text-sky-500">{label}</label>
        <div className="flex gap-2 rounded-xl my-1">
          <select onChange={onChange} id={id} className={`text-base shadow-md p-3 rounded-xl w-full dark:bg-[#404040] dark:text-white ${cBorder}`}>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}