import { ApiCommunicator } from '@/services/ApiCommunicator';
import { clientRequestHandler } from '@/utils/ApiFunctions';

export async function POST(request: Request) {
  return await clientRequestHandler({
    req: request,
    apiHandler: async (requestBody) => {
      return await ApiCommunicator.signUp({
        user: {
          name: requestBody.name,
          email: requestBody.email,
          password: requestBody.password,
          birth_date: '2023-08-25 23:32:19.261991000 +0000',
        },
      });
    },
  });
}

export async function PATCH(request: Request) {
  return await clientRequestHandler({
    req: request,
    apiHandler: async (requestBody) => {
      return await ApiCommunicator.editUser({
        // For testing only sending password
        user: requestBody.newPassword
          ? { password: requestBody.newPassword }
          : {
              name: requestBody.name,
              bio: requestBody.biography,
              birth_date: requestBody.birthdate,
            },
      });
    },
  });
}
