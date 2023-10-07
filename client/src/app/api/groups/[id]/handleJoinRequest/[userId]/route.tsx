import { ApiCommunicator } from '@/services/ApiCommunicator';
import { clientRequestHandler } from '@/utils/ApiFunctions';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  const groupId = params.id;
  const userId = params.userId;
  return await clientRequestHandler({
    req: request,
    apiHandler: async (requestBody) => {
      return await ApiCommunicator.handleRequestGroup({
        groupId,
        userId,
        status: requestBody.status,
        reason: requestBody.reason,
      });
    },
  });
}
