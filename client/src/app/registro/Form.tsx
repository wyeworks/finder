import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function RegisterForm() {
    return (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <Input type="text" id="name" name="name" label="Nombre" placeholder="Nicolas Rodriguez" />
                    <Input type="email" id="email" name="email" label="Email" placeholder="nico22@fing.edu.uy"/>
                    <Input type="password" id="password" name="password" label="Contraseña" placeholder="contraseña"/>
                    <Input type="date" id="date" name="date" label="Fecha de nacimiento" />
                    <Button type="submit" text="Crear Cuenta" />
                </form>
            </div>
    )
};
