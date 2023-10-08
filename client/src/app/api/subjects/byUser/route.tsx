import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function GET(request: Request) {
  return clientRequestHandler({
    req: request,
    handlerNeedsBody: false,
    apiHandler: async () => {
      const session = await getServerSession(authOptions);
      return await ApiCommunicator.getSubjectsByUser(session!.user.id!);
    },
  });
}