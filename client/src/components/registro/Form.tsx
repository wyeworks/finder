import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";

export default function Form() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrarse</h2>
                <p className="mt-4 text-center tracking-tight text-gray-900">Crea tu cuenta para empezar a buscar grupos de estudio</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <Input type="text" id="name" name="name" label="Nombre" placeholder="Nicolas Rodriguez" />
                    <Input type="email" id="email" name="email" label="Email" placeholder="nico22@fing.edu.uy"/>
                    <Input type="password" id="password" name="password" label="Contraseña" placeholder="contraseña"/>
                    <Input type="date" id="date" name="date" label="Fecha de nacimiento" />
                    <Button type="submit" text="Crear Cuenta" />
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Ya estas registrado?
                <Link href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500"> Login</Link>
                </p>
            </div>
        </div>
    )
};