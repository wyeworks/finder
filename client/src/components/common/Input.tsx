type InputParams = {
    type: string,
    id: string,
    label?: string,
    name: string,
    placeholder?: string
    required?: boolean,
}

export default function Input({ type, id, label, name, placeholder = "", required = false }: InputParams) {
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label} </label> }
            <div className="mt-2">
            <input id={id} name={name} type={type} autoComplete={type} placeholder={placeholder} required={required} className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>     
    )
};
