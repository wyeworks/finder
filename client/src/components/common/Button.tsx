type ButtonParams = {
    type?: "button" | "submit" | "reset" | undefined,
    text: string,
}

export default function Button({ type = undefined, text }: ButtonParams) {
    return (
        <div>
            <button type={type} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {text}
            </button>
        </div>     
    )
};
