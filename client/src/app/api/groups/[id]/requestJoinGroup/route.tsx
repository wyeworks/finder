import { clientRequestHandler } from '@/utils/ApiFunctions';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const groupId = params.id;
  return clientRequestHandler({
    req: request,
    apiHandler: async () => {
      return await ApiCommunicator.getRequestJoinGroup(groupId);
    },
    handlerNeedsBody: false,
  });
}
