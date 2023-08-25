import { ReactNode } from "react";
import Image from "next/image";

type AuthFlowProps = {
    children : ReactNode;
}

export default function AuthFlow({children}:AuthFlowProps) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 overflow-y-hidden">
            <div className="max-w-5xl bg-white shadow-lg rounded-lg flex items-stretch h-full sm:h-auto">
                {/* Left side (Image) - hidden on mobile */}
                <div className="hidden md:flex w-1/2 justify-center items-center relative overflow-hidden flex-shrink-0">
                    <Image 
                        src="https://media.istockphoto.com/id/639359406/es/foto/estudiantes-que-estudian-en-la-biblioteca-de-la-universidad.jpg?s=2048x2048&w=is&k=20&c=BNaCCgf0UTSW2GRT4tCQEtuSfdAfZynDGwQ2uDR9qvo=" 
                        alt="Grupo de estudiantes" 
                        className="w-full h-full object-cover"
                        width={600}
                        height={600}
                        />
                </div>
                {/* Right side (Form Component) */}
                <div className="w-full md:w-5/12 md:pl-6 flex-shrink-0">
                {children}
                </div>
            </div>
        </div>
    )
};
