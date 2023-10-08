import { ApiCommunicator } from '@/services/ApiCommunicator';
import { clientRequestHandler } from '@/utils/ApiFunctions';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; requestId: string } }
) {
  const groupId = params.id;
  const requestId = params.requestId;
  return await clientRequestHandler({
    req: request,
    apiHandler: async (requestBody) => {
      return await ApiCommunicator.handleRequestGroup({
        groupId: groupId,
        requestId: requestId,
        status: requestBody.status,
        reason: requestBody.reason,
      });
    },
  });
}
