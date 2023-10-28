import FormPersonalInfo from './FormPersonalInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { SubjectService } from '@/services/SubjectService';
import { ChangePasswordSection } from '@/app/(protected)/users/me/ChangePasswordSection';
import { DeleteUserSection } from '@/app/(protected)/users/me/DeleteUserSection';
import { UserService } from '@/services/UserService';
import { CareerService } from '@/services/CareerService';
import { ConfigLayout } from '@/components/common/ConfigLayout';

export default async function ConfigProfile() {
  const session = await getServerSession(authOptions);
  const user = await UserService.getUser(
    session!.user.id!,
    session!.user.accessToken!
  );
  const subjects = await SubjectService.getAll(session!.user.accessToken!);
  const careers = await CareerService.getCareers(session!.user.accessToken!);

  const mainBody = (
    <>
      {user && (
        <>
          <FormPersonalInfo
            user={user}
            subjects={subjects}
            careers={careers}
            careersByUser={user.careers}
            subjectsByUser={user.subjects}
          />
          <div className='h-6' />
          <ChangePasswordSection user={user} />
          <div className='h-6' />
          <DeleteUserSection user={user} />
        </>
      )}
    </>
  );
  return <ConfigLayout title={'Editar Perfil'}>{mainBody}</ConfigLayout>;
}
