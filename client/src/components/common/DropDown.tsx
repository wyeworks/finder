export type Option = {
    label: string;
    // value: string;
}

type DropdownProps = {
    id: string;
    label?: string;
    options: Option[];
}

export default function Dropdown({ label, options, id }: DropdownProps) {
  return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label} </label>}
            <div className="relative mt-2">
                <select 
                    className="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-blue-600 sm:text-sm sm:leading-6 h-10 block appearance-none
                    bg-white border-gray-300 pr-8 leading-tight focus:outline-none
                    focus:bg-white focus:border-gray-500"
                >
                    {options.map((item,index)=>{
                        return <option key={index} >{item.label}</option>
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
  );
}
