import FormPersonalInfo from './FormPersonalInfo';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function ConfigProfile() {
  const session = await getServerSession(authOptions);
  const user = await ApiCommunicator.getUser(session!.user.id!);
  const subjects = await ApiCommunicator.getSubjects(session!.user.id!);
  const careers = await ApiCommunicator.getCareers();

  return (
    <>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='pl-6 md:ml-12'>Editar Perfil</strong>
        </p>
      </div>
      <div className='flex min-h-[500px] justify-center py-5'>
        <div className='block w-[98vw] rounded-lg md:w-[40%]'>
          {user && (
            <FormPersonalInfo
              user={user}
              subjects={subjects}
              careers={careers}
            />
          )}
        </div>
      </div>
    </>
  );
}
