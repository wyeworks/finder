import Link from "next/link";
import RegisterForm from "./Form";

export default function Form() {
    return (
        <div className="grid grid-row-3 min-h-full justify-center px-6 py-12 lg:px-8" id="register-view">
            <div id="register-header">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 block md:hidden">finder.com</h2>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrarse</h2>
                <p className="mt-4 text-center tracking-tight text-gray-900">Crea tu cuenta para empezar a buscar grupos de estudio</p>
            </div>
            <div id="register-body">
                <RegisterForm />
            </div>
            <div>
                <p className="mt-10 text-center text-sm text-gray-500">
                Ya estas registrado?
                <Link href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500"> Login</Link>
                </p>
            </div>
        </div>
    )
};
