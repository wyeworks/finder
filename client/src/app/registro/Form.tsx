import Button from "@/components/common/Button";
import Dropdown, { Option } from "@/components/common/DropDown";
import Input from "@/components/common/Input";

export default function Form() {
    // we will change this label for all carrers
    const options: Option[] = [{ label: "Industrial" }, { label: "Computacion" }, { label: "Civil" }]
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" id="register-form">
            <form className="grid grid-rows-6 gap-5" action="#" method="POST">
                <Input type="text" id="name" name="name" label="Nombre" placeholder="Ingrese su Nombre" />
                <Input type="email" id="email" name="email" label="Email" placeholder="nombre@fing.edu.uy" />
                <Input type="password" id="password" name="password" label="Contraseña" placeholder="Ingrese su Contraseña" />
                <Input type="date" id="date" name="date" label="Fecha de nacimiento" />
                <Dropdown label="Seleccione su Carrera" options={options} id="carrers-dropdown" />
                <Button type="submit" text="Crear Cuenta" className="mt-5" />
            </form>
        </div>
    )
};
